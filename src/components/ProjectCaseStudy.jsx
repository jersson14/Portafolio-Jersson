import { motion } from 'framer-motion';
import { FaArrowLeft, FaServer, FaDatabase, FaRobot, FaIdCard, FaFileSignature, FaDocker, FaFileInvoiceDollar, FaChartLine } from 'react-icons/fa';

const caseStudiesData = {
    2: { // Trámite Documentario
        title: "Transformación Digital en",
        highlight: "DIRESA Apurímac",
        badges: ["Sistema de Gestión Gubernamental"],
        description: "Implementación de un sistema de trámite documentario con Firma Digital e Inteligencia Artificial (RAG) para optimizar la gestión pública.",
        challenge: {
            title: "El Desafío (2022)",
            text: "En 2022, la Dirección Regional de Salud de Apurímac enfrentaba cuellos de botella críticos en su gestión administrativa. El proceso manual generaba:",
            points: [
                "Lentitud Extrema: Búsqueda de documentos físicos tomaba horas o días.",
                "Altos Costos Operativos: Gasto excesivo en papel, impresión y almacenamiento físico.",
                "Baja Satisfacción: Usuarios frustrados por la demora en la atención de trámites."
            ],
            questions: [
                "¿De qué manera la implementación del sistema web con firma digital reducirá el tiempo de atención...?",
                "¿De qué manera... reducirá los costos de materiales...?",
                "¿De qué manera... incrementará el nivel de satisfacción...?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaRobot,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Chatbot RAG (MySQL + OpenAI)",
                    desc: "Integración de la API de OpenAI con la base de datos MySQL institucional. El sistema recupera información actualizada de los trámites y la utiliza como contexto para que la IA responda consultas en lenguaje natural."
                },
                {
                    icon: FaIdCard,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Validación RENIEC",
                    desc: "Conexión segura mediante API DECOLECTA hacia RENIEC para la validación de identidad en tiempo real de los usuarios firmantes, garantizando seguridad jurídica."
                },
                {
                    icon: FaFileSignature,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Firma Digital",
                    desc: "Implementación de flujo de firma digital que elimina la necesidad de papel físico, permitiendo la aprobación y derivación de documentos desde cualquier ubicación."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (MVC)",
            frontend: { label: "VIEW", text: "Frontend", sub: "HTML / CSS / JS / Bootstrap" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP (MVC Architecture)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL Database", sub: "Source for RAG" },
                { icon: FaRobot, color: "text-green-400", title: "OpenAI API", sub: "LLM Processing" }
            ]
        },
        results: [
            { value: "90%", title: "Ahorro de Papel", desc: "Eliminación drástica del uso de materiales físicos." },
            { value: "60%", title: "Reducción de Tiempo", desc: "Optimización del flujo de atención de trámites." },
            { value: "4.8/5", title: "Satisfacción", desc: "Mejora significativa en la experiencia de usuario." }
        ]
    },
    6: { // Facturación Electrónica
        title: "Optimización Operativa en",
        highlight: "Tours Micaela",
        badges: ["FinTech", "Transporte Interprovincial"],
        description: "Sistema integral de facturación electrónica y gestión operativa para empresa de transporte, eliminando la duplicidad y errores manuales.",
        challenge: {
            title: "El Desafío (2025)",
            text: "Tours Micaela Abancay enfrentaba serios problemas operativos debido a la gestión manual y dispersa de sus procesos:",
            points: [
                "Duplicidad y Errores: La gestión manual generaba pérdida de información operativa.",
                "Demoras en Ventas: Falta de integración entre emisión de comprobantes y ventas.",
                "Operaciones a Ciegas: Ausencia de reportes automáticos limitaba la toma de decisiones."
            ],
            questions: [
                "¿De qué manera la gestión manual... genera duplicidad, errores y pérdida de información...?",
                "¿Cómo la falta de integración... provoca demoras y errores de facturación...?",
                "¿En qué medida la ausencia de reportes... dificulta el control y limita decisiones...?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaFileInvoiceDollar,
                    color: "text-green-400",
                    bg: "bg-green-500/20",
                    title: "Facturación con Greenter",
                    desc: "Implementación del motor Greenter para la generación, firma y envío de comprobantes electrónicos (XML/CDR) directamente a SUNAT, asegurando validez tributaria."
                },
                {
                    icon: FaDocker,
                    color: "text-blue-400",
                    bg: "bg-blue-500/20",
                    title: "Despliegue con Docker",
                    desc: "Infraestructuras contenerizada en VPS remoto. Uso de scripts .sh personalizados para automatizar el despliegue y mantenimiento de los servicios."
                },
                {
                    icon: FaIdCard,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Integración RENIEC",
                    desc: "Uso de API DECOLECTA para consultar datos de clientes en tiempo real, agilizando el proceso de emisión de boletos y facturas en ventanilla."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (MVC + Docker)",
            frontend: { label: "VIEW", text: "Frontend", sub: "HTML / CSS / JS / Bootstrap" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP (MVC) + Greenter Lib" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL Database", sub: "Transactional Data" },
                { icon: FaDocker, color: "text-blue-400", title: "Docker Container", sub: "VPS Deployment" }
            ]
        },
        results: [
            { value: "+10k", title: "Facturas/Mes", desc: "Procesamiento masivo sin errores de validación." },
            { value: "0%", title: "Duplicidad", desc: "Eliminación total de errores por doble registro." },
            { value: "100%", title: "Visibilidad", desc: "Reportes en tiempo real para gerencia." }
        ]
    }
};

const ProjectCaseStudy = ({ projectId, onClose }) => {
    const data = caseStudiesData[projectId];

    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-dark-950/95 backdrop-blur-md"
        >
            <div className="min-h-screen">
                {/* Navigation Header */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
                    >
                        <FaArrowLeft /> Volver al Portafolio
                    </button>
                    <span className="text-sm font-mono text-primary-400 uppercase">CASE STUDY: {data.highlight}</span>
                </div>

                {/* Hero Section */}
                <header className="pt-32 pb-20 px-6 section-container text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex justify-center gap-2 mb-6">
                            {data.badges.map((badge, idx) => (
                                <span key={idx} className="inline-block px-4 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-medium">
                                    {badge}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                            {data.title} <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-200">
                                {data.highlight}
                            </span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-xl text-dark-200 leading-relaxed font-light">
                            {data.description}
                        </p>
                    </motion.div>
                </header>

                {/* Main Content */}
                <main className="max-w-5xl mx-auto px-6 pb-20 space-y-24">

                    {/* The Challenge */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-red-500 rounded-full block"></span>
                                {data.challenge.title}
                            </h2>
                            <p className="text-dark-300 leading-relaxed mb-6">
                                {data.challenge.text}
                            </p>
                            <ul className="space-y-4">
                                {data.challenge.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 min-w-[20px] text-red-400">✕</div>
                                        <p className="text-dark-200">{point}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-dark-900/50 p-8 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-semibold text-white mb-6">Preguntas de Investigación</h3>
                            <div className="space-y-6">
                                {data.challenge.questions.map((q, idx) => (
                                    <div key={idx} className="p-4 bg-dark-950 rounded-xl border-l-2 border-primary-500">
                                        <p className="text-sm text-dark-300 italic">"{q}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* The Solution */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3 justify-center">
                            <span className="w-8 h-1 bg-green-500 rounded-full block"></span>
                            La Solución Tecnológica
                            <span className="w-8 h-1 bg-green-500 rounded-full block"></span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {data.solution.features.map((feature, idx) => (
                                <div key={idx} className="glass-card p-8 hover:bg-white/5 transition-colors group">
                                    <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-6 text-2xl ${feature.color} group-hover:scale-110 transition-transform`}>
                                        <feature.icon />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-dark-300 text-sm leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Technical Architecture */}
                    <section className="bg-dark-900/30 rounded-3xl p-8 md:p-12 border border-white/5">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">{data.architecture.title}</h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative">
                            {/* Frontend */}
                            <div className="text-center relative z-10">
                                <div className="w-24 h-24 bg-dark-800 rounded-full border-2 border-blue-500 flex items-center justify-center text-4xl text-blue-400 mx-auto mb-4 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                    <span className="text-sm font-bold">{data.architecture.frontend.label}</span>
                                </div>
                                <p className="text-white font-medium">{data.architecture.frontend.text}</p>
                                <p className="text-xs text-dark-400">{data.architecture.frontend.sub}</p>
                            </div>

                            {/* Connector Line */}
                            <div className="hidden md:block h-0.5 w-16 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

                            {/* Backend */}
                            <div className="text-center relative z-10">
                                <div className="w-24 h-24 bg-dark-800 rounded-full border-2 border-indigo-500 flex items-center justify-center text-3xl text-indigo-400 mx-auto mb-4 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                                    <FaServer />
                                </div>
                                <p className="text-white font-medium">{data.architecture.backend.text}</p>
                                <p className="text-xs text-dark-400">{data.architecture.backend.sub}</p>
                            </div>

                            {/* Connector Line */}
                            <div className="hidden md:block h-0.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                            {/* External Services */}
                            <div className="grid gap-4 relative z-10">
                                {data.architecture.services.map((service, idx) => (
                                    <div key={idx} className="p-3 bg-dark-800 rounded-lg border border-purple-500/30 flex items-center gap-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                                        <service.icon className={service.color} />
                                        <div className="text-left">
                                            <div className="text-white text-xs font-bold">{service.title}</div>
                                            <div className="text-[10px] text-dark-400">{service.sub}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Impact & Results */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-10 text-center">Resultados e Impacto</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {data.results.map((result, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-600 mb-2">{result.value}</div>
                                    <h3 className="text-white font-semibold mb-2">{result.title}</h3>
                                    <p className="text-sm text-dark-300">{result.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </motion.div>
    );
};

export default ProjectCaseStudy;
