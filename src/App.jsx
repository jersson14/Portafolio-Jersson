import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaBars, FaTimes } from 'react-icons/fa';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';

// Lazy loading components
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const TechStack = lazy(() => import('./components/TechStack'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectCaseStudy = lazy(() => import('./components/ProjectCaseStudy'));

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // ... (maintain existing navLinks and scroll logic) ...

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'tech-stack', label: 'Tecnologías' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'certifications', label: 'Certificaciones' },
    { id: 'services', label: 'Servicios' },
    { id: 'contact', label: 'Contacto' },
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 500);

      // Update active section
      const sections = navLinks.map(link => link.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Setup Event Listener for "Open Case Study" button click
  useEffect(() => {
    const handleOpenCaseStudy = (e) => {
      setSelectedProjectId(e.detail?.projectId || 2); // Default to 2 for backward compatibility
      setShowCaseStudy(true);
    };
    window.addEventListener('openCaseStudy', handleOpenCaseStudy);
    return () => window.removeEventListener('openCaseStudy', handleOpenCaseStudy);
  }, []);

  return (
    <div className="min-h-screen gradient-bg relative">
      <AnimatedBackground />

      <AnimatePresence>
        {showCaseStudy && (
          <ProjectCaseStudy projectId={selectedProjectId} onClose={() => setShowCaseStudy(false)} />
        )}
      </AnimatePresence>

      {/* Navigation - STRIKING GLASS HEADER */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <div className="bg-dark-950/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg shadow-primary-500/10 pointer-events-auto transition-all duration-300">
            <div className="flex items-center justify-between h-16 px-6">
              {/* Logo */}
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
                className="text-2xl font-bold font-display gradient-text"
                whileHover={{ scale: 1.05 }}
              >
                JCM
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${activeSection === link.id
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary-500/10 rounded-lg -z-10"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                ))}

                {/* CV Download Button */}
                <a
                  href="/cv_jersson.pdf"
                  download="CV_Jersson_Corilla.pdf"
                  className="ml-2 px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <FaArrowUp className="text-base rotate-90" />
                  Descargar CV
                </a>
              </div>

              {/* Right Side: Mobile Menu */}
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
                >
                  {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-2 mx-auto max-w-7xl pointer-events-auto"
            >
              <div className="bg-dark-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden p-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeSection === link.id
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-gray-300 hover:bg-white/5'
                      }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative z-10">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
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

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-110 transition-all duration-300 z-40"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaArrowUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
