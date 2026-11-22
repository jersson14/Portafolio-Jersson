/* Puente con /api/chat. Si el servidor no está o falla, el agente sigue con el motor local. */
import { CONTACT, waLink } from './knowledge';

/* Estas herramientas son exactas y verificables: siempre se resuelven en local. */
const LOCAL_TOOLS = new Set(['evaluar_vacante', 'extraer_requisitos', 'iniciar_tour', 'cambiar_idioma']);
export const isLocalOnly = (res) => LOCAL_TOOLS.has(res.trace[0]?.[0]);

let status;
/* { enabled, limit, remaining }. Se consulta una vez; luego cada respuesta trae el cupo. */
export const llmStatus = () => {
  status ??= fetch('/api/chat', { headers: { Accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : { enabled: false }))
    .then((d) => ({ ...d, enabled: d.enabled === true }))
    .catch(() => ({ enabled: false }));
  return status;
};

export class LimitError extends Error {
  constructor(data) {
    super('limit');
    this.limit = data.limit;
    this.resetAt = data.resetAt;
  }
}

const buildLinks = (data) => data.links.map((kind) => {
  const es = data.lang === 'es';
  switch (kind) {
    case 'whatsapp':
      return {
        kind,
        label: es ? 'Escribir por WhatsApp' : 'Message on WhatsApp',
        href: waLink(data.whatsappMessage || (es ? 'Hola Jersson, vengo de tu portafolio.' : 'Hi Jersson, I come from your portfolio.')),
      };
    case 'cv': return { kind, label: es ? 'Descargar CV (PDF)' : 'Download CV (PDF)', href: CONTACT.cv, download: true };
    case 'email': return { kind: 'mail', label: 'Email', href: `mailto:${CONTACT.email}` };
    case 'linkedin': return { kind, label: 'LinkedIn', href: CONTACT.linkedin };
    case 'github': return { kind, label: 'GitHub', href: CONTACT.github };
    default: return null;
  }
}).filter(Boolean);

export const askRemote = async (messages, voice = false) => {
  const r = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, voice }),
    signal: AbortSignal.timeout(25000),
  });
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    if (e.error === 'limit') throw new LimitError(e);
    throw new Error([e.error || r.status, e.status, e.code].filter(Boolean).join(' '));
  }
  const d = await r.json();
  const links = buildLinks(d);
  return {
    lang: d.lang,
    speech: d.speech,
    quota: { limit: d.limit, remaining: d.remaining },
    blocks: [
      ...d.reply.split(/\n{2,}/).filter(Boolean).map((value) => ({ type: 'text', value })),
      ...(d.bullets.length ? [{ type: 'list', items: d.bullets }] : []),
      ...(d.projectIds.length ? [{ type: 'projects', ids: d.projectIds }] : []),
      ...(links.length ? [{ type: 'links', items: links }] : []),
    ],
    trace: [['openai', d.model, `${(d.ms / 1000).toFixed(1)} s`]],
    chips: d.suggestions,
    effect: d.action,
    lastProjectId: d.projectIds[0],
  };
};

/* Respuestas locales que tienen locución grabada. */
const CLIPS = { extraer_requisitos: 'match', evaluar_vacante: 'paste', iniciar_tour: 'tour' };
export const clipFor = (res) => res.clip || CLIPS[res.trace[0]?.[0]];

/* Respuesta cuando el visitante agotó sus preguntas. */
export const limitReply = ({ limit, resetAt }, lang) => {
  const es = lang === 'es';
  const hours = Math.max(1, Math.ceil(((resetAt || 0) - Date.now()) / 3600000));
  const wait = es ? `${hours} ${hours === 1 ? 'hora' : 'horas'}` : `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  return {
    lang,
    quota: { limit, remaining: 0 },
    clip: 'limit',
    trace: [['cupo', '', `${limit}/${limit}`]],
    blocks: [
      {
        type: 'text',
        value: es
          ? `Ya usaste tus ${limit} preguntas. Se renuevan en unas ${wait}. Mientras tanto, Jersson te responde directo por WhatsApp.`
          : `You have used your ${limit} questions. They renew in about ${wait}. Meanwhile, Jersson can reply on WhatsApp.`,
      },
      {
        type: 'links',
        items: [{
          kind: 'whatsapp',
          label: es ? 'Seguir por WhatsApp' : 'Continue on WhatsApp',
          href: waLink(es ? 'Hola Jersson, estuve conversando con tu agente y quiero saber más.' : 'Hi Jersson, I was talking to your agent and would like to know more.'),
        }],
      },
    ],
    chips: es ? ['Evaluar una vacante', 'Dame un tour'] : ['Match a job offer', 'Give me a tour'],
  };
};

/* Resumen en texto de una respuesta, para darle contexto al modelo en el siguiente turno. */
export const toPlain = (res) =>
  res.blocks.map((b) => {
    if (b.type === 'text') return b.value;
    if (b.type === 'list') return b.items.join('; ');
    if (b.type === 'projects') return `[proyectos mostrados: ${b.ids.join(', ')}]`;
    if (b.type === 'match') return `[vacante: ${b.pct}% de ${b.total}; respaldado: ${b.ok.map((o) => o.label).join(', ')}; no figura: ${b.missing.join(', ') || 'nada'}]`;
    return '';
  }).filter(Boolean).join(' ');
