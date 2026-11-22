/*
 * Función serverless del agente (Vercel). La clave vive solo aquí, en OPENAI_API_KEY.
 * GET  → indica si hay clave configurada y cuántas preguntas le quedan al visitante.
 * POST → { messages: [{ role, content }] } → respuesta estructurada.
 */
import { apiKey, json, sameOrigin, signSpeech } from './_http.js';
import { peek, take } from './_quota.js';
import { PROJECT_IDS, SCHEMA, SECTION_IDS, SYSTEM } from './_prompt.js';

export const config = { maxDuration: 30 };

const MODEL = () => process.env.OPENAI_MODEL || 'gpt-6-luna';
const MAX_MESSAGES = 10;
const MAX_CHARS = 1500;
const PER_INSTANCE_DAY = 600;
const VOICE_HINT = 'La conversación es hablada: reply se lee en voz alta. Máximo 35 palabras, frases cortas y naturales, sin listas ni símbolos, y deja bullets vacío. La pregunta viene de una transcripción y puede traer errores de oído. Si ayuda, termina con una pregunta breve para seguir.';

/* Freno global por instancia. El tope real de gasto se pone en OpenAI. */
let day = { key: '', count: 0 };
const underDailyCap = () => {
  const today = new Date().toISOString().slice(0, 10);
  if (day.key !== today) day = { key: today, count: 0 };
  day.count += 1;
  return day.count <= PER_INSTANCE_DAY;
};

const parseMessages = (body) => {
  if (!Array.isArray(body?.messages)) return null;
  const list = body.messages.slice(-MAX_MESSAGES).filter(
    (m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string' && m.content.trim(),
  );
  if (!list.length || list[list.length - 1].role !== 'user') return null;
  return list.map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
};

const clean = (out) => ({
  lang: out.lang === 'en' ? 'en' : 'es',
  reply: String(out.reply || ''),
  bullets: (out.bullets || []).slice(0, 4),
  projectIds: [...new Set(out.project_ids || [])].filter((id) => PROJECT_IDS.includes(id)).slice(0, 7),
  links: [...new Set(out.links || [])],
  whatsappMessage: String(out.whatsapp_message || '').slice(0, 600),
  action:
    out.action?.type === 'scroll' && SECTION_IDS.includes(out.action.target)
      ? { type: 'scroll', id: out.action.target }
      : out.action?.type === 'case' && PROJECT_IDS.includes(Number(out.action.target))
        ? { type: 'case', id: Number(out.action.target) }
        : null,
  suggestions: (out.suggestions || []).slice(0, 2),
});

export async function GET(request) {
  if (!apiKey()) return json({ enabled: false });
  return json({ enabled: true, ...(await peek(request)) });
}

export async function POST(request) {
  const key = apiKey();
  if (!key) return json({ error: 'not_configured' }, 503);
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);

  const body = await request.json().catch(() => null);
  const messages = parseMessages(body);
  if (!messages) return json({ error: 'bad_request' }, 400);

  const quota = await take(request);
  if (!quota.ok) return json({ error: 'limit', limit: quota.limit, remaining: 0, resetAt: quota.resetAt }, 429);

  /* Una pregunta sin respuesta no descuenta del cupo */
  const fail = async (error, status) => {
    await quota.refund();
    return json(error, status);
  };
  if (!underDailyCap()) return fail({ error: 'rate_limited' }, 429);

  const model = MODEL();
  const started = Date.now();
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        model,
        ...(process.env.OPENAI_REASONING === 'off' ? {} : { reasoning_effort: 'none' }),
        max_completion_tokens: 900,
        store: false,
        messages: [{ role: 'system', content: SYSTEM }, ...(body.voice === true ? [{ role: 'system', content: VOICE_HINT }] : []), ...messages],
        response_format: { type: 'json_schema', json_schema: SCHEMA },
      }),
    });

    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      /* El detalle queda en los logs del servidor; al visitante solo le llega el código. */
      console.error('[agente] OpenAI', res.status, detail?.error?.code || detail?.error?.type, detail?.error?.message);
      return fail({ error: 'upstream', status: res.status, code: detail?.error?.code || null }, 502);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return fail({ error: 'empty' }, 502);
    const answer = clean(JSON.parse(content));
    return json(
      { ...answer, speech: signSpeech(answer.reply.slice(0, 1200)), model, ms: Date.now() - started, limit: quota.limit, remaining: quota.remaining },
      200,
      { 'Set-Cookie': quota.cookie() },
    );
  } catch (err) {
    console.error('[agente]', err?.name, err?.message);
    return fail({ error: 'failed' }, 502);
  }
}
