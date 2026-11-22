/*
 * Cupo de preguntas por visitante. Cuenta por dos vías y manda la más alta:
 *  - IP: en Upstash Redis si está configurado; si no, en memoria de la instancia (se pierde al reiniciarse).
 *  - Cookie HttpOnly firmada: recuerda a la misma persona aunque cambie de red.
 * La IP nunca se guarda en claro, solo un hash con clave.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'jcm_q';

export const LIMIT = () => Math.max(1, Number.parseInt(process.env.AGENT_LIMIT, 10) || 10);
const WINDOW_S = () => Math.max(1, Number(process.env.AGENT_WINDOW_HOURS) || 24) * 3600;

const secret = () => process.env.AGENT_SECRET || `quota:${process.env.OPENAI_API_KEY || ''}`;
export const sign = (value) => createHmac('sha256', secret()).update(value).digest('base64url');

/* En IPv6 cada hogar recibe un /64 completo: se cuenta el bloque, no la dirección. */
const normalizeIp = (ip) => {
  if (!ip.includes(':') || ip.startsWith('::ffff:')) return ip.replace('::ffff:', '');
  const [head, tail = ''] = ip.split('::');
  const left = head ? head.split(':') : [];
  const right = tail ? tail.split(':') : [];
  const full = ip.includes('::') ? [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill('0'), ...right] : left;
  return full.slice(0, 4).map((h) => h.toLowerCase().replace(/^0+(?=.)/, '')).join(':');
};

const ipKey = (request, bucket = 'q') => {
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  return `jcm:${bucket}:${sign(normalizeIp(ip)).slice(0, 24)}`;
};

/* ── Contador por IP ── */
const memory = new Map();

/* Síncrono a propósito: leer y sumar sin await evita que peticiones simultáneas se salten el cupo. */
const memoryStore = {
  get(key) {
    const hit = memory.get(key);
    return hit && hit.resetAt > Date.now() ? hit : { count: 0, resetAt: Date.now() + WINDOW_S() * 1000 };
  },
  add(key, n) {
    if (memory.size > 5000) for (const [k, v] of memory) if (v.resetAt <= Date.now()) memory.delete(k);
    const hit = this.get(key);
    const next = { count: Math.max(0, hit.count + n), resetAt: hit.resetAt };
    memory.set(key, next);
    return next;
  },
};

const redisConfig = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
};

const redis = async ({ url, token }, commands) => {
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(2500),
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  return (await res.json()).map((r) => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
};

const redisStore = (cfg) => ({
  async get(key) {
    const [count, ttl] = await redis(cfg, [['GET', key], ['TTL', key]]);
    return { count: Number(count) || 0, resetAt: Date.now() + (ttl > 0 ? ttl : WINDOW_S()) * 1000 };
  },
  async add(key, n) {
    const [count, , ttl] = await redis(cfg, [['INCRBY', key, n], ['EXPIRE', key, WINDOW_S(), 'NX'], ['TTL', key]]);
    return { count: Number(count), resetAt: Date.now() + (ttl > 0 ? ttl : WINDOW_S()) * 1000 };
  },
});

const withStore = async (method, ...args) => {
  const cfg = redisConfig();
  if (cfg) {
    try {
      return await redisStore(cfg)[method](...args);
    } catch (err) {
      console.error('[agente] cupo: Redis falló, uso memoria.', err.message);
    }
  }
  return memoryStore[method](...args);
};

/* ── Cookie firmada ── */
const readCookie = (request) => {
  const raw = request.headers.get('cookie')?.split(/;\s*/).find((c) => c.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  const [count, resetAt, sig] = raw?.split('.') || [];
  if (!sig) return { count: 0 };
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(`${count}.${resetAt}`));
  if (a.length !== b.length || !timingSafeEqual(a, b) || Number(resetAt) <= Date.now()) return { count: 0 };
  return { count: Number(count), resetAt: Number(resetAt) };
};

const writeCookie = (request, count, resetAt) => {
  const body = `${count}.${resetAt}`;
  const https = request.headers.get('x-forwarded-proto') === 'https' || request.url.startsWith('https:');
  const age = Math.max(1, Math.round((resetAt - Date.now()) / 1000));
  return `${COOKIE}=${body}.${sign(body)}; Path=/api; HttpOnly; SameSite=Strict; Max-Age=${age}${https ? '; Secure' : ''}`;
};

export const peek = async (request) => {
  const cookie = readCookie(request);
  const ip = await withStore('get', ipKey(request));
  return { limit: LIMIT(), remaining: Math.max(0, LIMIT() - Math.max(cookie.count, ip.count)), resetAt: Math.max(ip.resetAt, cookie.resetAt || 0) };
};

/* Reserva una pregunta. Si OpenAI falla se devuelve con refund(). */
export const take = async (request) => {
  const limit = LIMIT();
  const key = ipKey(request);
  const cookie = readCookie(request);
  if (cookie.count >= limit) return { ok: false, limit, remaining: 0, resetAt: cookie.resetAt };

  const ip = await withStore('add', key, 1);
  const refund = () => withStore('add', key, -1);
  if (ip.count > limit) {
    await refund();
    return { ok: false, limit, remaining: 0, resetAt: ip.resetAt };
  }
  const used = Math.max(ip.count, cookie.count + 1);
  const resetAt = Math.max(ip.resetAt, cookie.resetAt || 0);
  return { ok: true, limit, remaining: limit - used, resetAt, refund, cookie: () => writeCookie(request, used, resetAt) };
};

/* Contador auxiliar por IP (voz y transcripción): protege el gasto, no descuenta preguntas. */
export const takeFrom = async (request, bucket, max) => {
  const key = ipKey(request, bucket);
  const { count } = await withStore('add', key, 1);
  if (count <= max) return true;
  await withStore('add', key, -1);
  return false;
};
