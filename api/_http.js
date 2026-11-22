/* Utilidades comunes de las funciones /api. */
import { sign } from './_quota.js';

export const apiKey = () => process.env.OPENAI_API_KEY?.trim();

export const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } });

export const sameOrigin = (request) => {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === (request.headers.get('x-forwarded-host') || request.headers.get('host'));
  } catch {
    return false;
  }
};

/* Solo se lee en voz alta un texto que escribió el propio agente: va firmado y caduca. */
const SPEECH_TTL = 15 * 60 * 1000;

export const signSpeech = (text) => {
  const exp = Date.now() + SPEECH_TTL;
  return { text, exp, sig: sign(`speech:${exp}:${text}`) };
};

export const validSpeech = (s) =>
  typeof s?.text === 'string' && s.text.length > 0 && s.text.length <= 1200 && Number(s.exp) > Date.now() && s.sig === sign(`speech:${s.exp}:${s.text}`);
