import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaWhatsapp, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCopy, FaCheck } from 'react-icons/fa';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [copied, setCopied] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("jersson1407miranda@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Crear mensaje para WhatsApp
        const whatsappMessage = `Hola Jersson! 👋\n\nMe contacto desde tu portafolio web.\n\n*Nombre:* ${formData.name}\n*Email:* ${formData.email}\n\n*Mensaje:*\n${formData.message}`;

        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Abrir WhatsApp
        window.open(`https://wa.me/51974031318?text=${encodedMessage}`, '_blank');

        // Limpiar formulario
        setFormData({ name: '', email: '', message: '' });
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            label: "Email",
            value: "jersson1407miranda@gmail.com",
            link: "mailto:jersson1407miranda@gmail.com"
        },
        {
            icon: FaPhone,
            label: "WhatsApp",
            value: "+51 974 031 318",
            link: "https://wa.me/51974031318"
        },
        {
            icon: FaMapMarkerAlt,
            label: "Ubicación",
            value: "Perú",
            link: null
        }
    ];

    const socialLinks = [
        {
            icon: FaGithub,
            label: "GitHub",
            url: "https://github.com/jersson14",
            color: "#FFFFFF"
        },
        {
            icon: FaLinkedin,
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/jersson-corilla-miranda-3020bb200/",
            color: "#0A66C2"
        },
        {
            icon: FaWhatsapp,
            label: "WhatsApp",
            url: "https://wa.me/51974031318",
            color: "#25D366"
        }
    ];

    return (
        <section id="contact" className="section-container" ref={ref}>
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">Contacto</h2>
                    <p className="section-subtitle">
                        ¿Tienes un proyecto en mente? ¡Hablemos!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Envíame un mensaje
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-dark-300 mb-2 text-sm font-medium">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                                        placeholder="Tu nombre"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-dark-300 mb-2 text-sm font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-dark-300 mb-2 text-sm font-medium">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none"
                                        placeholder="Cuéntame sobre tu proyecto..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
                                >
                                    <FaWhatsapp className="text-xl" />
                                    Enviar por WhatsApp
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Contact Details */}
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Información de contacto
                            </h3>
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                        className="flex items-center gap-4 p-4 glass-card-hover"
                                    >
                                        <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <info.icon className="text-xl text-primary-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-dark-500 text-sm">{info.label}</p>
                                            <div className="flex items-center gap-2">
                                                {info.link ? (
                                                    <a
                                                        href={info.link}
                                                        className="text-white hover:text-primary-400 transition-colors duration-300 font-medium break-all"
                                                    >
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-white font-medium">{info.value}</p>
                                                )}

                                                {info.label === "Email" && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleCopyEmail();
                                                        }}
                                                        className="p-1.5 rounded-md hover:bg-white/10 text-dark-400 hover:text-primary-400 transition-all duration-300"
                                                        title="Copiar email"
                                                    >
                                                        {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="glass-card p-8">
                            <h3 className="text-xl font-bold text-white mb-6">
                                Sígueme en redes
                            </h3>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex-1 flex flex-col items-center justify-center gap-3 p-6 glass-card-hover"
                                        style={{
                                            borderColor: `${social.color}40`
                                        }}
                                    >
                                        <social.icon
                                            className="text-4xl"
                                            style={{ color: social.color }}
                                        />
                                        <span className="text-sm text-dark-400">{social.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick WhatsApp Button */}
                        <motion.a
                            href="https://wa.me/51974031318"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="block glass-card p-6 text-center hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300 group"
                        >
                            <FaWhatsapp className="text-5xl text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                            <p className="text-white font-semibold mb-1">¿Prefieres WhatsApp?</p>
                            <p className="text-dark-400 text-sm">Haz clic aquí para chatear directamente</p>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
