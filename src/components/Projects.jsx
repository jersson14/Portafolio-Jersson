import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { projectsData } from '../data/projects';
import { FaExternalLinkAlt, FaGithub, FaLock } from 'react-icons/fa';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="section-container" ref={ref}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">Proyectos Destacados</h2>
                    <p className="section-subtitle">
                        Soluciones empresariales desarrolladas con tecnologías modernas y mejores prácticas
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card-hover overflow-hidden flex flex-col h-full group"
                        >
                            {/* Project Image with Hover Overlay */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Hover Overlay with Description - Desktop Only */}
                                <div className="hidden lg:flex absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/80 to-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center p-6">
                                    <p className="text-white text-sm leading-relaxed text-center">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="text-xs text-primary-400 font-medium px-3 py-1 bg-dark-950/80 backdrop-blur-sm border border-primary-500/30 rounded-full">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Private Lock Icon */}
                                {project.status === 'private' && (
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-dark-950/80 backdrop-blur-sm p-2 rounded-lg">
                                            <FaLock className="text-primary-400 text-sm" title="Repositorio privado" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Project Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Project Title */}
                                <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300 mb-3">
                                    {project.title}
                                </h3>

                                {/* Description - Mobile Only */}
                                <p className="lg:hidden text-dark-300 text-sm leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="mb-6 flex-grow">
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="tech-badge text-xs"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-auto">
                                    {project.demoUrl && project.demoUrl !== '#' ? (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                                        >
                                            <FaExternalLinkAlt className="text-xs" />
                                            Ver Demo
                                        </a>
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-dark-800 text-dark-500 text-sm font-semibold rounded-lg cursor-not-allowed">
                                            <FaExternalLinkAlt className="text-xs" />
                                            Demo en preparación
                                        </div>
                                    )}

                                    {project.status === 'private' ? (
                                        <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass-card text-dark-500 text-sm font-semibold cursor-not-allowed">
                                            <FaGithub className="text-base" />
                                            Privado
                                        </div>
                                    ) : project.githubUrl ? (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => project.githubUrl === '#' && e.preventDefault()}
                                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 glass-card text-white text-sm font-semibold hover:bg-white/10 transition-all duration-300 ${project.githubUrl === '#' ? 'cursor-default opacity-80' : ''}`}
                                        >
                                            <FaGithub className="text-base" />
                                            GitHub
                                        </a>
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass-card text-dark-500 text-sm font-semibold cursor-not-allowed">
                                            <FaGithub className="text-base" />
                                            Próximamente
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Note */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 text-center glass-card p-6"
                >
                    <p className="text-dark-400">
                        Cada proyecto fue desarrollado con <span className="text-primary-400 font-semibold">código limpio</span>,
                        <span className="text-primary-400 font-semibold"> arquitectura escalable</span> y
                        <span className="text-primary-400 font-semibold"> mejores prácticas</span> de la industria.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
