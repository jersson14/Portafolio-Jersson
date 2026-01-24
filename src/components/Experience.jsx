import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { experienceData } from '../data/experience';
import { FaBriefcase, FaCalendar } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
    const { t, language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="section-container bg-dark-900/50" ref={ref}>
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">{t('experience.title')}</h2>
                    <p className="section-subtitle">
                        {t('experience.subtitle')}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-600 to-transparent hidden md:block" />

                    {/* Experience Items */}
                    <div className="space-y-12">
                        {experienceData.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-6 top-6 w-5 h-5 bg-primary-500 rounded-full border-4 border-dark-950 hidden md:block z-10" />

                                {/* Content Card */}
                                <div className="md:ml-20 glass-card-hover p-6">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {exp.position[language]}
                                            </h3>
                                            <div className="flex items-center gap-2 text-primary-400 font-semibold mb-2">
                                                <FaBriefcase className="text-sm" />
                                                <span>{exp.company}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-dark-400 mt-2 md:mt-0">
                                            <FaCalendar className="text-sm" />
                                            <span className="text-sm">{exp.period[language]}</span>
                                            {exp.current && (
                                                <span className="ml-2 px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded-full">
                                                    {t('experience.current_badge')}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Responsibilities */}
                                    <ul className="space-y-2 mb-4">
                                        {exp.responsibilities[language].map((resp, respIndex) => (
                                            <li key={respIndex} className="flex items-start gap-2 text-dark-300 text-sm">
                                                <span className="text-primary-400 mt-1">▹</span>
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="tech-badge text-xs"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
