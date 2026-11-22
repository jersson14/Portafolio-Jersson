/* Convierte a texto la pregunta hablada del visitante. El audio no se guarda. */
import { apiKey, json, sameOrigin } from './_http.js';
import { LIMIT, peek, takeFrom } from './_quota.js';

export const config = { maxDuration: 30 };

const MAX_BYTES = 1_500_000;
const MODEL = () => process.env.OPENAI_STT_MODEL || 'gpt-transcribe';
const EXT = { 'audio/webm': 'webm', 'audio/mp4': 'mp4', 'audio/ogg': 'ogg', 'audio/wav': 'wav', 'audio/mpeg': 'mp3' };

export async function POST(request) {
  const key = apiKey();
  if (!key) return json({ error: 'not_configured' }, 503);
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);

  const type = (request.headers.get('content-type') || '').split(';')[0];
  if (!EXT[type]) return json({ error: 'bad_type' }, 415);
  if (Number(request.headers.get('content-length')) > MAX_BYTES) return json({ error: 'too_large' }, 413);

  const quota = await peek(request);
  if (quota.remaining <= 0) return json({ error: 'limit', limit: quota.limit, remaining: 0, resetAt: quota.resetAt }, 429);
  if (!(await takeFrom(request, 'stt', LIMIT() * 3))) return json({ error: 'limit', limit: quota.limit, remaining: 0, resetAt: quota.resetAt }, 429);

  const audio = await request.arrayBuffer();
  if (audio.byteLength < 800) return json({ text: '' });
  if (audio.byteLength > MAX_BYTES) return json({ error: 'too_large' }, 413);

  try {
    const form = new FormData();
    form.append('file', new Blob([audio], { type }), `pregunta.${EXT[type]}`);
    form.append('model', MODEL());
    form.append('languages[]', 'es');
    form.append('languages[]', 'en');
    form.append('prompt', 'Un visitante pregunta por el portafolio del ingeniero Jersson Corilla: DereJ-IA, Mi Tienda, NutriDiabetes, farmacia, botica, grifo, trámite documentario, colegio, SUNAT, RAG, AWS.');
    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}` },
      body: form,
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      console.error('[voz] transcripción', res.status, detail?.error?.code, detail?.error?.message);
      return json({ error: 'upstream' }, 502);
    }
    const { text } = await res.json();
    return json({ text: String(text || '').trim().slice(0, 1500) });
  } catch (err) {
    console.error('[voz] transcripción', err?.name, err?.message);
    return json({ error: 'failed' }, 502);
  }
}
