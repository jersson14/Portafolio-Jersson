import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { techStackData } from '../data/techStack';
import { useLanguage } from '../context/LanguageContext';

const TechStack = () => {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const categories = Object.values(techStackData);

    return (
        <section id="tech-stack" className="section-container bg-dark-900/50" ref={ref}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">{t('tech_stack.title')}</h2>
                    <p className="section-subtitle">
                        {t('tech_stack.subtitle')}
                    </p>
                </motion.div>

                {/* Tech Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                            className="glass-card p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 text-center">
                                {category.title}
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {category.technologies.map((tech, techIndex) => (
                                    <motion.div
                                        key={techIndex}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{
                                            duration: 0.3,
                                            delay: categoryIndex * 0.1 + techIndex * 0.05
                                        }}
                                        whileHover={{
                                            scale: 1.15,
                                            rotate: [0, -5, 5, 0],
                                            transition: { duration: 0.3 }
                                        }}
                                        className="flex flex-col items-center justify-center p-4 glass-card-hover group cursor-pointer"
                                    >
                                        <tech.icon
                                            className="text-4xl mb-2 transition-colors duration-300"
                                            style={{ color: tech.color }}
                                        />
                                        <span className="text-xs text-dark-400 text-center group-hover:text-white transition-colors duration-300">
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <p className="text-dark-400 text-lg">
                        {t('tech_stack.learning_text')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
