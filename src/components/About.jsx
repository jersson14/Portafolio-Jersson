import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaCode, FaCloud, FaChartBar } from 'react-icons/fa';

const SkillPillar = ({ icon: Icon, color, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center text-center p-6 group"
  >
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}35`,
        boxShadow: `0 0 20px ${color}20`,
      }}
    >
      <Icon size={24} style={{ color }} />
    </div>
    <div className="font-bold font-display text-white mb-2 text-base">{title}</div>
    <p className="text-dark-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const About = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-container relative" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-header-accent justify-center mb-2">
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#22d3ee' }}>01</span>
          </div>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </motion.div>

        {/* Background Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden mb-10 group"
          style={{
            border: '1px solid rgba(6,182,212,0.15)',
            boxShadow: '0 0 40px rgba(6,182,212,0.08)',
          }}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/about-bg.png"
              alt=""
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(2,4,15,0.88) 0%, rgba(4,8,20,0.82) 100%)',
                backdropFilter: 'blur(2px)',
              }}
            />
          </div>

          {/* Neon corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none" style={{ borderTop: '2px solid rgba(6,182,212,0.35)', borderLeft: '2px solid rgba(6,182,212,0.35)', borderRadius: '1.5rem 0 0 0' }} />
          <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none" style={{ borderBottom: '2px solid rgba(168,85,247,0.35)', borderRight: '2px solid rgba(168,85,247,0.35)', borderRadius: '0 0 1.5rem 0' }} />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-8">
              {t('about.card_title')}
            </h3>

            <div className="space-y-5 text-base md:text-lg text-dark-300 leading-relaxed">
              <p>{t('about.description_1')}</p>
              <p>{t('about.description_2')}</p>
              <p>{t('about.description_3')}</p>
            </div>

            <div
              className="mt-10 pt-10"
              style={{ borderTop: '1px solid rgba(6,182,212,0.15)' }}
            >
              <h4 className="text-xl font-bold font-display text-white mb-4">
                {t('about.mentorship_title')}
              </h4>
              <p className="text-dark-400 leading-relaxed max-w-3xl mx-auto text-sm md:text-base">
                {t('about.mentorship_desc')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skill Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(4,10,24,0.7)',
            border: '1px solid rgba(6,182,212,0.12)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
          }}
        >
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'rgba(6,182,212,0.1)' }}>
            <SkillPillar
              icon={FaCode}
              color="#22d3ee"
              title={t('about.skills.fullstack.title')}
              desc={t('about.skills.fullstack.desc')}
              delay={0.4}
            />
            <SkillPillar
              icon={FaCloud}
              color="#a855f7"
              title={t('about.skills.cloud.title')}
              desc={t('about.skills.cloud.desc')}
              delay={0.5}
            />
            <SkillPillar
              icon={FaChartBar}
              color="#fbbf24"
              title={t('about.skills.data.title')}
              desc={t('about.skills.data.desc')}
              delay={0.6}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
