/*
 * Contador de visitas del portafolio (Vercel + Upstash Redis).
 * GET  → solo lee el total y las visitas de hoy.
 * POST → suma una visita si corresponde y devuelve los números.
 *
 * Una visita = una sesión: recargar o volver antes de 30 minutos no suma. No cuentan los bots,
 * y hay un tope diario por IP (guardada solo como hash) para que nadie infle el número.
 * Sin Redis responde enabled:false y la web oculta el contador: nunca muestra un número inventado.
 */
import { json, sameOrigin } from './_http.js';
import { takeFrom } from './_quota.js';
import { redis, redisConfig } from './_redis.js';

const COOKIE = 'jcm_v';
const SESSION_S = 30 * 60;
const DAY_KEY_TTL_S = 90 * 24 * 3600;
const PER_IP = 60;
const BOTS = /(?<!cu)bot\b|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|facebookexternalhit|whatsapp\/|monitor|curl|wget|python|axios|node-fetch/i;

/* Las pruebas locales y los despliegues de vista previa no tocan el número real. */
const prefix = () => (process.env.VERCEL_ENV === 'production' ? 'jcm:visits' : 'jcm:visits:dev');

/* El día cambia a medianoche en Perú. */
const dayKey = () => `${prefix()}:day:${new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima' }).format(new Date())}`;
const totalKey = () => `${prefix()}:total`;

const read = async (cfg) => {
  const [total, today] = await redis(cfg, [['GET', totalKey()], ['GET', dayKey()]]);
  return { total: Number(total) || 0, today: Number(today) || 0 };
};

const add = async (cfg) => {
  const day = dayKey();
  const [total, today] = await redis(cfg, [['INCR', totalKey()], ['INCR', day], ['EXPIRE', day, DAY_KEY_TTL_S]]);
  return { total: Number(total), today: Number(today) };
};

const hasSession = (request) => (request.headers.get('cookie') || '').split(/;\s*/).includes(`${COOKIE}=1`);

const sessionCookie = (request) => {
  const https = request.headers.get('x-forwarded-proto') === 'https' || request.url.startsWith('https:');
  return `${COOKIE}=1; Path=/api/visits; HttpOnly; SameSite=Strict; Max-Age=${SESSION_S}${https ? '; Secure' : ''}`;
};

const guarded = async (task) => {
  const cfg = redisConfig();
  if (!cfg) return json({ enabled: false });
  try {
    return await task(cfg);
  } catch (err) {
    console.error('[visitas]', err?.name, err?.message);
    return json({ enabled: false }, 503);
  }
};

export const GET = () => guarded(async (cfg) => json({ enabled: true, ...(await read(cfg)) }));

export async function POST(request) {
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  return guarded(async (cfg) => {
    const ua = request.headers.get('user-agent') || '';
    if (!ua || BOTS.test(ua)) return json({ enabled: true, counted: false, ...(await read(cfg)) });

    const known = hasSession(request);
    const counted = !known && (await takeFrom(request, 'visit', PER_IP));
    const numbers = counted ? await add(cfg) : await read(cfg);
    /* La sesión se renueva mientras la persona sigue navegando. */
    return json({ enabled: true, counted, ...numbers }, 200, { 'Set-Cookie': sessionCookie(request) });
  });
}
