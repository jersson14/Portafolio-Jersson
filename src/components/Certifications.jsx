import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { certificationsData, moreCertifications, languagesData } from '../data/certifications';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Certifications = () => {
    const { t, language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="certifications" className="section-container" ref={ref}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">{t('certifications.title')}</h2>
                    <p className="section-subtitle">
                        {t('certifications.subtitle')}
                    </p>
                </motion.div>

                {/* Languages */}
                <div className="mb-16">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">{t('certifications.languages_title')}</h3>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {languagesData.map((lang, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-semibold text-sm">{lang.name[language]}</span>
                                    <span className="text-dark-400 text-xs">{lang.level[language]}</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)' }}
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${lang.percent}%` } : {}}
                                        transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Certifications Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {certificationsData.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card-hover p-6 flex flex-col h-full group"
                        >
                            {/* Icon */}
                            <div className="mb-4">
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: `${cert.color}20`,
                                        border: `1px solid ${cert.color}40`
                                    }}
                                >
                                    <cert.icon
                                        className="text-3xl"
                                        style={{ color: cert.color }}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                                    {cert.title[language]}
                                </h3>
                                <p className="text-dark-400 text-sm mb-2">
                                    {cert.issuer[language]}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                <span className="text-primary-400 font-semibold text-sm">
                                    {cert.year}
                                </span>
                                {cert.credentialUrl ? (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-dark-400 hover:text-primary-400 transition-colors duration-300"
                                    >
                                        {t('certifications.view_credential')}
                                        <FaExternalLinkAlt className="text-xs" />
                                    </a>
                                ) : (
                                    <span className="text-xs text-dark-600">
                                        {t('certifications.badge')}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* More courses — compact chips grouped by issuer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 className="text-xl font-bold text-white mb-6 text-center">{t('certifications.more_title')}</h3>
                    <div className="space-y-6 max-w-5xl mx-auto">
                        {moreCertifications.map((group, gIdx) => (
                            <div key={gIdx}>
                                <h4 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#22d3ee' }}>
                                    {group.issuer}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {group.courses.map((course, cIdx) => (
                                        <span
                                            key={cIdx}
                                            className="px-3 py-1.5 rounded-full text-xs text-dark-300 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-300"
                                        >
                                            {course.title[language]} <span className="text-dark-500">· {course.year}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
