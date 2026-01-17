import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { servicesData } from '../data/services';

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="services" className="section-container bg-dark-900/50" ref={ref}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">Servicios</h2>
                    <p className="section-subtitle">
                        Soluciones tecnológicas profesionales para tu negocio
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass-card-hover p-8 text-center group"
                        >
                            {/* Icon */}
                            <motion.div
                                className="mb-6 flex justify-center"
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300"
                                    style={{
                                        backgroundColor: `${service.color}20`,
                                        border: `2px solid ${service.color}40`,
                                        boxShadow: `0 0 20px ${service.color}30`
                                    }}
                                >
                                    <service.icon
                                        className="text-4xl"
                                        style={{ color: service.color }}
                                    />
                                </div>
                            </motion.div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-dark-300 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-dark-400 text-lg mb-6">
                        ¿Tienes un proyecto en mente? Trabajemos juntos para hacerlo realidad
                    </p>
                    <a href="#contact" className="btn-primary inline-block">
                        Iniciar Proyecto
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
