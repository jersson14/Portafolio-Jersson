import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  FaBus, FaCheck, FaExternalLinkAlt, FaFileAlt, FaGasPump, FaGithub, FaKey, FaLock,
  FaPills, FaSchool, FaStar, FaStore, FaStream,
} from 'react-icons/fa';
import { projectsData } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

const ICONS = { 6: FaBus, 11: FaPills, 7: FaGasPump, 2: FaStream, 13: FaStore, 4: FaSchool };
const systems = projectsData.filter((p) => p.live).sort((a, b) => a.live.order - b.live.order);

/* Comprueba desde el navegador si la demo responde. Si falla no afirma nada. */
const usePing = (url, enabled) => {
  const [result, setResult] = useState({});
  useEffect(() => {
    if (!enabled || result[url] !== undefined) return undefined;
    let alive = true;
    const start = performance.now();
    fetch(url, { mode: 'no-cors', cache: 'no-store', credentials: 'omit' })
      .then(() => alive && setResult((r) => ({ ...r, [url]: Math.round(performance.now() - start) })))
      .catch(() => alive && setResult((r) => ({ ...r, [url]: null })));
    return () => { alive = false; };
  }, [url, enabled, result]);
  return result[url];
};

const LiveSystems = () => {
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const tabs = useRef([]);
  const inView = useInView(ref, { margin: '-80px' });
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);

  const p = systems[active];
  const ms = usePing(p.demoUrl, inView);
  const host = new URL(p.demoUrl).host;

  const select = (i) => { setActive(i); setShot(0); };

  const onKey = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + systems.length) % systems.length;
    select(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div id="demos" ref={ref} className="mb-20 scroll-mt-28">
      <div className="mb-8 max-w-2xl">
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{t('live.title')}</h3>
        <p className="text-dark-300 leading-relaxed">{t('live.subtitle')}</p>
      </div>

      <div className="live-shell">
        {/* Pestañas */}
        <div className="live-tabs" role="tablist" aria-label={t('live.title')} onKeyDown={onKey}>
          {systems.map((s, i) => {
            const Icon = ICONS[s.id];
            const on = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => { tabs.current[i] = el; }}
                type="button"
                role="tab"
                id={`live-tab-${s.id}`}
                aria-selected={on}
                aria-controls="live-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                className={`live-tab ${on ? 'is-on' : ''}`}
              >
                {on && <motion.span layoutId="liveTab" className="live-tab-bg" transition={{ duration: reduced ? 0 : 0.3 }} />}
                <Icon size={16} className="shrink-0 relative" />
                <span className="relative flex-1 text-left">{s.live.short[language]}</span>
                {s.live.ai && <span className="live-ai relative">{language === 'es' ? 'IA' : 'AI'}</span>}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div id="live-panel" role="tabpanel" aria-labelledby={`live-tab-${p.id}`} className="min-w-0">
          <div className="live-browser">
            <div className="live-bar">
              <span className="flex gap-1.5" aria-hidden="true"><i /><i /><i /></span>
              <span className="live-url"><FaLock size={9} className="shrink-0" /> <span className="truncate">{host}</span></span>
              {typeof ms === 'number' && (
                <span className="live-ping"><b /> {t('live.online')} <em>{ms} ms</em></span>
              )}
            </div>
            <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="live-screen group" aria-label={`${t('projects.buttons.demo')}: ${p.title[language]}`}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={p.live.shots[shot]}
                  src={p.live.shots[shot]}
                  alt={p.title[language]}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>
              <span className="live-enter"><FaExternalLinkAlt size={12} /> {t('live.enter')}</span>
            </a>
            <div className="live-thumbs">
              {p.live.shots.map((src, i) => (
                <button key={src} type="button" onClick={() => setShot(i)} aria-label={`${t('live.shot')} ${i + 1}`} aria-pressed={i === shot} className={i === shot ? 'is-on' : ''}>
                  <img src={src} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="live-info"
            >
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{p.title[language]}</h4>
                <p className="text-dark-300 text-sm md:text-base leading-relaxed mb-5">{p.description[language]}</p>
                <div className="flex flex-wrap gap-2.5">
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="live-btn live-btn-main">
                    <FaExternalLinkAlt size={12} /> {t('live.enter')}
                  </a>
                  <a href={p.live.docUrl} target="_blank" rel="noopener noreferrer" className="live-btn">
                    <FaFileAlt size={13} /> {t('live.docs')}
                  </a>
                  <button type="button" className="live-btn" onClick={() => window.dispatchEvent(new CustomEvent('openCaseStudy', { detail: { projectId: p.id } }))}>
                    <FaStar size={12} /> {t('projects.buttons.case_study')}
                  </button>
                  {p.githubUrl !== '#' && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="live-btn">
                      <FaGithub size={14} /> GitHub
                    </a>
                  )}
                </div>
                {p.live.trialLogin && (
                  <p className="flex items-center gap-2 text-xs text-dark-400 mt-4"><FaKey size={10} /> {t('live.trial')}</p>
                )}
              </div>

              <div>
                <dl className="live-facts">
                  {p.live.facts.map((f) => (
                    <div key={f.value}>
                      <dt>{f.label[language]}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="space-y-2.5">
                  {p.live.features.map((f) => (
                    <li key={f.es} className="flex items-start gap-2.5 text-sm text-dark-200 leading-snug">
                      <FaCheck size={10} className="text-primary-400 mt-1 shrink-0" /> {f[language]}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {p.technologies.map((x) => <span key={x} className="tech-badge text-xs">{x}</span>)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="text-xs text-dark-400 mt-4">{t('live.note')}</p>
    </div>
  );
};

export default LiveSystems;
