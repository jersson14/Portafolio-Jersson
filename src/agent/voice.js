/*
 * Voz del agente en el navegador: reproduce (clips y streaming PCM), escucha el micrófono
 * con detección de silencio y mueve la boca del robot según el volumen.
 */
const RATE = 24000;
const SILENCE_MS = 1100;
const NO_SPEECH_MS = 8000;
const MAX_MS = 25000;

let ctx = null;
let out = null;
let outBuf = null;
let current = null; /* reproducción en curso: { stop } */
let mic = null;
let token = 0;
const clips = new Map();

const prefersMime = () =>
  ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find((m) => window.MediaRecorder?.isTypeSupported?.(m)) || '';

export const canListen = () => Boolean(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);

/* Debe llamarse dentro de un clic o tecla: los navegadores bloquean el audio sin gesto. */
export const unlock = () => {
  if (!ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return false;
    ctx = new Ctx();
    out = ctx.createAnalyser();
    out.fftSize = 512;
    outBuf = new Float32Array(out.fftSize);
    out.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return true;
};

const level = (analyser, buf) => {
  analyser.getFloatTimeDomainData(buf);
  let sum = 0;
  for (let i = 0; i < buf.length; i += 1) sum += buf[i] * buf[i];
  return Math.sqrt(sum / buf.length);
};

/* ── Boca ── */
let lips = 0;
const moveLips = () => {
  const open = Math.min(1, level(out, outBuf) * 6.5);
  document.querySelectorAll('.rb[data-mood="talk"] .rb-mouth').forEach((m) => { m.style.transform = `scale(${0.82 + open * 0.25}, ${0.16 + open})`; });
  lips = requestAnimationFrame(moveLips);
};
const startLips = () => { cancelAnimationFrame(lips); lips = requestAnimationFrame(moveLips); };
const stopLips = () => cancelAnimationFrame(lips);

export const stop = () => {
  token += 1;
  current?.stop();
  current = null;
  window.speechSynthesis?.cancel();
  stopLips();
};

/* Reproduce un clip grabado de /voice. Resuelve true si sonó completo. */
export const playClip = async (name, lang) => {
  if (!ctx) return false;
  stop();
  const mine = token;
  const url = `/voice/${name}-${lang}.mp3`;
  try {
    if (!clips.has(url)) {
      clips.set(url, fetch(url).then((r) => {
        if (!r.ok || !r.headers.get('content-type')?.includes('audio')) throw new Error('clip');
        return r.arrayBuffer();
      }).then((b) => ctx.decodeAudioData(b)));
    }
    const buffer = await clips.get(url);
    if (mine !== token) return false;
    return await new Promise((resolve) => {
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(out);
      current = { stop: () => { src.onended = null; try { src.stop(); } catch { /* terminado */ } resolve(false); } };
      src.onended = () => { current = null; stopLips(); resolve(true); };
      src.start();
      startLips();
    });
  } catch {
    clips.delete(url);
    return false;
  }
};

/* Lee un texto firmado por el servidor, en streaming. onStart avisa cuando empieza a sonar. */
export const speak = async (speech, onStart) => {
  if (!ctx || !speech) return false;
  stop();
  const mine = token;
  const abort = new AbortController();
  const sources = new Set();
  let release;
  const stopped = new Promise((resolve) => { release = resolve; });
  current = {
    stop: () => {
      abort.abort();
      sources.forEach((s) => { s.onended = null; try { s.stop(); } catch { /* terminado */ } });
      release(false);
    },
  };

  const run = async () => {
    const res = await fetch('/api/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(speech),
      signal: abort.signal,
    });
    if (!res.ok || !res.body) return false;
    const reader = res.body.getReader();
    let rest = new Uint8Array(0);
    let at = 0;
    let started = false;
    let last = Promise.resolve();

    for (;;) {
      const { value, done } = await reader.read();
      if (mine !== token) return false;
      if (done) break;
      const bytes = new Uint8Array(rest.length + value.length);
      bytes.set(rest);
      bytes.set(value, rest.length);
      /* Bloques de 100 ms como mínimo, siempre en muestras completas */
      if (bytes.length < RATE * 0.2) { rest = bytes; continue; }
      const usable = bytes.length - (bytes.length % 2);
      rest = bytes.slice(usable);
      const pcm = new Int16Array(bytes.buffer.slice(0, usable));
      const buffer = ctx.createBuffer(1, pcm.length, RATE);
      const ch = buffer.getChannelData(0);
      for (let i = 0; i < pcm.length; i += 1) ch[i] = pcm[i] / 32768;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(out);
      at = Math.max(at, ctx.currentTime + 0.08);
      src.start(at);
      at += buffer.duration;
      sources.add(src);
      last = new Promise((resolve) => { src.onended = () => { sources.delete(src); resolve(); }; });
      if (!started) { started = true; startLips(); onStart?.(); }
    }
    await last;
    return started;
  };

  const ok = await Promise.race([run().catch(() => false), stopped]);
  if (mine === token) { current = null; stopLips(); }
  return ok;
};

/* Respaldo gratuito: la voz del sistema. */
export const speakSystem = (text, lang) =>
  new Promise((resolve) => {
    const synth = window.speechSynthesis;
    if (!synth || !text) { resolve(false); return; }
    stop();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'en' ? 'en-US' : 'es-PE';
    const voices = synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith(lang));
    u.voice = voices.find((v) => /natural|online/i.test(v.name)) || voices.find((v) => /es-(PE|MX|US|419)/i.test(v.lang)) || voices[0] || null;
    u.onend = () => resolve(true);
    u.onerror = () => resolve(false);
    current = { stop: () => resolve(false) };
    synth.speak(u);
  });

/* ── Micrófono ── */
export const openMic = async () => {
  if (mic) return mic;
  const streamIn = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
  });
  const source = ctx.createMediaStreamSource(streamIn);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 1024;
  source.connect(analyser);
  mic = { stream: streamIn, source, analyser, buf: new Float32Array(analyser.fftSize), cancel: null };
  return mic;
};

export const closeMic = () => {
  if (!mic) return;
  mic.cancel?.();
  mic.source.disconnect();
  mic.stream.getTracks().forEach((t) => t.stop());
  mic = null;
};

/* Graba hasta que la persona deja de hablar. Devuelve un Blob, o null si no dijo nada. */
export const record = (onLevel) =>
  new Promise((resolve) => {
    const m = mic;
    if (!m) { resolve(null); return; }
    const mime = prefersMime();
    const rec = new MediaRecorder(m.stream, { ...(mime ? { mimeType: mime } : {}), audioBitsPerSecond: 32000 });
    const parts = [];
    const start = performance.now();
    let floor = 0.006;
    let spoke = 0;
    let lastVoice = 0;
    let keep = false;

    const end = (ok) => {
      clearInterval(timer);
      m.cancel = null;
      keep = ok;
      if (rec.state !== 'inactive') rec.stop(); else resolve(null);
    };
    m.cancel = () => end(false);
    m.finish = () => end(spoke > 0);

    rec.ondataavailable = (e) => { if (e.data.size) parts.push(e.data); };
    rec.onstop = () => {
      onLevel?.(0);
      resolve(keep ? new Blob(parts, { type: (rec.mimeType || mime).split(';')[0] || 'audio/webm' }) : null);
    };

    const timer = setInterval(() => {
      const now = performance.now();
      const v = level(m.analyser, m.buf);
      const t = now - start;
      /* Aprende el ruido de fondo y exige voz claramente por encima */
      if (!spoke) floor = t < 350 ? Math.max(0.003, Math.min(0.03, v * 0.6 + floor * 0.4)) : Math.min(floor, Math.max(0.003, v));
      const gate = Math.max(0.012, floor * 2.6);
      onLevel?.(Math.min(1, v * 9));
      if (v > gate && t > 200) {
        spoke += 1;
        lastVoice = now;
      }
      if (t > MAX_MS) end(spoke > 3);
      else if (spoke > 3 && now - lastVoice > SILENCE_MS) end(true);
      else if (spoke <= 3 && t > NO_SPEECH_MS) end(false);
    }, 50);

    rec.start(250);
  });

export const finishRecording = () => mic?.finish?.();

export const transcribe = async (blob) => {
  const r = await fetch('/api/transcribe', { method: 'POST', headers: { 'Content-Type': blob.type }, body: blob, signal: AbortSignal.timeout(25000) });
  const d = await r.json().catch(() => ({}));
  if (d.error === 'limit') return { limit: d };
  if (!r.ok) throw new Error(d.error || r.status);
  return { text: d.text };
};
