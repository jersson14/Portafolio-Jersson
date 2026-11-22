/* Base de conocimiento del agente: todo sale de los mismos datos que pinta la web. */
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { servicesData } from '../data/services';
import { techStackData } from '../data/techStack';
import { certificationsData, certDate } from '../data/certifications';
import { translations } from '../data/translations';
import { buildIndex, norm } from './text';

export const CONTACT = {
  whatsapp: '51974031318',
  email: 'jersson14071996@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jersson-corilla-miranda/',
  github: 'https://github.com/jersson14',
  cv: '/CV_jersson_corilla_miranda.pdf',
};

export const waLink = (text) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

/* Palabras con las que un visitante se refiere a cada proyecto. */
const ALIASES = {
  9: /derej|\blegal|abogad|lawyer|\bleyes\b|juridic|legaltech/,
  2: /tramite|documentari|mesa de partes|expediente|document tracking|document management|firma digital/,
  6: /transport|micaela|pasaje|encomienda|\bbus(es)?\b|agencia de viaje/,
  4: /colegio|escuela|educativ|escolar|\bschool|matricula|\balumno/,
  7: /\bgrifo|gasoliner|combustible|surtidor|gas station|estacion de servicio/,
  11: /farmaci|\bbotica|pharmac|medicamento/,
  13: /mi tienda|multinegocio|multi-business|restaurant|polleri|cafeteri|ferreteri|hardware store|bodega|minimarket|abarrote|boutique|\bropa\b|calzado|clothing|veterinari|pet shop|panaderi|pasteleri|bakery|libreri|licoreri|repuesto|\btienda|\bstore\b|\bshop\b|punto de venta|\bpos\b|pyme/,
  12: /perno/,
  1: /odont|dental|dentist/,
  3: /recupero|obra social|obras sociales/,
  5: /incocat|gestoria|saneamiento/,
  8: /\bgrados\b|titulos|sunedu|utea|diploma|degrees/,
  10: /nutri|diabet/,
};

export const findProjects = (text) => {
  const t = norm(text);
  return projectsData.filter((p) => ALIASES[p.id]?.test(t));
};

export const projectById = (id) => projectsData.find((p) => p.id === id);
export const liveProjects = projectsData.filter((p) => p.live).sort((a, b) => a.live.order - b.live.order);

const AI_TECH = /openai|rag|pinecone|claude|^ia$/i;
export const aiProjects = projectsData.filter((p) => p.live?.ai || p.technologies.some((x) => AI_TECH.test(x)));

/* Tecnologías que el agente sabe reconocer en una pregunta o en una vacante. */
const TERMS = [
  ['Python', /\bpython\b/], ['JavaScript', /\bjavascript\b/], ['TypeScript', /\btypescript\b/],
  ['React', /\breact(\.?js)?\b(?! native)/], ['React Native', /\breact native\b/], ['Next.js', /\bnext\.?js\b/], ['Vue.js', /\bvue(\.?js)?\b/],
  ['Angular', /\bangular\b/], ['Svelte', /\bsvelte\b/], ['Tailwind CSS', /\btailwind/], ['Bootstrap', /\bbootstrap\b/],
  ['HTML', /\bhtml5?\b/], ['CSS', /\bcss3?\b/], ['Node.js', /\bnode(\.?js)?\b/], ['Express', /\bexpress(\.?js)?\b/], ['NestJS', /\bnest\.?js\b/],
  ['PHP', /\bphp\b/], ['Laravel', /\blaravel\b/], ['Symfony', /\bsymfony\b/], ['Java', /\bjava\b/], ['Spring', /\bspring( boot)?\b/],
  ['C#', /c#/], ['.NET', /\.net\b/], ['Go', /\bgolang\b/], ['Rust', /\brust\b/], ['Ruby', /\bruby\b/], ['Kotlin', /\bkotlin\b/], ['Swift', /\bswift\b/], ['Flutter', /\bflutter\b/],
  ['FastAPI', /\bfastapi\b/], ['Django', /\bdjango\b/], ['Flask', /\bflask\b/], ['GraphQL', /\bgraphql\b/],
  ['MySQL', /\bmysql\b/], ['PostgreSQL', /\bpostgres(ql)?\b/], ['MongoDB', /\bmongo(db)?\b/], ['SQL Server', /\bsql server\b/], ['Oracle', /\boracle\b/],
  ['SQLite', /\bsqlite\b/], ['MariaDB', /\bmariadb\b/], ['Supabase', /\bsupabase\b/], ['Redis', /\bredis\b/], ['NoSQL', /\bnosql\b/], ['SQL', /\bsql\b(?! server)/],
  ['AWS', /\baws\b|amazon web services/], ['Azure', /\bazure\b/], ['Google Cloud', /\bgcp\b|google cloud/], ['Docker', /\bdocker\b/], ['Kubernetes', /\bkubernetes\b|\bk8s\b/],
  ['Terraform', /\bterraform\b/], ['Jenkins', /\bjenkins\b/], ['CI/CD', /\bci ?\/ ?cd\b/], ['Git', /\bgit\b/], ['GitHub', /\bgithub\b/], ['GitLab', /\bgitlab\b/], ['Linux', /\blinux\b/], ['Vercel', /\bvercel\b/],
  ['Power BI', /\bpower ?bi\b/], ['Tableau', /\btableau\b/], ['QuickSight', /\bquicksight\b/], ['SSIS', /\bssis\b/], ['ETL', /\betl\b/], ['Pandas', /\bpandas\b/], ['Spark', /\bspark\b/], ['Kafka', /\bkafka\b/],
  ['Snowflake', /\bsnowflake\b/], ['Databricks', /\bdatabricks\b/], ['Airflow', /\bairflow\b/], ['Power Automate', /\bpower automate\b/],
  ['RAG', /\brag\b/], ['OpenAI', /\bopenai\b|\bgpt(-\d)?\b/], ['Claude', /\bclaude\b/], ['Gemini', /\bgemini\b/], ['Pinecone', /\bpinecone\b/], ['MCP', /\bmcp\b/], ['LangChain', /\blangchain\b/],
  ['TensorFlow', /\btensorflow\b/], ['PyTorch', /\bpytorch\b/], ['Web Scraping', /\b(web )?scraping\b/], ['jQuery', /\bjquery\b/], ['Scrum', /\bscrum\b/], ['SAP', /\bsap\b/], ['Salesforce', /\bsalesforce\b/],
];

const skillSources = [
  ...Object.values(techStackData).flatMap((c) => c.technologies.map((x) => x.name)),
  ...translations.es.about.specialties.items.map((i) => i.desc),
].map(norm);
const certTitles = certificationsData.map((c) => norm(`${c.title.es} ${c.title.en} ${c.issuer.en}`));

/* Evidencia verificable de una tecnología dentro del portafolio. */
export const evidence = ([label, re]) => {
  const projects = projectsData.filter((p) => p.technologies.some((x) => re.test(norm(x))));
  const jobs = experienceData.filter((e) => e.technologies.some((x) => re.test(norm(x))));
  const listed = skillSources.some((s) => re.test(s));
  const certified = certTitles.some((s) => re.test(s));
  return { label, projects, jobs, listed, certified, ok: listed || certified || projects.length > 0 || jobs.length > 0 };
};

export const findTerms = (text) => {
  const t = norm(text);
  return TERMS.filter(([, re]) => re.test(t));
};

/* Índice de búsqueda: un documento por proyecto, empleo, servicio y certificado. */
const docs = [
  ...projectsData.map((p) => ({
    type: 'project',
    ref: p,
    text: [
      p.title.es, p.title.es, p.title.en, p.description.es, p.description.en, p.category, ...p.technologies,
      ...(p.live ? p.live.features.flatMap((f) => [f.es, f.en]) : []),
    ].join(' '),
  })),
  ...experienceData.map((e) => ({
    type: 'job',
    ref: e,
    text: [e.company, e.position.es, e.position.en, ...e.responsibilities.es, ...e.responsibilities.en, ...e.technologies].join(' '),
  })),
  ...servicesData.map((s) => ({
    type: 'service',
    ref: s,
    text: [s.title.es, s.title.en, s.description.es, s.description.en].join(' '),
  })),
  ...certificationsData.map((c) => ({
    type: 'cert',
    ref: c,
    text: [c.title.es, c.title.en, c.issuer.es].join(' '),
  })),
];

export const docCount = docs.length;
export const search = buildIndex(docs);
export { projectsData, experienceData, servicesData, certificationsData, certDate };
