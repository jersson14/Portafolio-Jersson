import { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const TechStack = lazy(() => import('./components/TechStack'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectCaseStudy = lazy(() => import('./components/ProjectCaseStudy'));

import { useLanguage } from './context/LanguageContext';

function App() {
  const { t, language, toggleLanguage } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'tech-stack', label: t('nav.tech_stack') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'certifications', label: t('nav.certifications') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') },
  ];

  /* Custom cursor — desktop only (skip on touch/coarse-pointer devices) */
  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const move = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };

    const onEnter = () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.background = '#a855f7';
      cursor.style.boxShadow = '0 0 16px #a855f7, 0 0 32px rgba(168,85,247,0.5)';
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = 'rgba(168,85,247,0.5)';
    };

    const onLeave = () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.background = '#22d3ee';
      cursor.style.boxShadow = '0 0 12px #22d3ee, 0 0 28px rgba(34,211,238,0.5)';
      ring.style.width = '38px';
      ring.style.height = '38px';
      ring.style.borderColor = 'rgba(34,211,238,0.45)';
    };

    window.addEventListener('mousemove', move);
    const interactiveEls = document.querySelectorAll('a, button, [role="button"]');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  /* Scroll handler */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > 500);
      setScrolled(y > 20);

      const sections = navLinks.map((l) => l.id);
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const open = (e) => {
      setSelectedProjectId(e.detail?.projectId || 2);
      setShowCaseStudy(true);
    };
    window.addEventListener('openCaseStudy', open);
    return () => window.removeEventListener('openCaseStudy', open);
  }, []);

  const LanguageSwitch = () => (
    <button
      onClick={toggleLanguage}
      className="relative w-16 h-8 rounded-full transition-all duration-300"
      style={{
        background: 'rgba(6,182,212,0.1)',
        border: '1px solid rgba(6,182,212,0.3)',
      }}
      aria-label="Toggle Language"
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-7 h-7 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
          boxShadow: '0 0 10px rgba(6,182,212,0.5)',
        }}
        animate={{ x: language === 'es' ? 0 : 32 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-bold font-mono">
        <span className={`transition-all duration-300 ${language === 'es' ? 'text-white' : 'text-primary-400'}`}>ES</span>
        <span className={`transition-all duration-300 ${language === 'en' ? 'text-white' : 'text-primary-400'}`}>EN</span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen gradient-bg relative">

      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorRingRef} className="custom-cursor-ring" />

      <AnimatedBackground />

      <AnimatePresence>
        {showCaseStudy && (
          <ProjectCaseStudy projectId={selectedProjectId} onClose={() => setShowCaseStudy(false)} />
        )}
      </AnimatePresence>

      {/* ── NAV ── */}
      <nav className="fixed top-2 md:top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="nav-blur pointer-events-auto rounded-2xl transition-all duration-500"
            style={{
              background: scrolled
                ? 'rgba(2, 4, 15, 0.85)'
                : 'rgba(2, 4, 15, 0.6)',
              border: '1px solid rgba(6,182,212,0.15)',
              boxShadow: scrolled
                ? '0 4px 30px rgba(0,0,0,0.5), 0 0 20px rgba(6,182,212,0.08)'
                : '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            {/* Bottom neon line on scroll */}
            {scrolled && (
              <div
                className="absolute bottom-0 left-4 right-4 rounded-b-full"
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), rgba(168,85,247,0.5), transparent)',
                }}
              />
            )}

            <div className="flex items-center justify-between h-16 px-4 md:px-6">
              {/* Logo */}
              <motion.a
                href="#home"
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
                className="font-display font-bold text-2xl"
                style={{
                  background: 'linear-gradient(135deg, #22d3ee, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                whileHover={{ scale: 1.07 }}
              >
                JCM
              </motion.a>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                    className="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    style={{ color: activeSection === link.id ? '#22d3ee' : '#94a3b8' }}
                  >
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg -z-10"
                        style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="hover:text-white transition-colors duration-200">{link.label}</span>
                  </a>
                ))}
              </div>

              {/* Right Controls */}
              <div className="hidden lg:flex items-center gap-3">
                <LanguageSwitch />
                <motion.a
                  href="/CV_jersson_corilla_miranda.pdf"
                  download="CV_Jersson_Corilla.pdf"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    boxShadow: '0 0 14px rgba(5,150,105,0.35)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(5,150,105,0.6)' }}
                >
                  <FaDownload size={12} />
                  CV
                </motion.a>
              </div>

              {/* Mobile controls */}
              <div className="flex items-center gap-3 lg:hidden">
                <LanguageSwitch />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg transition-colors duration-200"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(6,182,212,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="mt-2 mx-auto max-w-7xl pointer-events-auto"
            >
              <div
                className="rounded-2xl overflow-hidden p-2"
                style={{
                  background: 'rgba(2,4,15,0.95)',
                  border: '1px solid rgba(6,182,212,0.15)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                }}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                    className="block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      color: activeSection === link.id ? '#22d3ee' : '#94a3b8',
                      background: activeSection === link.id ? 'rgba(6,182,212,0.1)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="pt-16 relative z-10">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div
                className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: 'rgba(6,182,212,0.3)', borderTopColor: '#06b6d4' }}
              />
            </div>
          }
        >
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Certifications />
          <Services />
          <Contact />
        </Suspense>
      </main>

      <Footer />

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 rounded-2xl text-white z-40"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              boxShadow: '0 0 20px rgba(6,182,212,0.4)',
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 35px rgba(6,182,212,0.7)',
              rotate: 360,
            }}
            transition={{ duration: 0.4 }}
          >
            <FaArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
