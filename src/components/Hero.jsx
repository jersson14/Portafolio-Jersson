import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaReact, FaPython, FaNodeJs, FaAws, FaDocker, FaDatabase, FaFileDownload, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const FloatingIcon = ({ icon: Icon, delay, x, y, duration = 4, size = "text-5xl", glowColor = "rgba(14,165,233,0.5)" }) => (
    <motion.div
        className={`absolute text-primary-400/80 ${size} z-10 pointer-events-none`}
        style={{
            left: x,
            top: y,
            filter: `drop-shadow(0 0 15px ${glowColor})`
        }}
        animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.6, 1, 0.6]
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
    >
        <Icon />
    </motion.div>
);

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden gradient-bg pt-20 md:pt-0">
            {/* Animated Background Elements - ENHANCED LUMINOSITY */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Right Glow */}
                <motion.div
                    className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                        background: ["rgba(14, 165, 233, 0.2)", "rgba(56, 189, 248, 0.3)", "rgba(14, 165, 233, 0.2)"]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />

                {/* Bottom Left Glow */}
                <motion.div
                    className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary-500/20 rounded-full blur-[100px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                {/* Center Spotlight Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-primary-500/10 to-transparent opacity-50"></div>
            </div>

            <div className="section-container relative z-10 w-full">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT: Text Content */}
                    <div className="text-left order-2 md:order-1 relative">
                        {/* Text Backlight */}
                        <div className="absolute -inset-10 bg-primary-500/5 blur-[50px] -z-10 rounded-full"></div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-4"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 font-semibold text-sm md:text-base backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                                👋 Hola, bienvenido a mi portafolio
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold font-display mb-6 leading-tight drop-shadow-xl"
                        >
                            <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Jersson Jorge</span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 drop-shadow-[0_0_25px_rgba(14,165,233,0.5)]">Corilla Miranda</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mb-8"
                        >
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-100/90 tracking-wide">
                                Software Engineer | Full Stack | Cloud Solutions
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-lg text-dark-200 max-w-xl mb-10 leading-relaxed font-light"
                        >
                            Especialista en <span className="text-primary-400 font-semibold">Ingeniería y Desarrollo de Software</span> con
                            <span className="text-white font-semibold"> más de 5 años de experiencia</span> en el diseño, desarrollo y despliegue de aplicaciones web empresariales de nivel enterprise.
                            Combino ingeniería de software avanzada con inteligencia artificial y cloud computing.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-wrap gap-4 mb-12"
                        >
                            <a href="#projects" className="btn-primary flex items-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]">
                                <FaProjectDiagram /> Ver Proyectos
                            </a>
                            <a href="#contact" className="btn-secondary flex items-center gap-2 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                <FaEnvelope /> Contactar
                            </a>
                            <a href="/cv_jersson.pdf" download="CV_Jersson_Corilla.pdf" className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-105">
                                <FaFileDownload className="text-lg" /> Descargar CV
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="flex gap-5"
                        >
                            <SocialLink href="https://github.com/jersson14" icon={FaGithub} />
                            <SocialLink href="https://www.linkedin.com/in/jersson-corilla-miranda-3020bb200/" icon={FaLinkedin} />
                            <SocialLink href="https://wa.me/51974031318" icon={FaWhatsapp} />
                        </motion.div>
                    </div>

                    {/* RIGHT: Image & Floating Icons */}
                    <div className="relative order-1 md:order-2 flex justify-center items-center py-10 md:py-0">
                        {/* Strong Glow Behind Image */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-radial from-primary-500/40 to-transparent blur-[60px] opacity-60 z-0"
                            animate={{ opacity: [0.5, 0.7, 0.5], scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        ></motion.div>

                        {/* Floating Icons Container */}
                        <div className="absolute inset-0 w-full h-full z-20">
                            <FloatingIcon icon={FaReact} x="0%" y="20%" delay={0} size="text-6xl" glowColor="rgba(97, 218, 251, 0.6)" />
                            <FloatingIcon icon={FaPython} x="85%" y="10%" delay={1.5} size="text-7xl" glowColor="rgba(55, 118, 171, 0.6)" />
                            <FloatingIcon icon={FaAws} x="5%" y="75%" delay={2} size="text-6xl" glowColor="rgba(255, 153, 0, 0.6)" />
                            <FloatingIcon icon={FaDocker} x="85%" y="65%" delay={0.5} size="text-6xl" glowColor="rgba(36, 150, 237, 0.6)" />
                            <FloatingIcon icon={FaNodeJs} x="45%" y="-10%" delay={1} size="text-5xl" glowColor="rgba(51, 153, 51, 0.6)" />
                            <FloatingIcon icon={FaDatabase} x="50%" y="95%" delay={2.5} size="text-5xl" glowColor="rgba(200, 200, 200, 0.6)" />
                        </div>

                        {/* Main Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg"
                        >
                            <div className="relative rounded-3xl overflow-hidden border border-white/20 glass-card shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_60px_rgba(14,165,233,0.5)] transition-shadow duration-500">
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent mix-blend-overlay"></div>
                                <img
                                    src="/jersson.png"
                                    alt="Jersson Corilla - Professional Software Engineer"
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-8 md:left-[50px] z-30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-primary-400/50 rounded-full flex justify-center">
                    <motion.div
                        className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

const SocialLink = ({ href, icon: Icon }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-3xl text-dark-300 hover:text-white hover:scale-110 transition-all duration-300"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
    >
        <Icon />
    </motion.a>
);

export default Hero;
