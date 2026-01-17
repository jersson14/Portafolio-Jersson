import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { certificationsData } from '../data/certifications';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Certifications = () => {
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
                    <h2 className="section-title">Certificaciones</h2>
                    <p className="section-subtitle">
                        Formación continua y certificaciones profesionales
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    {cert.title}
                                </h3>
                                <p className="text-dark-400 text-sm mb-2">
                                    {cert.issuer}
                                </p>
                                {cert.description && (
                                    <p className="text-dark-500 text-xs mb-3 italic">
                                        {cert.description}
                                    </p>
                                )}
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
                                        Ver credencial
                                        <FaExternalLinkAlt className="text-xs" />
                                    </a>
                                ) : (
                                    <span className="text-xs text-dark-600">
                                        Certificado
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
