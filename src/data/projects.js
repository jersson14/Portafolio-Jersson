export const projectsData = [
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
    id: 2,
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
    featured: true,
    metrics: [
      { value: "60%", label: "Reducción de Tiempo" },
      { value: "500+", label: "Consultas/Mes Auto." },
      { value: "4.8/5", label: "Satisfacción Usuario" }
    ]
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
      es: "Aplicación web orientada a la gestión, seguimiento y control de procesos de saneamiento físico-legal de títulos de propiedad, asegurando orden y trazabilidad documental.",
      en: "Web application oriented to the management, monitoring, and control of physical-legal sanitation processes of property titles, ensuring order and documentary traceability."
    },
    technologies: ["PHP", "PostgreSQL", "JavaScript", "Leaflet Maps"],
    demoUrl: "https://incocat.shop/",
    githubUrl: "#",
    status: "private",
    category: "LegalTech",
    image: "/saneamiento_titulos.png"
  },
  {
    id: 6,
    title: {
      es: "Sistema Web de Facturación Electrónica para Transporte Interprovincial",
      en: "Web Electronic Invoicing System for Interprovincial Transport"
    },
    description: {
      es: "Plataforma web para la emisión de comprobantes electrónicos en servicios de transporte en la ruta Cusco – Abancay y viceversa, integrada con la API de RENIEC para validación de datos y vinculada a SUNAT, cumpliendo la normativa de facturación electrónica vigente.",
      en: "Web platform for issuing electronic receipts in transport services on the Cusco – Abancay route and vice versa, integrated with RENIEC API for data validation and linked to SUNAT, complying with current electronic invoicing regulations."
    },
    technologies: ["PHP", "MySQL", "API SUNAT", "API RENIEC", "Facturación Electrónica"],
    demoUrl: "https://micaela-tours.com/",
    githubUrl: "#",
    status: "private",
    category: "FinTech",
    image: "/facturacion.png",
    featured: true,
    metrics: [
      { value: "+10k", label: "Facturas Procesadas" },
      { value: "99.9%", label: "Uptime del Sistema" },
      { value: "<3s", label: "Tiempo de Emisión" }
    ]
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
    title: {
      es: "Sistema Web para la Emisión de Diplomas de Grados y Títulos",
      en: "Web System for the Issuance of Degree Diplomas"
    },
    description: {
      es: "Plataforma web desarrollada para la UTEA, orientada a la emisión, validación y control de diplomas académicos de grados y títulos.",
      en: "Web platform developed for UTEA, oriented to the issuance, validation, and control of academic degree diplomas."
    },
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "FPDF"],
    demoUrl: "https://gradosapp.fun/index.php",
    githubUrl: "#",
    status: "private",
    category: "EdTech",
    image: "/grados_y_titulos.png"
  }
];
