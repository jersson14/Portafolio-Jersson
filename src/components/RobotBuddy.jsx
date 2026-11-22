import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { isLite } from '../hooks/useLite';
import RobotFace from './RobotFace';

/* Frases por sección. Se muestra una al llegar a cada una. */
const LINES = {
  es: {
    home: '¡Hola! Soy el agente del Ing. Jersson. Tócame y conversemos.',
    about: 'Aquí está la historia de Jersson.',
    'tech-stack': '¿Buscas una tecnología? Pregúntame si la maneja.',
    projects: 'DereJ-IA es su proyecto estrella.',
    demos: '¡Estos 6 sistemas los puedes probar ahora!',
    experience: 'Pégame una vacante y la comparo con su perfil.',
    certifications: '¡AWS Cloud Practitioner incluido!',
    services: '¿Tienes un negocio? Te digo qué sistema te conviene.',
    contact: '¡Escríbele! Responde por WhatsApp.',
    drop: '¡Wiiii!',
    dizzy: 'Uy… qué mareo.',
  },
  en: {
    home: 'Hi! I am Jersson’s agent. Tap me and let’s talk.',
    about: 'Here is the story of Jersson.',
    'tech-stack': 'Looking for a technology? Ask me about it.',
    projects: 'DereJ-IA is the star project.',
    demos: 'You can try these 6 systems right now!',
    experience: 'Paste a job offer and I will match it.',
    certifications: 'AWS Cloud Practitioner included!',
    services: 'Own a business? I can suggest a system.',
    contact: 'Say hello on WhatsApp!',
    drop: 'Wheee!',
    dizzy: 'Whoa… so dizzy.',
  },
};

const SECTIONS = ['demos', 'home', 'about', 'tech-stack', 'projects', 'experience', 'certifications', 'services', 'contact'];
const TRAIL = 9;
const STEP = 1 / 60;

const currentSection = () => {
  const mid = window.innerHeight * 0.45;
  return SECTIONS.find((id) => {
    const r = document.getElementById(id)?.getBoundingClientRect();
    return r && r.top <= mid && r.bottom >= mid;
  });
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const RobotBuddy = ({ panelOpen, thinking, happy, talking, listening, touring, onOpen }) => {
  const { language } = useLanguage();
  const root = useRef(null);
  const tilt = useRef(null);
  const flame = useRef(null);
  const trail = useRef([]);
  const [lite] = useState(isLite);
  const ctl = useRef({});
  const [line, setLine] = useState(null);
  const [left, setLeft] = useState(false);
  const [dizzy, setDizzy] = useState(false);
  const [held, setHeld] = useState(false);

  const mood = dizzy ? 'dizzy' : talking ? 'talk' : listening ? 'listen' : thinking ? 'think' : happy || held ? 'happy' : 'idle';

  /* El bucle de animación lee estos valores sin reiniciarse */
  useEffect(() => { Object.assign(ctl.current, { panelOpen, touring, thinking }); ctl.current.replan?.(); }, [panelOpen, touring, thinking]);

  /* Celebración al responder */
  useEffect(() => { if (happy) ctl.current.spin?.(); }, [happy]);

  useEffect(() => {
    const el = root.current;
    const c = ctl.current;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const svg = tilt.current.querySelector('.rb');
    const pupils = svg.querySelector('.rb-pupils');
    /* Medidas en caché: leerlas en cada cuadro obliga al navegador a recalcular la página */
    let box = { w: el.offsetWidth, h: el.offsetHeight, W: document.documentElement.clientWidth, H: window.innerHeight };
    const measure = () => { box = { w: el.offsetWidth, h: el.offsetHeight, W: document.documentElement.clientWidth, H: window.innerHeight }; };
    const stiff = lite ? 8.5 : 5.2;
    const drag0 = lite ? 4.8 : 3.7;

    const p = { x: -160, y: window.innerHeight * 0.3 };
    const v = { x: 0, y: 0 };
    const target = { x: p.x, y: p.y };
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, seen: false };
    let curve = 0;
    let spin = 0;
    let angle = 0;
    let nextMove = 0;
    let side = 1;
    let raf = 0;
    let last = performance.now();
    let drag = null;
    let lastScroll = window.scrollY;
    const past = Array.from({ length: TRAIL * 3 }, () => ({ ...p }));

    const goTo = (x, y, now) => {
      const dist = Math.hypot(x - p.x, y - p.y);
      target.x = x;
      target.y = y;
      /* Vuelos largos trazan un arco y a veces una pirueta */
      curve = (Math.random() < 0.5 ? -1 : 1) * Math.min(900, dist * 1.5);
      if (dist > 420 && Math.random() < 0.55) spin = 360 * (x > p.x ? 1 : -1);
      nextMove = now + (lite ? 3200 : 4200) + Math.random() * 2400;
    };

    const plan = (now = performance.now()) => {
      const { w, h, W, H } = box;
      if (c.panelOpen) {
        goTo(W - 24 - 430 - w - 14, Math.max(110, H - 24 - Math.min(690, H - 120) + 40), now);
        return;
      }
      if (c.touring) {
        goTo(W / 2 - 310 - w * 0.2, H - 130 - h, now);
        return;
      }
      /* Descansa en los márgenes para no tapar el contenido */
      side = Math.random() < 0.8 ? -side : side;
      const peek = W < 900 ? -w * 0.22 : Math.max(8, Math.min((W - 1280) / 2 - w * 0.75, W * 0.04));
      const x = side > 0 ? W - w - peek : peek;
      goTo(x, H * (0.14 + Math.random() * 0.46), now);
    };
    c.replan = () => { if (!drag) plan(); };
    c.spin = () => { spin = 360; v.y -= 260; };

    let gx = 0;
    let gy = 0;
    let gazeAt = 0;
    let trailOn = false;
    let skip = false;

    const advance = (dt, now) => {
      /* Mientras espera, flota dibujando un ocho */
      const calm = c.panelOpen || c.touring ? 0.25 : 1;
      const dx = target.x + Math.sin(now / 900) * 14 * calm - p.x;
      const dy = target.y + Math.sin(now / 450) * 10 * calm - p.y;
      const d = Math.hypot(dx, dy) || 1;
      curve *= Math.exp(-1.6 * dt);
      v.x += (dx * stiff + (-dy / d) * curve - v.x * drag0) * dt;
      v.y += (dy * stiff + (dx / d) * curve - v.y * drag0) * dt;
      const s = Math.hypot(v.x, v.y);
      const max = 680;
      if (s > max) { v.x *= max / s; v.y *= max / s; }
      p.x += v.x * dt;
      p.y = clamp(p.y + v.y * dt, 4, box.H - box.h + 10);
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      /* En reposo, en celular basta la mitad de cuadros */
      skip = lite && !drag && !skip && Math.abs(v.x) + Math.abs(v.y) < 45;
      if (skip) return;
      const dt = Math.min(0.12, (now - last) / 1000);
      last = now;
      const { w, h, W } = box;

      if (drag) {
        v.x = v.x * 0.7 + ((drag.x - p.x) / Math.max(dt, 0.008)) * 0.3;
        v.y = v.y * 0.7 + ((drag.y - p.y) / Math.max(dt, 0.008)) * 0.3;
        p.x = drag.x;
        p.y = drag.y;
      } else {
        if (now > nextMove) plan(now);
        /* Pasos fijos: si bajan los fps, vuela a la misma velocidad real */
        for (let left = dt; left > 0; left -= STEP) advance(Math.min(STEP, left), now);
      }

      const speed = Math.hypot(v.x, v.y);
      const bob = drag ? 0 : Math.sin(now / 520) * 6;
      spin = Math.abs(spin) < 0.5 ? 0 : spin * Math.exp(-4.2 * dt);
      angle = clamp(v.x * 0.035, -30, 30) + Math.sin(now / 900) * 2.5;

      el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${(p.y + bob).toFixed(1)}px, 0)`;
      tilt.current.style.transform = `rotate(${(angle - spin).toFixed(1)}deg)`;
      flame.current.style.transform = `scaleY(${(0.75 + Math.min(1.1, speed / 520)).toFixed(2)})`;

      /* Mirada: sigue al cursor; en táctil, mira hacia donde vuela. Solo se repinta si cambia. */
      const cx = p.x + w / 2;
      if (now - gazeAt > (lite ? 220 : 40)) {
        gazeAt = now;
        const lx = fine && mouse.seen ? mouse.x - cx : v.x;
        const ly = fine && mouse.seen ? mouse.y - (p.y + h * 0.32) : v.y;
        const ld = Math.hypot(lx, ly) || 1;
        const reach = Math.min(3.4, ld / 60);
        const nx = (lx / ld) * reach;
        const ny = (ly / ld) * reach;
        if (Math.abs(nx - gx) + Math.abs(ny - gy) > 0.35) {
          gx = nx;
          gy = ny;
          pupils.style.transform = `translate(${gx.toFixed(1)}px, ${gy.toFixed(1)}px)`;
        }
      }

      /* Estela (en celular no se dibuja) */
      if (!lite) {
        past.pop();
        past.unshift({ x: cx, y: p.y + bob + h * 0.8 });
        const alpha = clamp((speed - 90) / 420, 0, 0.75);
        if (alpha > 0 || trailOn) {
          trailOn = alpha > 0;
          trail.current.forEach((dot, i) => {
            if (!dot) return;
            const q = past[Math.min(past.length - 1, (i + 1) * 3 - 1)];
            dot.style.transform = `translate3d(${q.x}px, ${q.y}px, 0) scale(${1 - i / (TRAIL + 1)})`;
            dot.style.opacity = String(alpha * (1 - i / TRAIL));
          });
        }
      }

      if (c.side !== (cx > W / 2)) {
        c.side = cx > W / 2;
        setLeft(c.side);
      }
    };

    /* Parpadeo por clase: una animación infinita repintaría el robot sin parar */
    let blinkOff;
    const blink = setInterval(() => {
      svg.classList.add('is-blink');
      blinkOff = setTimeout(() => svg.classList.remove('is-blink'), 130);
    }, 4300);

    /* ── Frases ── */
    let hideTimer;
    let sayTimer;
    let seenSection = null;
    const said = new Set();
    const say = (key, ms = 4600) => {
      clearTimeout(hideTimer);
      setLine(key);
      hideTimer = setTimeout(() => setLine(null), ms);
    };
    const watch = setInterval(() => {
      if (document.hidden || c.panelOpen || c.touring || drag || document.querySelector('[data-case-study]')) return;
      const id = currentSection();
      if (!id || id === seenSection) return;
      seenSection = id;
      if (said.has(id)) return;
      said.add(id);
      plan();
      /* Habla al llegar, no en pleno vuelo */
      clearTimeout(sayTimer);
      sayTimer = setTimeout(() => { if (!c.panelOpen && !drag) say(id); }, 1900);
    }, 700);

    /* ── Arrastrar y lanzar ── */
    const button = el.querySelector('.buddy-hit');
    let start = null;
    let dizzyTimer;
    const down = (e) => {
      if (e.button !== 0) return;
      start = { x: e.clientX, y: e.clientY, ox: e.clientX - p.x, oy: e.clientY - p.y, moved: false, shake: 0, dir: 0 };
      button.setPointerCapture(e.pointerId);
    };
    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.seen = true;
      if (!start) return;
      if (!start.moved && Math.hypot(e.clientX - start.x, e.clientY - start.y) < 7) return;
      if (!start.moved) { start.moved = true; setHeld(true); setLine(null); }
      const dir = Math.sign(e.movementX);
      if (dir && dir !== start.dir && Math.abs(e.movementX) > 5) { start.shake += 1; start.dir = dir; }
      drag = { x: e.clientX - start.ox, y: e.clientY - start.oy };
    };
    const up = () => {
      if (!start) return;
      const s = start;
      start = null;
      if (!s.moved) return;
      drag = null;
      setHeld(false);
      v.x = clamp(v.x, -1100, 1100);
      v.y = clamp(v.y, -1100, 1100);
      const now = performance.now();
      if (s.shake >= 5) {
        setDizzy(true);
        say('dizzy', 2600);
        clearTimeout(dizzyTimer);
        dizzyTimer = setTimeout(() => setDizzy(false), 2600);
      } else if (Math.hypot(v.x, v.y) > 500) {
        spin = 720 * (v.x > 0 ? 1 : -1);
        say('drop', 1500);
      }
      nextMove = now + 1400;
      target.x = clamp(p.x + v.x * 0.35, 0, box.W - box.w);
      target.y = clamp(p.y + v.y * 0.35, 80, box.H - box.h);
      c.dragged = now;
    };
    const click = () => {
      if (performance.now() - (c.dragged || -1e4) < 250) return;
      setLine(null);
      c.open?.();
    };
    /* Al hacer scroll la página lo empuja un poco */
    const scroll = () => {
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      v.y -= clamp(dy * 1.6, -140, 140);
    };
    const resize = () => { measure(); plan(); };
    const visibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };

    button.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    button.addEventListener('click', click);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibility);

    plan();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(watch);
      clearInterval(blink);
      clearTimeout(blinkOff);
      clearTimeout(hideTimer);
      clearTimeout(sayTimer);
      clearTimeout(dizzyTimer);
      button.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      button.removeEventListener('click', click);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [lite]);

  useEffect(() => { ctl.current.open = onOpen; }, [onOpen]);

  /* Decorativo: el acceso por teclado es el botón fijo y Ctrl+K */
  return (
    <div className={`buddy-layer ${panelOpen ? 'is-docked' : ''}`} aria-hidden="true">
      {!lite && Array.from({ length: TRAIL }, (_, i) => (
        <span key={i} ref={(n) => { trail.current[i] = n; }} className="buddy-dot" />
      ))}
      <div ref={root} className="buddy">
        <button type="button" tabIndex={-1} className="buddy-hit">
          <span ref={tilt} className="buddy-tilt">
            <span ref={flame} className="buddy-flame"><i /></span>
            <RobotFace full mood={mood} className={lite ? 'is-calm' : ''} />
          </span>
        </button>
        <AnimatePresence>
          {line && !panelOpen && !touring && (
            <motion.p
              key={line}
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.22 }}
              className={`buddy-bubble ${left ? 'is-left' : ''}`}
            >
              {LINES[language][line]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RobotBuddy;
