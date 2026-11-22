/*
 * Graba las locuciones fijas del agente en public/voice (saludo, tour, muletillas).
 * Se ejecuta una sola vez, o cuando cambie un texto:  node --env-file=.env.local scripts/voice-clips.mjs [nombre]
 * Requiere ffmpeg.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { POST } from '../api/speak.js';
import { signSpeech } from '../api/_http.js';

const CLIPS = {
  greeting: [
    '¡Hola! Soy el agente del ingeniero Jersson. Dime, ¿en qué te puedo ayudar? Puedes hablarme, o escribirme en el chat.',
    'Hi! I am engineer Jersson’s agent. How can I help you? You can talk to me, or type in the chat.',
  ],
  unheard: ['Perdona, no te escuché bien. ¿Me lo repites?', 'Sorry, I did not catch that. Could you say it again?'],
  'filler-1': ['Claro, déjame revisar.', 'Sure, let me check.'],
  'filler-2': ['Buena pregunta, un segundo.', 'Good question, one second.'],
  'filler-3': ['A ver, te cuento.', 'Alright, here we go.'],
  match: ['Listo, aquí tienes la comparación con el perfil de Jersson.', 'Done, here is how the role compares with Jersson’s profile.'],
  paste: ['Perfecto. Pega el texto de la vacante en el chat y la comparo con su perfil.', 'Great. Paste the job offer in the chat and I will compare it with the profile.'],
  tour: ['¡Vamos! Te muestro el portafolio.', 'Let’s go! I will show you around.'],
  limit: [
    'Ya usaste todas tus preguntas por hoy. Si quieres seguir conversando, escríbele a Jersson por WhatsApp.',
    'You have used all your questions for today. To keep talking, message Jersson on WhatsApp.',
  ],
  'tour-home': ['Él es Jersson Corilla, ingeniero de sistemas, especializado en arquitectura cloud e inteligencia artificial aplicada.', 'This is Jersson Corilla, a systems engineer focused on cloud architecture and applied artificial intelligence.'],
  'tour-tech-stack': ['Este es su stack, desde el frontend hasta la nube, los datos y la inteligencia artificial.', 'This is the stack, from frontend to cloud, data and artificial intelligence.'],
  'tour-projects': ['DereJ-IA es su proyecto estrella: una plataforma legal con inteligencia artificial sobre la legislación peruana.', 'DereJ-IA is the star project: a legal platform with artificial intelligence over Peruvian law.'],
  'tour-demos': ['Estos seis sistemas tienen demo abierta. Elige uno en las pestañas y pruébalo.', 'These six systems have an open demo. Pick one from the tabs and try it.'],
  'tour-experience': ['Su experiencia empieza en 2019: sector público, educación, cloud y producto propio.', 'The experience starts in 2019: public sector, education, cloud and an in-house product.'],
  'tour-certifications': ['Estas son sus certificaciones, con AWS Cloud Practitioner al frente.', 'These are the certifications, led by AWS Cloud Practitioner.'],
  'tour-contact': ['Y aquí puedes escribirle. Gracias por acompañarme en el recorrido.', 'And here you can get in touch. Thanks for joining the tour.'],
};

process.env.AGENT_LIMIT = '1000';
const dir = 'public/voice';
mkdirSync(dir, { recursive: true });
const only = process.argv[2];

for (const [name, texts] of Object.entries(CLIPS)) {
  if (only && only !== name) continue;
  for (const [i, lang] of ['es', 'en'].entries()) {
    const res = await POST(new Request('http://local/api/speak', {
      method: 'POST',
      headers: { host: 'local', origin: 'http://local' },
      body: JSON.stringify(signSpeech(texts[i])),
    }));
    if (!res.ok) throw new Error(`${name}-${lang}: ${res.status} ${await res.text()}`);
    const pcm = Buffer.from(await res.arrayBuffer());
    const tmp = join(tmpdir(), `${name}-${lang}.pcm`);
    writeFileSync(tmp, pcm);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', tmp,
      '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,loudnorm=I=-17:TP=-1.5', '-ar', '24000', '-b:a', '56k', `${dir}/${name}-${lang}.mp3`]);
    rmSync(tmp);
    console.log(`${name}-${lang}`, `${(pcm.length / 48000).toFixed(1)} s`);
  }
}
