import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
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
                    <h2 className="section-title">Sobre Mí</h2>
                    <p className="section-subtitle">
                        Ingeniero de Software con pasión por crear soluciones tecnológicas de alto impacto
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
                            Ingeniero de Sistemas e Informática
                        </h3>

                        <div className="space-y-6 text-lg md:text-xl text-dark-200 leading-relaxed font-light">
                            <p>
                                Especialista en <span className="text-primary-400 font-semibold">Ingeniería y Desarrollo de Software</span> con
                                <span className="text-white font-semibold"> más de 5 años de experiencia</span> en el diseño, desarrollo y despliegue de aplicaciones web empresariales de nivel enterprise.
                            </p>
                            <p>
                                Mi enfoque se centra en crear <span className="text-primary-400 font-semibold">soluciones escalables y seguras</span> que
                                optimizan procesos de negocio, utilizando tecnologías modernas y mejores prácticas de la industria.
                            </p>
                            <p>
                                Experiencia comprobada en <span className="text-primary-400 font-semibold">Cloud Computing (AWS y Azure)</span>,
                                <span className="text-primary-400 font-semibold"> Business Intelligence (Power BI, QuickSight)</span>, y
                                <span className="text-primary-400 font-semibold"> aplicación de Inteligencia Artificial</span> en automatización
                                y desarrollo de software.
                            </p>
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/10">
                            <h4 className="text-2xl font-bold text-white mb-4">
                                Docencia y Mentoria
                            </h4>
                            <p className="text-dark-300 leading-relaxed max-w-3xl mx-auto">
                                Docente e instructor en tecnologías de programación, Python, Power BI y SQL,
                                compartiendo conocimiento y formando a la próxima generación de profesionales tech.
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
                            <div className="text-primary-400 font-bold text-xl mb-3">Full Stack Development</div>
                            <p className="text-dark-400">
                                Desarrollo completo de aplicaciones web con tecnologías modernas (React, Node, Python)
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="text-primary-400 font-bold text-xl mb-3">Cloud Architecture</div>
                            <p className="text-dark-400">
                                Diseño e implementación de infraestructura escalable y serverless en AWS y Azure
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="text-primary-400 font-bold text-xl mb-3">Data & AI Solutions</div>
                            <p className="text-dark-400">
                                Análisis de datos avanzado, Power BI y automatización con Inteligencia Artificial
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
