import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { projectsData } from '../data/projects';
import { FaExternalLinkAlt, FaGithub, FaLock, FaStar, FaCrown, FaRocket } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

/* ── Image or gradient fallback ── */
const ProjectVisual = ({ project, language, className = '' }) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title[language]}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${className}`}
      />
    );
  }
  return (
    <div
      className={`w-full h-full ${className}`}
      style={{ background: project.gradient || 'linear-gradient(135deg, #0f172a, #1e293b)' }}
    />
  );
};

/* ── Action buttons (shared) ── */
const ProjectButtons = ({ project, t, showCaseStudy = false }) => (
  <div className="flex flex-wrap gap-2 mt-auto">
    {showCaseStudy && (
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('openCaseStudy', { detail: { projectId: project.id } }))}
        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
      >
        <FaStar className="text-xs" />
        {t('projects.buttons.case_study')}
      </button>
    )}

    {project.demoUrl && project.demoUrl !== '#' ? (
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
      >
        <FaExternalLinkAlt className="text-xs" />
        {t('projects.buttons.demo')}
      </a>
    ) : (
      <div className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-3 py-2.5 bg-dark-800 text-dark-500 text-xs font-semibold rounded-lg cursor-not-allowed">
        <FaExternalLinkAlt className="text-xs" />
        {t('projects.buttons.demo_wip')}
      </div>
    )}

    {project.status === 'private' ? (
      <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 glass-card text-dark-500 text-sm font-semibold cursor-not-allowed">
        <FaGithub className="text-base" />
        {t('projects.buttons.private')}
      </div>
    ) : project.githubUrl && project.githubUrl !== '#' ? (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 glass-card text-white text-sm font-semibold hover:bg-white/10 transition-all duration-300"
      >
        <FaGithub className="text-base" />
        {t('projects.buttons.github')}
      </a>
    ) : (
      <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 glass-card text-dark-500 text-sm font-semibold cursor-not-allowed">
        <FaGithub className="text-base" />
        {t('projects.buttons.private')}
      </div>
    )}
  </div>
);

const Projects = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const topProject    = projectsData.find(p => p.topProject);
  const featuredProjects = projectsData.filter(p => p.featured && !p.topProject);
  const regularProjects  = projectsData.filter(p => !p.featured && !p.topProject);

  return (
    <section id="projects" className="section-container" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">{t('projects.subtitle')}</p>
        </motion.div>

        {/* ── TOP PROJECT — DereJ-IA Hero Card ── */}
        {topProject && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-20"
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <FaCrown style={{ color: '#f59e0b' }} />
              <h3 className="text-2xl font-bold text-white">{t('projects.top_title') || 'Proyecto Destacado'}</h3>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.5), transparent)' }} />
            </div>

            {/* Card */}
            <div
              className="relative rounded-2xl overflow-hidden group"
              style={{
                border: '1px solid rgba(245,158,11,0.35)',
                boxShadow: '0 0 60px rgba(245,158,11,0.12), 0 0 120px rgba(109,40,217,0.08)',
              }}
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0"
                style={{ background: topProject.gradient }}
              />

              {/* Animated border top */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, #a855f7, transparent)' }}
              />

              {/* Content grid */}
              <div className="relative z-10 grid lg:grid-cols-5 gap-0">

                {/* Left: info (3/5) */}
                <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-between min-h-[340px]">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#fbbf24' }}>
                      <FaCrown size={10} /> TOP PROJECT
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.4)', color: '#c084fc' }}>
                      {topProject.category}
                    </span>
                    {topProject.status === 'private' && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: 'rgba(100,116,139,0.2)', border: '1px solid rgba(100,116,139,0.3)', color: '#94a3b8' }}>
                        <FaLock size={9} /> Privado
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {topProject.title[language]}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: '#cbd5e1' }}>
                    {topProject.description[language]}
                  </p>

                  {/* Metrics */}
                  {topProject.metrics && (
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y"
                      style={{ borderColor: 'rgba(245,158,11,0.15)' }}>
                      {topProject.metrics.map((m, i) => (
                        <div key={i} className="text-center">
                          <div className="text-2xl md:text-3xl font-bold"
                            style={{ background: 'linear-gradient(135deg, #fbbf24, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            {m.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: '#64748b' }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {topProject.technologies.map((tech, i) => (
                      <span key={i} className="tech-badge text-xs">{tech}</span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <ProjectButtons project={topProject} t={t} showCaseStudy={false} />
                  </div>
                </div>

                {/* Right: decorative panel (2/5) */}
                <div className="hidden lg:flex lg:col-span-2 items-center justify-center p-8 relative overflow-hidden">
                  {/* Glow orb */}
                  <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 70%)' }} />

                  {/* Icon grid decoration */}
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-32 h-32 rounded-full flex items-center justify-center"
                      style={{
                        border: '1px solid rgba(168,85,247,0.3)',
                        boxShadow: '0 0 40px rgba(168,85,247,0.15), inset 0 0 40px rgba(168,85,247,0.05)',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="text-5xl"
                      >
                        🏛️
                      </motion.div>
                    </motion.div>

                    <div className="text-center">
                      <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: '#64748b' }}>powered by</div>
                      <div className="flex gap-3 justify-center flex-wrap">
                        {['RAG', 'OpenAI', 'Pinecone'].map(tag => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded"
                            style={{ background: 'rgba(168,85,247,0.1)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.2)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stat pills */}
                    <div className="flex flex-col gap-2 w-full">
                      {[
                        { label: 'Búsqueda Semántica', color: '#c084fc' },
                        { label: 'Generación de Docs', color: '#fbbf24' },
                        { label: 'SaaS — 4 Planes', color: '#22d3ee' },
                      ].map(({ label, color }) => (
                        <div key={label}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
                          style={{ background: 'rgba(2,4,15,0.4)', border: `1px solid ${color}20`, color }}>
                          <FaRocket size={9} />
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FEATURED PROJECTS ── */}
        {featuredProjects.length > 0 && (
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <FaStar className="text-primary-400" />
              <h3 className="text-2xl font-bold text-white">{t('projects.featured_title')}</h3>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(6,182,212,0.5), transparent)' }} />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
                  className="relative glass-card-hover overflow-hidden flex flex-col h-full group"
                  style={{
                    boxShadow: '0 0 30px rgba(139,92,246,0.15)',
                    border: '1px solid rgba(139,92,246,0.3)',
                  }}
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                      <FaStar className="text-white text-xs" />
                      <span className="text-white text-xs font-bold">{t('projects.badge_featured')}</span>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="relative h-48 xs:h-56 md:h-72 overflow-hidden">
                    <ProjectVisual project={project} language={language} />

                    {/* Desktop hover overlay */}
                    <div className="hidden lg:flex absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/80 to-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center p-6">
                      <p className="text-white text-sm leading-relaxed text-center">
                        {project.description[language]}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs text-primary-400 font-medium px-3 py-1 bg-dark-950/80 backdrop-blur-sm border border-primary-500/30 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {project.status === 'private' && (
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-dark-950/80 backdrop-blur-sm p-2 rounded-lg">
                          <FaLock className="text-primary-400 text-sm" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 xs:p-5 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300 mb-3">
                      {project.title[language]}
                    </h3>

                    <p className="lg:hidden text-dark-300 text-sm leading-relaxed mb-4">
                      {project.description[language]}
                    </p>

                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-2 mb-6 border-y border-white/5 py-4">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-200">
                              {metric.value}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-dark-400 font-medium">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mb-6 flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-badge text-xs">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <ProjectButtons project={project} t={t} showCaseStudy={project.id === 2} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── REGULAR PROJECTS ── */}
        {regularProjects.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <h3 className="text-2xl font-bold text-white">{t('projects.other_title')}</h3>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(100,116,139,0.4), transparent)' }} />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 + index * 0.08 }}
                  className="glass-card-hover overflow-hidden flex flex-col h-full group"
                >
                  {/* Visual */}
                  <div className="relative h-48 xs:h-56 overflow-hidden">
                    <ProjectVisual project={project} language={language} />

                    {/* Desktop hover overlay */}
                    <div className="hidden lg:flex absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/80 to-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center p-6">
                      <p className="text-white text-sm leading-relaxed text-center">
                        {project.description[language]}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs text-primary-400 font-medium px-3 py-1 bg-dark-950/80 backdrop-blur-sm border border-primary-500/30 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {project.status === 'private' && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-dark-950/80 backdrop-blur-sm p-2 rounded-lg">
                          <FaLock className="text-primary-400 text-sm" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 xs:p-5 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300 mb-3">
                      {project.title[language]}
                    </h3>

                    <p className="lg:hidden text-dark-300 text-sm leading-relaxed mb-4">
                      {project.description[language]}
                    </p>

                    <div className="mb-6 flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-badge text-xs">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <ProjectButtons project={project} t={t} showCaseStudy={project.id === 2} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 text-center glass-card p-6"
        >
          <p className="text-dark-400">{t('projects.note')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
