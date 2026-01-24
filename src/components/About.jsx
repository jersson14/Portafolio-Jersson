import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="section-container relative" ref={ref}>
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title">{t('about.title')}</h2>
                    <p className="section-subtitle">
                        {t('about.subtitle')}
                    </p>
                </motion.div>

                {/* Full Width Content with Background */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 group"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="/about-bg.png"
                            alt="Software Engineering Background"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                            {t('about.card_title')}
                        </h3>

                        <div className="space-y-6 text-lg md:text-xl text-dark-200 leading-relaxed font-light">
                            <p>
                                {t('about.description_1')}
                            </p>
                            <p>
                                {t('about.description_2')}
                            </p>
                            <p>
                                {t('about.description_3')}
                            </p>
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/10">
                            <h4 className="text-2xl font-bold text-white mb-4">
                                {t('about.mentorship_title')}
                            </h4>
                            <p className="text-dark-300 leading-relaxed max-w-3xl mx-auto">
                                {t('about.mentorship_desc')}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Key Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="glass-card p-10"
                >
                    <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <div className="p-4">
                            <div className="text-primary-400 font-bold text-xl mb-3">{t('about.skills.fullstack.title')}</div>
                            <p className="text-dark-400">
                                {t('about.skills.fullstack.desc')}
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="text-primary-400 font-bold text-xl mb-3">{t('about.skills.cloud.title')}</div>
                            <p className="text-dark-400">
                                {t('about.skills.cloud.desc')}
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="text-primary-400 font-bold text-xl mb-3">{t('about.skills.data.title')}</div>
                            <p className="text-dark-400">
                                {t('about.skills.data.desc')}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
