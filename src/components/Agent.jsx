import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaArrowUp, FaCheck, FaGithub, FaChevronRight, FaEnvelope, FaExternalLinkAlt, FaFileAlt, FaFileDownload,
  FaLinkedin, FaMicrophone, FaMinus, FaPause, FaPlay, FaRedo, FaRobot, FaStar, FaTimes, FaVolumeMute, FaVolumeUp, FaWhatsapp,
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { ask, suggestions, tourSteps } from '../agent/engine';
import { projectById, docCount } from '../agent/knowledge';
import * as voice from '../agent/voice';
import { askRemote, clipFor, isLocalOnly, limitReply, LimitError, llmStatus, toPlain } from '../agent/remote';
import RobotBuddy from './RobotBuddy';
import RobotFace from './RobotFace';
import VoiceStage from './VoiceStage';

const LINK_ICON = {
  whatsapp: FaWhatsapp, cv: FaFileDownload, doc: FaFileAlt, mail: FaEnvelope, linkedin: FaLinkedin, github: FaGithub,
};

const goTo = (id, reduced) =>
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });

const caseOpen = () => !!document.querySelector('[data-case-study]');
const openCase = (id) => window.dispatchEvent(new CustomEvent('openCaseStudy', { detail: { projectId: id } }));

/* ── Bloques de respuesta ── */
const ProjectRow = ({ id, language, t }) => {
  const p = projectById(id);
  if (!p) return null;
  const hasDemo = p.demoUrl && p.demoUrl !== '#';
  return (
    <div className="agent-project">
      <img src={p.image} alt="" loading="lazy" decoding="async" />
      <div className="min-w-0 flex-1">
        <p className="agent-project-title">{p.title[language]}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
          {hasDemo && (
            <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="agent-link">
              <FaExternalLinkAlt size={9} /> {t('agent.demo')}
            </a>
          )}
          {p.live && (
            <a href={p.live.docUrl} target="_blank" rel="noopener noreferrer" className="agent-link">
              <FaFileAlt size={9} /> PDF
            </a>
          )}
          {p.hasCaseStudy && (
            <button type="button" onClick={() => openCase(p.id)} className="agent-link">
              <FaStar size={9} /> {t('agent.case')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MatchBlock = ({ block, t }) => (
  <div className="agent-match">
    <div className="flex items-end justify-between gap-3">
      <span className="agent-match-pct">{block.pct}%</span>
      <span className="text-xs text-dark-300 text-right pb-1">
        {block.ok.length}/{block.total} {t('agent.match_caption')}
      </span>
    </div>
    <div className="agent-match-bar">
      <motion.span initial={{ width: 0 }} animate={{ width: `${block.pct}%` }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
    </div>
    <ul className="space-y-1.5">
      {block.ok.map((o) => (
        <li key={o.label} className="flex items-baseline gap-2 text-[13px]">
          <FaCheck size={9} className="text-primary-400 shrink-0 translate-y-[1px]" />
          <span className="text-white font-medium">{o.label}</span>
          <span className="text-dark-400 text-xs ml-auto text-right">{o.detail}</span>
        </li>
      ))}
    </ul>
    {block.missing.length > 0 && (
      <p className="text-xs text-dark-300 mt-3 pt-3 border-t border-white/10">
        <span className="text-gold-400 font-medium">{t('agent.match_missing')}</span> {block.missing.join(', ')}
      </p>
    )}
  </div>
);

const Block = ({ block, language, t }) => {
  if (block.type === 'text') return <p>{block.value}</p>;
  if (block.type === 'list') {
    return (
      <ul className="agent-list">
        {block.items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    );
  }
  if (block.type === 'projects') {
    return <div className="space-y-2">{block.ids.map((id) => <ProjectRow key={id} id={id} language={language} t={t} />)}</div>;
  }
  if (block.type === 'match') return <MatchBlock block={block} t={t} />;
  if (block.type === 'links') {
    return (
      <div className="flex flex-wrap gap-2">
        {block.items.map((l) => {
          const Icon = LINK_ICON[l.kind] || FaExternalLinkAlt;
          return (
            <a
              key={l.href}
              href={l.href}
              {...(l.download ? { download: 'CV_Jersson_Corilla.pdf' } : { target: '_blank', rel: 'noopener noreferrer' })}
              className={`agent-cta ${l.kind === 'whatsapp' ? 'agent-cta-wa' : ''}`}
            >
              <Icon size={13} /> {l.label}
            </a>
          );
        })}
      </div>
    );
  }
  return null;
};

const Trace = ({ trace }) => (
  <div className="agent-trace" aria-hidden="true">
    {trace.map(([fn, arg, res]) => (
      <div key={`${fn}${arg}`}>
        <span className="text-accent-400">{fn}</span>(<span className="text-dark-300">{arg}</span>)
        <span className="text-primary-400"> → {res}</span>
      </div>
    ))}
  </div>
);

/* ── Barra del tour guiado ── */
const STEP_MS = 5200;

const Tour = ({ onEnd, sound, onTalk }) => {
  const { language, t } = useLanguage();
  const reduced = useReducedMotion();
  const steps = tourSteps(language);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => { goTo(steps[i].id, reduced); }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (paused) return undefined;
    let alive = true;
    let id;
    const next = () => alive && (i + 1 < steps.length ? setI(i + 1) : onEnd());
    const go = async () => {
      const began = performance.now();
      if (sound) {
        onTalk(true);
        await voice.playClip(`tour-${steps[i].id}`, language);
        if (!alive) return;
        onTalk(false);
      }
      /* Con voz avanza al terminar de narrar; sin voz, por tiempo */
      id = setTimeout(next, Math.max(sound ? 700 : 0, (sound ? 3200 : STEP_MS) - (performance.now() - began)));
    };
    go();
    return () => { alive = false; clearTimeout(id); voice.stop(); onTalk(false); };
  }, [i, paused, sound, language]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
      className="agent-tour" role="status"
    >
      <div className="flex items-center gap-3">
        <RobotFace className="agent-face" />
        <p className="flex-1 text-sm text-white leading-snug">{steps[i].text}</p>
        <button type="button" className="agent-icon" onClick={() => setPaused((v) => !v)} aria-label={paused ? t('agent.resume') : t('agent.pause')}>
          {paused ? <FaPlay size={11} /> : <FaPause size={11} />}
        </button>
        <button type="button" className="agent-icon" onClick={() => (i + 1 < steps.length ? setI(i + 1) : onEnd())} aria-label={t('agent.next')}>
          <FaChevronRight size={11} />
        </button>
        <button type="button" className="agent-icon" onClick={onEnd} aria-label={t('agent.close')}>
          <FaTimes size={12} />
        </button>
      </div>
      <div className="flex gap-1 mt-3">
        {steps.map((s, k) => (
          <span key={s.id} className={`h-0.5 flex-1 rounded-full ${k <= i ? 'bg-primary-400' : 'bg-white/15'}`} />
        ))}
      </div>
    </motion.div>
  );
};

const Agent = ({ asked, initialQuery }) => {
  const { language, setLanguage, t } = useLanguage();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(Boolean(asked));
  const [touring, setTouring] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [buddy, setBuddy] = useState(() => {
    try { return localStorage.getItem('jcm-robot') !== 'off'; } catch { return true; }
  });
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [llm, setLlm] = useState(false);
  const [quota, setQuota] = useState(null);
  const [happy, setHappy] = useState(false);
  /* Voz: null = apagado; si no, etapa de la conversación */
  const [stage, setStage] = useState(null);
  const [talking, setTalking] = useState(false);
  const [sound, setSound] = useState(() => {
    try { return localStorage.getItem('jcm-voice') !== 'off'; } catch { return true; }
  });
  const talkId = useRef(0);
  const convo = useRef(0);
  const ring = useRef(null);
  const fillers = useRef(0);
  const memory = useRef({});
  const history = useRef([]);
  const session = useRef(0);
  const busy = useRef(false);
  const timer = useRef(null);
  const happyTimer = useRef(null);
  const scroller = useRef(null);
  const field = useRef(null);
  const launcher = useRef(null);

  const run = useCallback((effect) => {
    const compact = window.matchMedia('(max-width: 768px)').matches;
    if (effect.type === 'lang') setLanguage(effect.to);
    if (effect.type === 'tour') { setOpen(false); setTouring(true); }
    if (effect.type === 'case') openCase(effect.id);
    if (effect.type === 'scroll') {
      if (effect.soft && compact) return;
      if (compact) setOpen(false);
      goTo(effect.id, reduced);
    }
  }, [reduced, setLanguage]);

  /* Dice una respuesta: voz en streaming, locución grabada o voz del sistema */
  const say = useCallback(async (res, onStart) => {
    const id = ++talkId.current;
    const begin = () => { if (id === talkId.current) { setTalking(true); onStart?.(); } };
    let ok = false;
    const clip = clipFor(res);
    const firstText = res.blocks?.find((b) => b.type === 'text')?.value;
    if (res.speech) ok = await voice.speak(res.speech, begin);
    else if (clip) { begin(); ok = await voice.playClip(clip, res.lang); }
    if (!ok && id === talkId.current && !clip) { begin(); ok = await voice.speakSystem(firstText, res.lang); }
    if (id === talkId.current) setTalking(false);
    return ok;
  }, []);

  const hush = useCallback(() => {
    talkId.current += 1;
    voice.stop();
    setTalking(false);
  }, []);

  const endVoice = useCallback(() => {
    convo.current += 1;
    voice.closeMic();
    hush();
    setStage(null);
  }, [hush]);

  const send = useCallback((raw, spoken = false) => {
    const q = raw.trim().slice(0, 6000);
    if (!q || busy.current) return Promise.resolve(null);
    if (!spoken) hush();
    busy.current = true;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: q, key: `u${m.length}` }]);
    setThinking(true);
    const mine = session.current;
    const local = ask(q, { uiLang: language, ...memory.current });
    history.current = [...history.current, { role: 'user', content: q }].slice(-9);

    const resolve = async () => {
      if (!isLocalOnly(local) && (await llmStatus()).enabled) {
        try {
          return await askRemote(history.current, spoken);
        } catch (err) {
          if (err instanceof LimitError) return limitReply(err, local.lang);
          console.warn('[agente] OpenAI no disponible, uso el motor local:', err.message);
          return { ...local, trace: [['openai', '', t('agent.llm_down')], ...local.trace] };
        }
      }
      await new Promise((r) => { timer.current = setTimeout(r, reduced ? 0 : 450); });
      return local;
    };

    return resolve().then((res) => {
      if (mine !== session.current) return null;
      memory.current = { lastProjectId: res.lastProjectId ?? memory.current.lastProjectId, awaiting: res.awaiting };
      history.current = [...history.current, { role: 'assistant', content: toPlain(res).slice(0, 1200) }];
      setMessages((m) => [...m, { role: 'agent', ...res, key: `a${m.length}` }]);
      setThinking(false);
      busy.current = false;
      if (res.quota) setQuota(res.quota);
      setHappy(true);
      clearTimeout(happyTimer.current);
      happyTimer.current = setTimeout(() => setHappy(false), 2200);
      if (res.effect) setTimeout(() => run(res.effect), 650);
      return res;
    });
  }, [hush, language, reduced, run, t]);

  /* Un turno: escuchar → transcribir → pensar → hablar → volver a escuchar */
  const converse = useCallback(async () => {
    const id = ++convo.current;
    const live = () => id === convo.current;
    const note = (key) => setMessages((m) => [...m, { role: 'agent', lang: language, trace: [], blocks: [{ type: 'text', value: t(key) }], key: `a${m.length}` }]);
    voice.unlock();
    hush();
    setStage('listening');
    try {
      await voice.openMic();
    } catch {
      if (live()) { setStage(null); note('voice.denied'); }
      return;
    }

    for (let misses = 0; live();) {
      setStage('listening');
      const blob = await voice.record((v) => { if (ring.current) ring.current.style.transform = `scale(${1 + v * 0.55})`; });
      if (!live()) return;
      if (!blob) { setStage('paused'); voice.closeMic(); return; }

      setStage('transcribing');
      let heard;
      try {
        heard = await voice.transcribe(blob);
      } catch {
        if (live()) { setStage('paused'); note('voice.failed'); voice.closeMic(); }
        return;
      }
      if (!live()) return;

      if (heard.limit) {
        const res = limitReply(heard.limit, language);
        setQuota(res.quota);
        setMessages((m) => [...m, { role: 'agent', ...res, key: `a${m.length}` }]);
        setStage('speaking');
        await say(res);
        if (live()) endVoice();
        return;
      }
      if (!heard.text) {
        misses += 1;
        if (misses > 1) { setStage('paused'); voice.closeMic(); return; }
        setStage('speaking');
        setTalking(true);
        await voice.playClip('unheard', language);
        setTalking(false);
        continue;
      }
      misses = 0;

      setStage('thinking');
      /* Muletilla grabada para que no haya silencio mientras piensa */
      fillers.current = (fillers.current % 3) + 1;
      const answer = send(heard.text, true);
      const filler = voice.playClip(`filler-${fillers.current}`, language);
      const res = await answer;
      if (!live()) return;
      if (!res) { setStage('paused'); voice.closeMic(); return; }
      await filler;
      if (!live()) return;
      await say(res, () => live() && setStage('speaking'));
      if (!live()) return;
      if (res.effect?.type === 'tour' || res.clip === 'limit') { endVoice(); return; }
      /* Para pegar una vacante hay que escribir: se suelta el micrófono */
      if (res.awaiting === 'job') { setStage('paused'); voice.closeMic(); return; }
    }
  }, [endVoice, hush, language, say, send, t]);

  const tapRobot = () => {
    if (stage === 'listening') voice.finishRecording();
    else if (stage === 'speaking' || stage === 'paused') converse();
  };

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    if (!next) { hush(); if (stage === 'speaking') converse(); }
    try { localStorage.setItem('jcm-voice', next ? 'on' : 'off'); } catch { /* sin almacenamiento */ }
  };

  /* Saludo hablado: una vez por sesión, al abrir con un clic */
  const greet = useCallback(() => {
    if (!sound) return;
    try {
      if (sessionStorage.getItem('jcm-greeted')) return;
      sessionStorage.setItem('jcm-greeted', '1');
    } catch { /* sin almacenamiento */ }
    if (!voice.unlock()) return;
    const id = ++talkId.current;
    setTalking(true);
    voice.playClip('greeting', language).then(() => { if (id === talkId.current) setTalking(false); });
  }, [language, sound]);


  const reset = () => {
    endVoice();
    session.current += 1;
    clearTimeout(timer.current);
    busy.current = false;
    memory.current = {};
    history.current = [];
    setThinking(false);
    setMessages([]);
  };

  useEffect(() => () => { session.current += 1; clearTimeout(timer.current); clearTimeout(happyTimer.current); busy.current = false; }, []);

  useEffect(() => () => { voice.closeMic(); voice.stop(); }, []);

  /* El micrófono nunca queda abierto con la pestaña oculta */
  useEffect(() => {
    const onHide = () => { if (document.hidden) endVoice(); };
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, [endVoice]);

  useEffect(() => {
    if (!open) return;
    llmStatus().then((st) => {
      setLlm(st.enabled);
      if (st.enabled) setQuota((q) => q ?? { limit: st.limit, remaining: st.remaining });
    });
  }, [open]);

  const toggleBuddy = () => {
    const next = !buddy;
    setBuddy(next);
    try { localStorage.setItem('jcm-robot', next ? 'on' : 'off'); } catch { /* sin almacenamiento */ }
  };

  const close = useCallback(() => {
    endVoice();
    setOpen(false);
    launcher.current?.focus({ preventScroll: true });
  }, [endVoice]);

  useEffect(() => {
    const onOpen = (e) => {
      setTouring(false);
      setOpen(true);
      if (e.detail?.query) send(e.detail.query);
    };
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (caseOpen()) return;
        setTouring(false);
        if (open) close();
        else { setOpen(true); greet(); }
      }
    };
    const onScroll = () => setAtTop(window.scrollY < 300); /* React ignora valores repetidos */
    window.addEventListener('openAgent', onOpen);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('openAgent', onOpen);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, [close, greet, open, send]);

  /* Pregunta hecha en la portada antes de que el agente cargara */
  const pending = useRef(initialQuery);
  useEffect(() => {
    const q = pending.current;
    pending.current = '';
    if (q) send(q);
  }, [send]);

  useEffect(() => { if (open) field.current?.focus({ preventScroll: true }); }, [open]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    /* Deja visible el inicio de la última respuesta, no su final */
    const last = el.querySelector('[data-last="true"]');
    const top = last ? last.offsetTop - 70 : el.scrollHeight;
    el.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  }, [messages, thinking, open, reduced]);

  const openPanel = useCallback(() => { setTouring(false); setOpen(true); greet(); }, [greet]);
  const endTour = useCallback(() => setTouring(false), []);
  const micOn = Boolean(stage) && stage !== 'paused';
  const lastMsg = messages[messages.length - 1];
  const chips = messages.length === 0 ? suggestions(language) : (!thinking && lastMsg?.chips) || [];

  return (
    <>
      <AnimatePresence>{touring && <Tour key="tour" onEnd={endTour} sound={sound} onTalk={setTalking} />}</AnimatePresence>

      {buddy && !reduced && (
        <RobotBuddy panelOpen={open} thinking={thinking || stage === 'transcribing'} happy={happy} talking={talking} listening={stage === 'listening'} touring={touring} onOpen={openPanel} />
      )}

      {/* Lanzador */}
      {!open && !touring && (
        <button
          ref={launcher}
          type="button"
          onClick={openPanel}
          className={`agent-launcher ${atTop ? 'is-wide' : ''}`}
          aria-label={t('agent.open')}
        >
          <RobotFace className="agent-face" />
          <span className="agent-launcher-label">
            {t('agent.launcher')} <kbd>Ctrl K</kbd>
          </span>
        </button>
      )}

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label={t('agent.title')}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="agent-panel"
            onKeyDown={(e) => { if (e.key === 'Escape' && !caseOpen()) close(); }}
          >
            <span className="hud-corner hud-tl" /><span className="hud-corner hud-tr" />

            <header className="agent-header">
              <RobotFace className="agent-face" mood={talking ? 'talk' : thinking ? 'think' : happy ? 'happy' : 'idle'} />
              <div className="flex-1 min-w-0">
                <h2 className="font-display font-bold text-white text-base leading-tight">{t('agent.title')}</h2>
                <p className="text-[11px] font-mono text-dark-400 truncate">{llm ? `OpenAI + ${docCount} ${t('agent.subtitle_llm')}` : `${docCount} ${t('agent.subtitle')}`}</p>
              </div>
              <button type="button" className="agent-icon" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? t('voice.mute') : t('voice.unmute')} title={sound ? t('voice.mute') : t('voice.unmute')}>
                {sound ? <FaVolumeUp size={14} className="text-primary-400" /> : <FaVolumeMute size={14} />}
              </button>
              {!reduced && (
                <button type="button" className="agent-icon" onClick={toggleBuddy} aria-pressed={buddy} aria-label={buddy ? t('agent.robot_hide') : t('agent.robot_show')} title={buddy ? t('agent.robot_hide') : t('agent.robot_show')}>
                  <FaRobot size={14} className={buddy ? 'text-primary-400' : ''} />
                </button>
              )}
              {messages.length > 0 && (
                <button type="button" className="agent-icon" onClick={reset} aria-label={t('agent.reset')}>
                  <FaRedo size={11} />
                </button>
              )}
              <button type="button" className="agent-icon" onClick={close} aria-label={t('agent.close')}>
                <FaMinus size={12} />
              </button>
            </header>

            {stage && <VoiceStage stage={stage} ringRef={ring} onTap={tapRobot} onEnd={endVoice} />}

            <div className="agent-body" ref={scroller} aria-live="polite" data-lenis-prevent>
              {messages.length === 0 && (
                <div className="agent-msg">
                  <p className="text-white text-lg font-display font-semibold leading-snug mb-2">{t('agent.welcome')}</p>
                  <p>{t('agent.welcome_sub')}</p>
                  {llm && voice.canListen() && (
                    <button type="button" className="voice-start" onClick={converse}>
                      <FaMicrophone size={15} /> {t('voice.start')}
                    </button>
                  )}
                </div>
              )}

              {messages.map((m, idx) => (m.role === 'user' ? (
                <div key={m.key} className="agent-user">{m.text.length > 320 ? `${m.text.slice(0, 320)}…` : m.text}</div>
              ) : (
                <motion.div
                  key={m.key}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="agent-msg"
                  data-last={idx === messages.length - 1}
                >
                  {m.trace.length > 0 && <Trace trace={m.trace} />}
                  <div className="space-y-3">
                    {m.blocks.map((b, k) => <Block key={k} block={b} language={m.lang} t={t} />)}
                  </div>
                  {m.speech && !stage && (
                    <button type="button" className="agent-link mt-2" onClick={() => { voice.unlock(); if (talking) hush(); else say(m); }}>
                      <FaVolumeUp size={11} /> {talking ? t('voice.stop') : t('voice.listen')}
                    </button>
                  )}
                </motion.div>
              )))}

              {thinking && (
                <div className="agent-thinking" aria-label={t('agent.thinking')}><i /><i /><i /></div>
              )}

              {chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {chips.map((c) => (
                    <button key={c} type="button" className="agent-chip" onClick={() => send(c)}>{c}</button>
                  ))}
                </div>
              )}
            </div>

            {llm && (
              <p className="agent-privacy">
                <span>{t('agent.privacy')}</span>
                {quota && <b className={quota.remaining <= 2 ? 'is-low' : ''}>{quota.remaining}/{quota.limit} {t('agent.quota')}</b>}
              </p>
            )}
            <form className="agent-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
              <textarea
                ref={field}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(input); }
                }}
                placeholder={t('agent.placeholder')}
                aria-label={t('agent.placeholder')}
              />
              {llm && voice.canListen() && (
                <button type="button" className={`agent-mic ${micOn ? 'is-on' : ''}`} onClick={() => (micOn ? endVoice() : converse())} aria-pressed={micOn} aria-label={micOn ? t('voice.end') : t('voice.start')} title={micOn ? t('voice.end') : t('voice.start')}>
                  <FaMicrophone size={16} />
                </button>
              )}
              <button type="submit" disabled={!input.trim() || thinking} aria-label={t('agent.send')}><FaArrowUp size={14} /></button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Agent;
