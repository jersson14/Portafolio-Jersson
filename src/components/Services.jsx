import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { servicesData } from '../data/services';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
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
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#22d3ee' }}>06</span>
          </div>
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card-hover p-7 text-center group relative overflow-hidden"
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${service.color}12 0%, transparent 65%)`,
                }}
              />

              {/* Top border accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${service.color}80, transparent)` }}
              />

              {/* Icon */}
              <motion.div
                className="mb-6 flex justify-center"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: `${service.color}14`,
                    border: `1px solid ${service.color}35`,
                  }}
                >
                  <service.icon size={28} style={{ color: service.color }} />
                </div>
              </motion.div>

              {/* Content */}
              <h3
                className="text-base font-bold font-display text-white mb-3 transition-colors duration-300"
                style={{ color: 'white' }}
              >
                {service.title[language]}
              </h3>
              <p className="text-dark-400 leading-relaxed text-sm">
                {service.description[language]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-dark-500 text-sm mb-6 font-mono">
            {t('contact.subtitle')}
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{t('nav.contact')}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
