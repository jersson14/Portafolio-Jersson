import { motion } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaWhatsapp,
  FaReact, FaPython, FaNodeJs, FaAws, FaDocker,
  FaFileDownload, FaProjectDiagram, FaEnvelope,
} from 'react-icons/fa';
import { SiTypescript, SiPostgresql } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';

/* Floating tech icon */
const FloatingIcon = ({ icon: Icon, delay, x, y, duration = 5, size = 48, glowColor }) => (
  <motion.div
    className="absolute pointer-events-none z-10"
    style={{
      left: x, top: y,
      color: glowColor,
      filter: `drop-shadow(0 0 12px ${glowColor}) drop-shadow(0 0 24px ${glowColor}55)`,
    }}
    animate={{ y: [0, -16, 0], rotate: [0, 6, -6, 0], opacity: [0.6, 1, 0.6] }}
    transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
  >
    <Icon size={size} />
  </motion.div>
);

/* Social icon */
const SocialLink = ({ href, icon: Icon, label, color = '#22d3ee' }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex items-center justify-center w-11 h-11 rounded-xl"
    style={{
      background: 'rgba(6,182,212,0.07)',
      border: '1px solid rgba(6,182,212,0.2)',
      color,
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}
    whileHover={{ y: -4, scale: 1.1 }}
    whileTap={{ scale: 0.93 }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${color}80`;
      e.currentTarget.style.boxShadow = `0 0 18px ${color}40`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(6,182,212,0.2)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <Icon size={20} />
  </motion.a>
);

/* ─── HUD Photo Panel with double border + scan line ─── */
const PhotoPanel = ({ children }) => (
  <div className="photo-panel">
    {/* Outer frame */}
    <div className="photo-outer-frame">
      {/* Corner accents */}
      <span className="hud-corner hud-tl" />
      <span className="hud-corner hud-tr" />
      <span className="hud-corner hud-bl" />
      <span className="hud-corner hud-br" />

      {/* Inner frame + scan line */}
      <div className="photo-inner-frame">
        {/* Scan line */}
        <div className="photo-scan-line" />
        {/* Colour overlay */}
        <div className="photo-overlay" />
        {children}
      </div>

      {/* Status bar */}
      <div className="photo-status-bar">
        <span className="status-dot" />
        <span>DEVELOPER</span>
        <span className="status-sep">|</span>
        <span>PERU</span>
        <span className="status-sep">|</span>
        <span>2021 - PRESENT</span>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden gradient-bg pt-20 md:pt-0">

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 550, height: 550, top: '-8%', right: '-4%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 450, height: 450, bottom: '-8%', left: '-4%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div className="text-left order-2 md:order-1 relative">

            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <span className="badge-neon">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: '#22d3ee', boxShadow: '0 0 6px #22d3ee', animation: 'blinkCursor 1.5s ease-in-out infinite' }}
                />
                {t('hero.greeting')}
              </span>
            </motion.div>

            {/* ── NAME TITLE ── */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-6"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.1 }}
            >
              {/* First name */}
              <span
                className="block text-white"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  textShadow: '0 0 24px rgba(255,255,255,0.12)',
                }}
              >
                Jersson Jorge
              </span>

              {/* Last name — shimmer */}
              <span
                className="block shimmer-text"
                style={{
                  fontSize: 'clamp(2.2rem, 4.4vw, 4rem)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  marginTop: '0.04em',
                }}
              >
                Corilla Miranda
              </span>
            </motion.h1>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-8 flex items-center gap-3"
            >
              <span
                className="font-mono text-lg md:text-xl lg:text-2xl font-medium"
                style={{ color: '#64748b', letterSpacing: '0.06em' }}
              >
                {t('hero.role')}
              </span>
              <span
                className="inline-block w-0.5 h-6 rounded-full"
                style={{ background: '#22d3ee', boxShadow: '0 0 8px #22d3ee', animation: 'blinkCursor 1.2s step-end infinite' }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base md:text-lg text-dark-300 max-w-xl mb-10 leading-relaxed"
            >
              {t('hero.description_prefix')}{' '}
              <span className="neon-text font-semibold">{t('hero.description_highlight_1')}</span>{' '}
              {t('hero.description_connector')}
              <span className="text-white font-semibold"> {t('hero.description_highlight_2')}</span>{' '}
              {t('hero.description_suffix')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.a
                href="#projects"
                className="btn-primary flex items-center gap-2 text-sm font-mono"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaProjectDiagram />
                <span>{t('hero.buttons.projects')}</span>
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-secondary flex items-center gap-2 text-sm font-mono"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaEnvelope />
                <span>{t('hero.buttons.contact')}</span>
              </motion.a>
              <motion.a
                href="/CV_jersson_corilla_miranda.pdf"
                download="CV_Jersson_Corilla.pdf"
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm font-mono"
                style={{ background: 'linear-gradient(135deg, #059669, #047857)', boxShadow: '0 0 20px rgba(5,150,105,0.3)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(5,150,105,0.6)' }}
                whileTap={{ scale: 0.97 }}
              >
                <FaFileDownload />
                <span>{t('hero.buttons.cv')}</span>
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex gap-3"
            >
              <SocialLink href="https://github.com/jersson14" icon={FaGithub} label="GitHub" color="#e2e8f0" />
              <SocialLink href="https://www.linkedin.com/in/jersson-corilla-miranda-3020bb200/" icon={FaLinkedin} label="LinkedIn" color="#22d3ee" />
              <SocialLink href="https://wa.me/51974031318" icon={FaWhatsapp} label="WhatsApp" color="#4ade80" />
            </motion.div>
          </div>

          {/* ── RIGHT: Photo Panel ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, type: 'spring', stiffness: 80 }}
            className="relative order-1 md:order-2 flex justify-center items-center py-8 md:py-0"
          >
            {/* Floating tech icons */}
            <div className="hidden sm:block absolute inset-0 w-full h-full z-20">
              <FloatingIcon icon={FaReact}      x="2%"   y="22%" delay={0}   duration={4.5} size={50} glowColor="#61dafb" />
              <FloatingIcon icon={FaPython}     x="86%"  y="8%"  delay={1.5} duration={5.5} size={56} glowColor="#3776ab" />
              <FloatingIcon icon={FaAws}        x="3%"   y="72%" delay={2}   duration={5}   size={50} glowColor="#ff9900" />
              <FloatingIcon icon={FaDocker}     x="87%"  y="64%" delay={0.5} duration={4.8} size={46} glowColor="#2496ed" />
              <FloatingIcon icon={SiTypescript} x="44%"  y="-5%" delay={1}   duration={4.2} size={38} glowColor="#3178c6" />
              <FloatingIcon icon={FaNodeJs}     x="88%"  y="38%" delay={3}   duration={5.2} size={42} glowColor="#339933" />
              <FloatingIcon icon={SiPostgresql} x="2%"   y="48%" delay={2.5} duration={4.6} size={36} glowColor="#4169e1" />
            </div>

            {/* Soft glow behind panel */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: '70%', height: '70%',
                background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(168,85,247,0.08) 60%, transparent 80%)',
                filter: 'blur(40px)',
              }}
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* HUD photo panel */}
            <div className="relative z-10 w-full max-w-[280px] md:max-w-[340px] lg:max-w-[380px]">
              <PhotoPanel>
                <motion.img
                  src="/jersson.png"
                  alt="Jersson Corilla — Full Stack Developer"
                  className="w-full h-auto object-cover block"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                />
              </PhotoPanel>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #02040f, transparent)' }}
      />
    </section>
  );
};

export default Hero;
