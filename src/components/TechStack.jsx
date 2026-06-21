import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { techStackData } from '../data/techStack';
import { useLanguage } from '../context/LanguageContext';

const TechStack = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = Object.values(techStackData);

  return (
    <section
      id="tech-stack"
      className="section-container relative"
      ref={ref}
      style={{ background: 'rgba(4,8,20,0.4)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-header-accent justify-center mb-2">
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#22d3ee' }}>02</span>
          </div>
          <h2 className="section-title">{t('tech_stack.title')}</h2>
          <p className="section-subtitle">{t('tech_stack.subtitle')}</p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.08 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(6,182,212,0.15), transparent 70%)',
                }}
              />

              <h3 className="text-sm font-mono font-semibold mb-5 uppercase tracking-widest" style={{ color: '#22d3ee' }}>
                {category.title}
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {category.technologies.map((tech, techIdx) => (
                  <motion.div
                    key={techIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: catIdx * 0.08 + techIdx * 0.04 }}
                    whileHover={{ scale: 1.18, y: -4 }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl cursor-default group/tech transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${tech.color}40`;
                      e.currentTarget.style.boxShadow = `0 0 16px ${tech.color}25`;
                      e.currentTarget.style.background = `${tech.color}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <tech.icon
                      className="text-3xl mb-1.5 transition-all duration-300"
                      style={{ color: tech.color, filter: `drop-shadow(0 0 6px ${tech.color}60)` }}
                    />
                    <span className="text-[10px] text-dark-500 text-center font-mono group-hover/tech:text-dark-200 transition-colors duration-300 leading-tight">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center text-sm font-mono"
          style={{ color: '#475569' }}
        >
          {t('tech_stack.learning_text')}
        </motion.p>
      </div>
    </section>
  );
};

export default TechStack;
