/* Utilidades de texto del agente: normalización, tokens y BM25. Sin dependencias. */

export const norm = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();

const STOP = new Set((
  'a al algo alguna algun ante como con cual cuales cuando de del desde donde e el ella en entre era eres es esa ese eso esta este esto ' +
  'fue ha hace hacer has hay haz hola la las le les lo los mas me mi mis mucho muy no nos o os otro para pero por porque pues que quien ' +
  'quiero se ser si sin sobre son soy su sus tal te tiene tienes tienen tu tus un una uno unos y ya yo puede puedes puedo hizo hecho ' +
  'sistema sistemas proyecto proyectos jersson necesito dime cuentame ' +
  'an and any are as at be been by can could did do does for from had have he her him his how i if in is it its me my of on or our ' +
  'she so tell that the their them there they this to was we were what when where which who why will with would you your about ' +
  'system systems project projects need want know'
).split(' '));

export const stem = (w) => {
  if (w.length > 5 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith('s')) return w.slice(0, -1);
  return w;
};

export const tokens = (s) =>
  (norm(s).match(/[a-z0-9+#.]+/g) || [])
    .map((w) => w.replace(/^\.+|\.+$/g, ''))
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);

/* BM25 clásico (k1 = 1.4, b = 0.75) sobre un índice en memoria. */
export const buildIndex = (docs) => {
  const df = new Map();
  const items = docs.map((doc) => {
    const toks = tokens(doc.text);
    const tf = new Map();
    toks.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
    tf.forEach((_, t) => df.set(t, (df.get(t) || 0) + 1));
    return { doc, tf, len: toks.length };
  });
  const avg = items.reduce((a, i) => a + i.len, 0) / (items.length || 1);
  const N = items.length;

  return (query, limit = 4) => {
    const q = [...new Set(tokens(query))];
    return items
      .map(({ doc, tf, len }) => {
        let score = 0;
        let hits = 0;
        q.forEach((t) => {
          const f = tf.get(t);
          if (!f) return;
          hits += 1;
          const n = df.get(t);
          const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
          score += (idf * f * 2.4) / (f + 1.4 * (0.25 + (0.75 * len) / avg));
        });
        return { doc, score, coverage: q.length ? hits / q.length : 0 };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  };
};

const ES_HINT = /\b(que|como|cual|cuales|quien|para|con|tiene|tienes|quiero|necesito|hola|gracias|proyectos|experiencia|cuanto|donde|muestrame|abre|sabe|puedes|los|las|una|del)\b/g;
const EN_HINT = /\b(what|how|which|who|for|with|does|have|want|need|hello|hi|thanks|projects|experience|much|where|show|open|know|can|the|his|has|is|are)\b/g;

export const detectLang = (text, fallback) => {
  const t = norm(text);
  const es = (t.match(ES_HINT) || []).length;
  const en = (t.match(EN_HINT) || []).length;
  if (es === en) return fallback;
  return es > en ? 'es' : 'en';
};
