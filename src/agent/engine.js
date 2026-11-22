/*
 * Motor del agente. Corre por completo en el navegador: enruta la pregunta a una
 * herramienta, recupera datos del portafolio y devuelve bloques para pintar, la traza
 * de lo que hizo y, si corresponde, una acción sobre la página.
 * No usa un LLM: cuando no encuentra algo lo dice, no lo inventa. Es el respaldo de /api/chat.
 */
import { detectLang, norm } from './text';
import {
  CONTACT, waLink, findProjects, liveProjects, aiProjects, evidence, findTerms, search, docCount,
  experienceData, servicesData, certificationsData, projectsData,
} from './knowledge';

const L = (lang, es, en) => (lang === 'es' ? es : en);

const SECTIONS = [
  ['home', /\binicio\b|\bhome\b|\btop\b/],
  ['about', /sobre mi|sobre el|about/],
  ['tech-stack', /tecnologias|stack|tech/],
  ['demos', /\bdemos?\b/],
  ['projects', /proyectos|projects|portafolio|portfolio/],
  ['experience', /experiencia|experience|trayectoria/],
  ['certifications', /certifica/],
  ['services', /servicios|services/],
  ['contact', /contacto|contact/],
];

const text = (value) => ({ type: 'text', value });
const cards = (projects) => ({ type: 'projects', ids: projects.map((p) => p.id) });
const links = (...items) => ({ type: 'links', items });
const list = (items) => ({ type: 'list', items });

const whatsapp = (lang, msg, label) => ({
  label: label || L(lang, 'Escribir por WhatsApp', 'Message on WhatsApp'),
  href: waLink(msg),
  kind: 'whatsapp',
});

const cvLink = (lang) => ({ label: L(lang, 'Descargar CV (PDF)', 'Download CV (PDF)'), href: CONTACT.cv, kind: 'cv', download: true });

export const suggestions = (lang) =>
  lang === 'es'
    ? ['Tengo una farmacia, ¿qué me recomiendas?', 'Evaluar una vacante', '¿Qué proyectos usan IA?', 'Dame un tour', '¿Cuánto cuesta un sistema?']
    : ['I run a pharmacy, what do you recommend?', 'Match a job offer', 'Which projects use AI?', 'Give me a tour', 'How much does a system cost?'];

export const tourSteps = (lang) => [
  { id: 'home', text: L(lang, 'Jersson Corilla: ingeniero de sistemas, arquitectura cloud e IA aplicada.', 'Jersson Corilla: systems engineer, cloud architecture and applied AI.') },
  { id: 'tech-stack', text: L(lang, 'Su stack: del frontend a la nube, datos e IA.', 'The stack: from frontend to cloud, data and AI.') },
  { id: 'projects', text: L(lang, 'DereJ-IA, su plataforma legal con RAG sobre legislación peruana.', 'DereJ-IA, a legal platform with RAG over Peruvian law.') },
  { id: 'demos', text: L(lang, `${liveProjects.length} sistemas con demo abierta: cámbialos desde las pestañas y pruébalos.`, `${liveProjects.length} systems with open demos: switch tabs and try them.`) },
  { id: 'experience', text: L(lang, 'Experiencia desde 2019: sector público, educación, cloud y producto propio.', 'Experience since 2019: public sector, education, cloud and an in-house product.') },
  { id: 'certifications', text: L(lang, 'Certificaciones, con AWS Cloud Practitioner al frente.', 'Certifications, led by AWS Cloud Practitioner.') },
  { id: 'contact', text: L(lang, 'Y aquí se conversa. Fin del tour.', 'And this is where the conversation starts. End of tour.') },
];

/* Compara el texto de una vacante contra la evidencia del portafolio. */
const matchJob = (raw, lang) => {
  const found = findTerms(raw).map(evidence);
  if (found.length < 2) {
    return {
      blocks: [text(L(lang,
        'Pega aquí el texto de la vacante con sus requisitos técnicos. Reconozco lenguajes, frameworks, bases de datos, nube, datos e IA, y te muestro qué está respaldado por proyectos o empleos.',
        'Paste the job description with its technical requirements. I recognize languages, frameworks, databases, cloud, data and AI, and show what is backed by projects or jobs.'))],
      trace: [['evaluar_vacante', '', L(lang, 'esperando texto', 'waiting for text')]],
      awaiting: 'job',
    };
  }
  const ok = found.filter((f) => f.ok);
  const missing = found.filter((f) => !f.ok);
  return {
    blocks: [
      {
        type: 'match',
        pct: Math.round((ok.length / found.length) * 100),
        total: found.length,
        ok: ok.map((f) => ({
          label: f.label,
          detail: [
            f.projects.length && L(lang, `${f.projects.length} proyecto${f.projects.length > 1 ? 's' : ''}`, `${f.projects.length} project${f.projects.length > 1 ? 's' : ''}`),
            f.jobs.length && L(lang, `${f.jobs.length} empleo${f.jobs.length > 1 ? 's' : ''}`, `${f.jobs.length} job${f.jobs.length > 1 ? 's' : ''}`),
            f.certified && L(lang, 'certificado', 'certified'),
          ].filter(Boolean).join(' · ') || L(lang, 'en el stack', 'in the stack'),
        })),
        missing: missing.map((f) => f.label),
      },
      text(L(lang,
        'Es una comparación literal de tecnologías; no mide seniority ni habilidades blandas.',
        'This is a literal technology comparison; it does not measure seniority or soft skills.')),
      links(
        whatsapp(lang, L(lang,
          `Hola Jersson, tengo una vacante que pide: ${found.map((f) => f.label).join(', ')}. ¿Conversamos?`,
          `Hi Jersson, I have a role that requires: ${found.map((f) => f.label).join(', ')}. Can we talk?`),
        L(lang, 'Conversar sobre la vacante', 'Discuss this role')),
        cvLink(lang),
      ),
    ],
    trace: [
      ['extraer_requisitos', '', `${found.length}`],
      ['buscar_evidencia', L(lang, 'proyectos, empleos, certificados', 'projects, jobs, certificates'), `${ok.length}/${found.length}`],
    ],
  };
};

const projectAnswer = (p, raw, lang) => {
  const t = norm(raw);
  const asksForOwn = /\b(tengo|necesito|busco|mi negocio|para mi|para una|para un|recomiend|i (run|own|have|need)|for my|recommend)/.test(t);
  const asksTech = /tecnolog|stack|hecho con|construid|built with|technolog/.test(t);
  const blocks = [];
  if (asksForOwn && p.live) {
    blocks.push(text(L(lang, `Para eso te serviría ${p.title.es}. ${p.description.es}`, `${p.title.en} would fit. ${p.description.en}`)));
    if (p.live) blocks.push(list(p.live.features.slice(0, 3).map((f) => f[lang])));
  } else if (asksTech) {
    blocks.push(text(L(lang, `${p.title.es} usa: ${p.technologies.join(', ')}.`, `${p.title.en} uses: ${p.technologies.join(', ')}.`)));
  } else {
    blocks.push(text(p.description[lang]));
  }
  blocks.push(cards([p]));
  if (asksForOwn) {
    blocks.push(links(whatsapp(lang,
      L(lang, `Hola Jersson, vi ${p.title.es} en tu portafolio y quiero una cotización.`, `Hi Jersson, I saw ${p.title.en} in your portfolio and would like a quote.`),
      L(lang, 'Pedir cotización', 'Request a quote'))));
  }
  return blocks;
};

export const ask = (raw, { uiLang, lastProjectId, awaiting } = {}) => {
  const lang = detectLang(raw, uiLang);
  const t = norm(raw);
  const named = findProjects(raw);
  const last = projectsData.find((p) => p.id === lastProjectId);
  const refersToLast = last && !named.length && /\b(su|ese|esa|este|esta|eso|lo|la|it|its|that|this)\b/.test(t);
  const target = named[0] || (refersToLast ? last : null);
  const terms = findTerms(raw);
  const out = (blocks, trace, extra = {}) => ({ lang, blocks, trace, lastProjectId: target?.id ?? lastProjectId, ...extra });

  /* ── Vacante ── */
  const isPastedJob = raw.length > 180 && terms.length >= 3;
  if (awaiting === 'job' || isPastedJob || /\bvacante|oferta (laboral|de trabajo)|puesto de trabajo|job (offer|description|posting)|match a job/.test(t)) {
    if (awaiting !== 'job' || terms.length >= 2) {
      const r = matchJob(raw, lang);
      return out(r.blocks, r.trace, { awaiting: r.awaiting });
    }
  }

  /* ── Acciones sobre la página ── */
  const wantsEn = /\b(ingles|english)\b/.test(t);
  const wantsEs = /\b(espanol|spanish|castellano)\b/.test(t);
  if ((wantsEn || wantsEs) && /cambia|pon|switch|change|traduc|translate|idioma|language|pagina|page|site|web/.test(t)) {
    const to = wantsEn ? 'en' : 'es';
    return out([text(to === 'en' ? 'Done, the site is now in English.' : 'Listo, la página está en español.')], [['cambiar_idioma', to, 'ok']], { lang: to, effect: { type: 'lang', to } });
  }

  if (/\btour\b|recorrido guiado|visita guiada|walk me through/.test(t) && !named.length) {
    return out([text(L(lang, 'Empiezo el recorrido. Puedes pausarlo o salir cuando quieras.', 'Starting the tour. You can pause or leave at any time.'))], [['iniciar_tour', '', `${tourSteps(lang).length}`]], { effect: { type: 'tour' } });
  }

  if (target && /caso de estudio|case study|arquitectura|architecture|como (lo |la )?(hizo|hiciste|construy|funciona)|how (was|does|did)/.test(t) && target.hasCaseStudy) {
    return out(
      [text(L(lang, `Te abro el caso de estudio de ${target.title.es}.`, `Opening the case study for ${target.title.en}. Its content is in Spanish.`)), cards([target])],
      [['abrir_caso_de_estudio', target.title[lang], 'ok']],
      { effect: { type: 'case', id: target.id } },
    );
  }

  if (/\b(llevame|lleva|ve a|ir a|anda a|muestrame|mostrar|ensename|abre|go to|show me|take me|open|scroll)\b/.test(t) && !target) {
    const section = SECTIONS.find(([, re]) => re.test(t));
    if (section && !(section[0] === 'projects' && /\b(ia|ai)\b/.test(t)) && !terms.length) {
      return out([text(L(lang, 'Vamos para allá.', 'Taking you there.'))], [['ir_a_seccion', `#${section[0]}`, 'ok']], { effect: { type: 'scroll', id: section[0] } });
    }
  }

  /* ── Recursos ── */
  if (/\bcv\b|curriculum|\bresume\b|hoja de vida/.test(t)) {
    return out([text(L(lang, 'Aquí está su CV actualizado.', 'Here is the latest CV.')), links(cvLink(lang))], [['obtener_cv', '', 'PDF']]);
  }

  if (/documentacion|documentation|brochure|\bpdf\b|ficha tecnica/.test(t)) {
    const set = target?.live ? [target] : liveProjects;
    return out(
      [text(L(lang, 'Documentación disponible:', 'Available documentation (in Spanish):')), links(...set.map((p) => ({ label: p.live.short[lang], href: p.live.docUrl, kind: 'doc' })))],
      [['listar_documentos', target?.title[lang] || '', `${set.length}`]],
    );
  }

  if (/\bdemos?\b|en vivo|\bprobar|\blive\b|try it/.test(t)) {
    if (target) {
      const hasDemo = target.demoUrl && target.demoUrl !== '#';
      return out(
        [text(hasDemo ? L(lang, 'Puedes probarlo ahora mismo:', 'You can try it right now:') : L(lang, 'Ese proyecto todavía no tiene demo pública.', 'That project has no public demo yet.')), cards([target])],
        [['obtener_demo', target.title[lang], hasDemo ? 'ok' : '—']],
      );
    }
    return out(
      [text(L(lang, `Hay ${liveProjects.length} sistemas con demo abierta:`, `There are ${liveProjects.length} systems with an open demo:`)), cards(liveProjects)],
      [['listar_demos', '', `${liveProjects.length}`]],
      { effect: { type: 'scroll', id: 'demos', soft: true } },
    );
  }

  if (/precio|\bcuesta|\bcosto|cotiza|cuanto (vale|cobra|sale)|\bprice|pricing|\bcost\b|\bquote\b|how much|presupuesto|tarifa/.test(t)) {
    const name = target?.title[lang];
    return out(
      [
        text(L(lang,
          `${name ? `${name}: el` : 'El'} precio se conversa según el tamaño del negocio y lo que necesites adaptar. Las propuestas manejan pago mensual, anual o compra completa; la facturación electrónica con SUNAT se contrata aparte.`,
          `${name ? `${name}: pricing` : 'Pricing'} is discussed based on business size and customization. Proposals offer monthly, yearly or one-time purchase; SUNAT e-invoicing is contracted separately.`)),
        ...(target ? [cards([target])] : []),
        links(whatsapp(lang,
          L(lang, `Hola Jersson, quiero cotizar ${name || 'un sistema'}. Mi negocio es: `, `Hi Jersson, I would like a quote for ${name || 'a system'}. My business is: `),
          L(lang, 'Pedir cotización', 'Request a quote'))),
      ],
      [['consultar_modalidades', name || '', '3']],
    );
  }

  if (/contact|whatsapp|\bcorreo|\bemail|\bllamar|contratar|\bhire\b|hiring|disponib|availab|linkedin|telefono|phone/.test(t) && !/farmaci/.test(t)) {
    return out(
      [
        text(L(lang, `Lo más rápido es WhatsApp. También puedes escribir a ${CONTACT.email}.`, `WhatsApp is the fastest way. You can also write to ${CONTACT.email}.`)),
        links(
          whatsapp(lang, L(lang, 'Hola Jersson, te escribo desde tu portafolio.', 'Hi Jersson, I am writing from your portfolio.')),
          { label: 'Email', href: `mailto:${CONTACT.email}`, kind: 'mail' },
          { label: 'LinkedIn', href: CONTACT.linkedin, kind: 'linkedin' },
        ),
      ],
      [['obtener_contacto', '', '3']],
    );
  }

  /* ── Proyectos concretos ── */
  if (named.length > 1 && !/\b(tengo|necesito|i (run|own|have|need))\b/.test(t)) {
    return out([text(L(lang, 'Encontré estos proyectos:', 'I found these projects:')), cards(named.slice(0, 4))], [['buscar_proyectos', raw.slice(0, 40), `${named.length}`]]);
  }
  if (target) return out(projectAnswer(target, raw, lang), [['buscar_proyectos', raw.slice(0, 40), '1']]);

  /* ── Tecnologías ── */
  if (terms.length) {
    const ev = terms.map(evidence);
    const seen = new Map();
    ev.forEach((e) => e.projects.forEach((p) => seen.set(p.id, p)));
    const lines = ev.map((e) => {
      if (!e.ok) return L(lang, `${e.label}: no figura en el portafolio.`, `${e.label}: not listed in the portfolio.`);
      const parts = [
        e.projects.length && L(lang, `${e.projects.length} proyecto(s)`, `${e.projects.length} project(s)`),
        e.jobs.length && L(lang, `${e.jobs.length} empleo(s)`, `${e.jobs.length} job(s)`),
        e.certified && L(lang, 'certificación', 'certification'),
      ].filter(Boolean);
      return `${e.label}: ${parts.length ? parts.join(', ') : L(lang, 'parte de su stack', 'part of the stack')}.`;
    });
    const found = [...seen.values()].slice(0, 4);
    return out(
      [
        text(ev.every((e) => !e.ok)
          ? L(lang, 'No encontré evidencia de eso en el portafolio. Mejor pregúntale directamente.', 'I found no evidence of that in the portfolio. Better to ask directly.')
          : L(lang, 'Esto es lo que respalda el portafolio:', 'This is what the portfolio backs up:')),
        list(lines),
        ...(found.length ? [cards(found)] : []),
      ],
      [['buscar_evidencia', ev.map((e) => e.label).join(', '), `${seen.size}`]],
    );
  }

  if (/\b(ia|ai|llm|agentes?|agents?|chatbots?)\b|inteligencia artificial|artificial intelligence/.test(t)) {
    return out(
      [text(L(lang, `${aiProjects.length} proyectos integran IA. DereJ-IA y NutriDiabetes usan RAG sobre bases vectoriales; los sistemas de gestión suman asistentes.`, `${aiProjects.length} projects integrate AI. DereJ-IA and NutriDiabetes use RAG over vector databases; the management systems add assistants.`)), cards(aiProjects)],
      [['filtrar_proyectos', L(lang, 'con IA', 'with AI'), `${aiProjects.length}`]],
    );
  }

  /* ── Perfil ── */
  if (/certifica/.test(t)) {
    return out(
      [text(L(lang, 'Certificaciones principales:', 'Main certifications:')), list(certificationsData.slice(0, 6).map((c) => `${c.title[lang]} · ${c.issuer[lang]}, ${c.year}`))],
      [['listar_certificaciones', '', `${certificationsData.length}`]],
    );
  }
  if (/estudi(o|os|a|aste)\b|maestria|universidad|formacion|educacion|titulo|colegiad|\bcip\b|master|degree|university|education|study|studied/.test(t)) {
    return out(
      [text(L(lang,
        'Ingeniero de Sistemas e Informática por la Universidad Tecnológica de los Andes, colegiado CIP 296777, y egresado de la Maestría en Ingeniería de Software de la Universidad Continental.',
        'Systems and Informatics Engineer from Universidad Tecnológica de los Andes, licensed (CIP 296777), and completed the Master’s program in Software Engineering at Universidad Continental.')), links(cvLink(lang))],
      [['obtener_perfil', L(lang, 'formación', 'education'), 'ok']],
    );
  }
  if (/experiencia|experience|trabaj|\bwork|empleo|\bjob|anos|years|carrera|career/.test(t)) {
    return out(
      [
        text(L(lang, 'Más de 6 años de experiencia. Hoy está en:', 'Over 6 years of experience. Current roles:')),
        list(experienceData.filter((e) => e.current).map((e) => `${e.position[lang]} · ${e.company} (${e.period[lang]})`)),
        text(L(lang, 'Antes:', 'Previously:')),
        list(experienceData.filter((e) => !e.current).slice(0, 3).map((e) => `${e.position[lang]} · ${e.company.split(' - ')[0]} (${e.period[lang]})`)),
      ],
      [['listar_experiencia', '', `${experienceData.length}`]],
    );
  }
  if (/servicio|service|ofrece|offer/.test(t)) {
    return out([text(L(lang, 'Servicios que ofrece:', 'Services offered:')), list(servicesData.map((s) => s.title[lang]))], [['listar_servicios', '', `${servicesData.length}`]]);
  }
  if (/tecnolog|\bstack\b|technolog/.test(t)) {
    return out(
      [text(L(lang, 'Te llevo al stack. También puedes preguntarme por una tecnología puntual, por ejemplo: ¿sabe Docker?', 'Taking you to the stack. You can also ask about a specific technology, for example: does Jersson know Docker?'))],
      [['ir_a_seccion', '#tech-stack', 'ok']], { effect: { type: 'scroll', id: 'tech-stack' } },
    );
  }
  if (/quien (es|eres)|who (is|are)|sobre (ti|el|jersson)|about (you|jersson)|eres (humano|un bot|una ia)|chatgpt|como funcionas|how do you work/.test(t)) {
    const aboutBot = /eres|are you|chatgpt|funcionas|you work/.test(t) && !/jersson/.test(t);
    return out(
      [text(aboutBot
        ? L(lang,
          `Soy el agente de este portafolio. Corro en tu navegador: indexo ${docCount} documentos con BM25, elijo una herramienta y actúo sobre la página. Esta respuesta salió de mi motor local, sin LLM.`,
          `I am this portfolio's agent. I run in your browser: I index ${docCount} documents with BM25, pick a tool and act on the page. This answer came from my local engine, without an LLM.`)
        : L(lang,
          'Jersson Corilla es ingeniero de sistemas colegiado, AWS Certified Cloud Practitioner y fundador de DereJ-IA. Trabaja en arquitectura cloud, ingeniería de datos e IA aplicada (RAG).',
          'Jersson Corilla is a licensed systems engineer, AWS Certified Cloud Practitioner and founder of DereJ-IA, working on cloud architecture, data engineering and applied AI (RAG).'))],
      [['obtener_perfil', '', 'ok']],
      aboutBot ? {} : { chips: suggestions(lang).slice(1, 4) },
    );
  }
  if (/^(hola|buenas|buenos|hey|hi|hello|que tal)\b/.test(t) && t.length < 30) {
    return out([text(L(lang, '¡Hola! Pregúntame por sus proyectos, pega una vacante o cuéntame qué negocio tienes.', 'Hi! Ask about the projects, paste a job offer or tell me about your business.'))], [], { chips: suggestions(lang) });
  }
  if (/gracias|thank/.test(t)) return out([text(L(lang, '¡A ti! Si quieres seguir la conversación, Jersson responde por WhatsApp.', 'Thank you! To keep talking, Jersson replies on WhatsApp.')), links(whatsapp(lang, L(lang, 'Hola Jersson, vengo de tu portafolio.', 'Hi Jersson, I come from your portfolio.')))], []);
  if (/ayuda|\bhelp\b|que (puedes|sabes) hacer|what can you do/.test(t)) {
    return out(
      [text(L(lang, 'Puedo:', 'I can:')), list(L(lang,
        ['Recomendar un sistema según tu negocio', 'Comparar una vacante con el perfil', 'Abrir demos, documentación y casos de estudio', 'Darte un tour o cambiar el idioma de la página'],
        ['Recommend a system for your business', 'Match a job offer with the profile', 'Open demos, documentation and case studies', 'Give you a tour or switch the site language']))],
      [], { chips: suggestions(lang) },
    );
  }

  /* ── Búsqueda general ── */
  const hits = search(raw).filter((h) => h.coverage >= 0.5 && h.score > 1.5);
  if (hits.length) {
    const projs = hits.filter((h) => h.doc.type === 'project').map((h) => h.doc.ref);
    const others = hits.filter((h) => h.doc.type !== 'project').map(({ doc }) =>
      doc.type === 'job' ? `${doc.ref.position[lang]} · ${doc.ref.company.split(' - ')[0]}` : doc.ref.title[lang]);
    return out(
      [text(L(lang, 'Esto es lo más cercano que encontré:', 'This is the closest I found:')), ...(others.length ? [list(others)] : []), ...(projs.length ? [cards(projs)] : [])],
      [['buscar_portafolio', raw.slice(0, 40), `${hits.length}/${docCount}`]],
    );
  }

  return out(
    [
      text(L(lang, 'No encontré eso en el portafolio y prefiero no inventarlo. Puedo pasarle tu pregunta a Jersson.', 'I could not find that in the portfolio and would rather not make it up. I can pass your question to Jersson.')),
      links(whatsapp(lang, L(lang, `Hola Jersson, tu agente no supo responder esto: ${raw.slice(0, 200)}`, `Hi Jersson, your agent could not answer this: ${raw.slice(0, 200)}`), L(lang, 'Enviar mi pregunta', 'Send my question'))),
    ],
    [['buscar_portafolio', raw.slice(0, 40), `0/${docCount}`]],
    { chips: suggestions(lang).slice(0, 3) },
  );
};
