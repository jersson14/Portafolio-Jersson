export const projectsData = [

  // ── TOP PROJECT (hero card, destacado máximo) ──────────────────────────────
  {
    id: 9,
    topProject: true,
    featured: false,
    title: {
      es: "DereJ-IA Perú 🏛️ — Asistente Legal Inteligente",
      en: "DereJ-IA Peru 🏛️ — Intelligent Legal Assistant"
    },
    description: {
      es: "Plataforma SaaS legal con Inteligencia Artificial que combina búsqueda semántica sobre legislación peruana (RAG), generación de documentos jurídicos y herramientas de análisis procesal. Diseñada para estudiantes de Derecho y abogados en ejercicio en el Perú. Incluye chat jurídico RAG, analizador de expedientes, generador de escritos procesales, contratos, resoluciones, dictaminador de viabilidad, flujo procesal IA y más de 20 módulos especializados.",
      en: "Legal SaaS platform with Artificial Intelligence combining semantic search over Peruvian legislation (RAG), legal document generation, and procedural analysis tools. Designed for Law students and practicing lawyers in Peru. Includes RAG legal chat, case analyzer, procedural document generator, contracts, resolutions, viability dictator, AI procedural flow, and over 20 specialized modules."
    },
    technologies: ["Next.js", "Node.js", "Express.js", "MySQL", "OpenAI API", "Pinecone", "TypeScript", "Tailwind CSS", "Railway", "JWT", "Google OAuth", "RAG"],
    demoUrl: "#",
    githubUrl: "#",
    status: "private",
    category: "LegalTech / SaaS",
    image: null,
    gradient: "linear-gradient(135deg, #1e0340 0%, #2d0a6e 30%, #0f0225 60%, #02040f 100%)",
    metrics: [
      { value: "20+", label: "Módulos IA" },
      { value: "5", label: "Modelos OpenAI" },
      { value: "SaaS", label: "4 Planes" }
    ]
  },

  // ── FEATURED PROJECTS (grilla 2 columnas) ──────────────────────────────────
  {
    id: 2,
    featured: false,
    title: {
      es: "Sistema Web de Trámite Documentario",
      en: "Web Document Tracking System"
    },
    description: {
      es: "Plataforma web para la gestión, seguimiento y control de documentos administrativos con chatbot inteligente basado en RAG para consultas en tiempo real. Integrada con la API de RENIEC para validación de identidad, mejorando la trazabilidad y seguridad de los procesos.",
      en: "Web platform for the management, tracking, and control of administrative documents with an intelligent RAG-based chatbot for real-time inquiries. Integrated with RENIEC API for identity validation, improving process traceability and security."
    },
    technologies: ["PHP", "MySQL", "Bootstrap", "AJAX", "API RENIEC", "RAG", "IA"],
    demoUrl: "https://rosybrown-panther-444340.hostingersite.com/",
    githubUrl: "#",
    status: "private",
    category: "Full Stack",
    image: "/tramite_documentario.png",
    metrics: [
      { value: "60%", label: "Reducción de Tiempo" },
      { value: "500+", label: "Consultas/Mes Auto." },
      { value: "4.8/5", label: "Satisfacción Usuario" }
    ]
  },

  // ── REGULAR PROJECTS (grilla 3 columnas) ──────────────────────────────────
  {
    id: 6,
    featured: true,
    title: {
      es: "Sistema Web de Facturación Electrónica — Transporte",
      en: "Web Electronic Invoicing System — Transport"
    },
    description: {
      es: "Plataforma web para la emisión de comprobantes electrónicos en servicios de transporte Cusco–Abancay, integrada con RENIEC y SUNAT, cumpliendo la normativa de facturación electrónica vigente.",
      en: "Web platform for issuing electronic receipts in Cusco–Abancay transport services, integrated with RENIEC and SUNAT, complying with current electronic invoicing regulations."
    },
    technologies: ["PHP", "MySQL", "API SUNAT", "API RENIEC", "Facturación Electrónica"],
    demoUrl: "https://micaela-tours.com/",
    githubUrl: "#",
    status: "private",
    category: "FinTech",
    image: "/facturacion.png"
  },
  {
    id: 1,
    title: {
      es: "Sistema de Gestión de Historias Clínicas Odontológicas",
      en: "Dental Medical Records Management System"
    },
    description: {
      es: "Aplicación web para el registro, control y seguimiento de historias clínicas en clínicas dentales, optimizando la atención al paciente y la gestión médica.",
      en: "Web application for the registration, control, and tracking of medical records in dental clinics, optimizing patient care and medical management."
    },
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    demoUrl: "#",
    githubUrl: "#",
    status: "private",
    category: "Full Stack",
    image: "/odontologia.png"
  },
  {
    id: 3,
    title: {
      es: "Sistema de Gestión de Recuperos Hospitalarios",
      en: "Hospital Recovery Management System"
    },
    description: {
      es: "Aplicación web para la administración y control de recuperos en un hospital de Argentina, optimizando procesos financieros y administrativos.",
      en: "Web application for the administration and control of recoveries in a hospital in Argentina, optimizing financial and administrative processes."
    },
    technologies: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
    demoUrl: "#",
    githubUrl: "#",
    status: "private",
    category: "Full Stack",
    image: "/recuperos.png"
  },
  {
    id: 4,
    title: {
      es: "Sistema Web de Gestión Educativa",
      en: "Educational Management Web System"
    },
    description: {
      es: "Plataforma web para la gestión académica y administrativa de colegios, incluyendo control de estudiantes, docentes y procesos educativos.",
      en: "Web platform for the academic and administrative management of schools, including control of students, teachers, and educational processes."
    },
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    demoUrl: "https://colegioo.site/",
    githubUrl: "#",
    status: "private",
    category: "EdTech",
    image: "/colegio.png"
  },
  {
    id: 5,
    title: {
      es: "Sistema Web para el Saneamiento de Títulos de Propiedad",
      en: "Web System for Property Title Sanitation"
    },
    description: {
      es: "Aplicación web para la gestión y seguimiento de procesos de saneamiento físico-legal de títulos de propiedad, con trazabilidad documental y visualización en mapas.",
      en: "Web application for managing and tracking physical-legal sanitation processes of property titles, with documentary traceability and map visualization."
    },
    technologies: ["PHP", "PostgreSQL", "JavaScript", "Leaflet Maps"],
    demoUrl: "https://incocat.shop/",
    githubUrl: "#",
    status: "private",
    category: "LegalTech",
    image: "/saneamiento_titulos.png"
  },
  {
    id: 7,
    title: {
      es: "Sistema Básico de Gestión de Grifos y Lecturas",
      en: "Basic Gas Station Management System"
    },
    description: {
      es: "Aplicación web para el control básico de ventas y operaciones en estaciones de servicio, integrada con la API de RENIEC para la validación de clientes.",
      en: "Web application for basic control of sales and operations in service stations, integrated with RENIEC API for client validation."
    },
    technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    demoUrl: "https://estaciongoyo.com/index.php",
    githubUrl: "#",
    status: "private",
    category: "Retail",
    image: "/grifo.png"
  },
  {
    id: 8,
    featured: true,
    title: {
      es: "Sistema Web para la Emisión de Diplomas de Grados y Títulos",
      en: "Web System for the Issuance of Degree Diplomas"
    },
    description: {
      es: "Plataforma web desarrollada para la UTEA, orientada a la emisión, validación y control de diplomas académicos de grados y títulos universitarios.",
      en: "Web platform developed for UTEA, oriented to the issuance, validation, and control of academic degree diplomas."
    },
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "FPDF"],
    demoUrl: "https://gradosapp.fun/index.php",
    githubUrl: "#",
    status: "private",
    category: "EdTech",
    image: "/grados_y_titulos.png"
  },
  {
    id: 10,
    title: {
      es: "NutriDiabetes — Plataforma de Salud y Nutrición",
      en: "NutriDiabetes — Health & Nutrition Platform"
    },
    description: {
      es: "Plataforma web orientada al seguimiento nutricional y control glicémico para pacientes con diabetes, con registro de dietas, alertas personalizadas y reportes para el profesional de salud.",
      en: "Web platform oriented to nutritional monitoring and glycemic control for diabetic patients, with diet logging, personalized alerts, and reports for health professionals."
    },
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Chart.js"],
    demoUrl: "#",
    githubUrl: "#",
    status: "private",
    category: "HealthTech",
    image: null,
    gradient: "linear-gradient(135deg, #052e16 0%, #064e3b 40%, #02040f 100%)"
  },
  {
    id: 11,
    title: {
      es: "Sistema de Farmacia — Gestión y Ventas",
      en: "Pharmacy System — Management & Sales"
    },
    description: {
      es: "Sistema web para farmacias que cubre el control de inventario de medicamentos, gestión de ventas, alertas de stock mínimo, vencimiento de productos y emisión de reportes administrativos.",
      en: "Web system for pharmacies covering medicine inventory control, sales management, minimum stock alerts, product expiration tracking, and administrative report generation."
    },
    technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript", "FPDF"],
    demoUrl: "#",
    githubUrl: "#",
    status: "private",
    category: "HealthTech",
    image: null,
    gradient: "linear-gradient(135deg, #0c1a4e 0%, #1e3a8a 40%, #02040f 100%)"
  },
  {
    id: 12,
    title: {
      es: "Sistema de Inventario — PernoCentro",
      en: "Inventory System — PernoCentro"
    },
    description: {
      es: "Sistema web de control de inventario para PernoCentro, con gestión de stock de productos ferreteros, registro de entradas y salidas, alertas de reposición y reportes de movimientos.",
      en: "Web inventory control system for PernoCentro, with hardware product stock management, entry/exit logging, replenishment alerts, and movement reports."
    },
    technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    demoUrl: "#",
    githubUrl: "#",
    status: "private",
    category: "Inventario",
    image: null,
    gradient: "linear-gradient(135deg, #431407 0%, #7c2d12 40%, #02040f 100%)"
  }
];
