export const projectsData = [

  // ── TOP PROJECT (hero card, destacado máximo) ──────────────────────────────
  {
    id: 9,
    topProject: true,
    featured: false,
    hasCaseStudy: true,
    title: {
      es: "DereJ-IA Perú 🏛️ — Asistente Legal Inteligente",
      en: "DereJ-IA Peru 🏛️ — Intelligent Legal Assistant"
    },
    description: {
      es: "Plataforma SaaS legal con Inteligencia Artificial que combina búsqueda semántica sobre legislación peruana (RAG), generación de documentos jurídicos y herramientas de análisis procesal. Diseñada para estudiantes de Derecho y abogados en ejercicio en el Perú. Incluye chat jurídico RAG, analizador de expedientes, generador de escritos procesales, contratos, resoluciones, dictaminador de viabilidad, flujo procesal IA y más de 20 módulos especializados.",
      en: "Legal SaaS platform with Artificial Intelligence combining semantic search over Peruvian legislation (RAG), legal document generation, and procedural analysis tools. Designed for Law students and practicing lawyers in Peru. Includes RAG legal chat, case analyzer, procedural document generator, contracts, resolutions, viability dictator, AI procedural flow, and over 20 specialized modules."
    },
    technologies: ["Next.js", "Node.js", "Express.js", "MySQL", "OpenAI API", "Pinecone", "TypeScript", "Tailwind CSS", "Railway", "JWT", "Google OAuth", "RAG"],
    demoUrl: "https://derejia.com/",
    githubUrl: "#",
    status: "private",
    category: "LegalTech / SaaS",
    image: "/derejia.png",
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
    featured: true,
    hasCaseStudy: true,
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
    githubUrl: "https://github.com/jersson14/TRAMITE_DOC",
    status: "public",
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
    hasCaseStudy: true,
    title: {
      es: "Sistema Web de Facturación Electrónica — Transporte",
      en: "Web Electronic Invoicing System — Transport"
    },
    description: {
      es: "Plataforma web para la emisión de comprobantes electrónicos en servicios de transporte Cusco–Abancay, integrada con RENIEC y SUNAT, cumpliendo la normativa de facturación electrónica vigente.",
      en: "Web platform for issuing electronic receipts in Cusco–Abancay transport services, integrated with RENIEC and SUNAT, complying with current electronic invoicing regulations."
    },
    technologies: ["PHP", "MySQL", "API SUNAT", "API RENIEC", "Facturación Electrónica"],
    demoUrl: "https://sisfacturacion.jcm-abc.com/",
    githubUrl: "https://github.com/jersson14/sistema_micaela",
    status: "public",
    category: "FinTech",
    image: "/facturacion.png"
  },
  {
    id: 1,
    hasCaseStudy: true,
    title: {
      es: "Sistema Odontológico — Gestión Clínica y Odontograma Digital",
      en: "Dental System — Clinical Management & Digital Odontogram"
    },
    description: {
      es: "Sistema web que centraliza pacientes, doctores, citas, historias clínicas, odontogramas, tratamientos, pagos e ingresos/gastos de un consultorio dental en una sola plataforma.",
      en: "Web system that centralizes patients, doctors, appointments, medical records, odontograms, treatments, payments and income/expenses of a dental practice in a single platform."
    },
    technologies: ["PHP", "MySQL", "AdminLTE", "jQuery", "AJAX", "mPDF/FPDI"],
    demoUrl: "#",
    githubUrl: "https://github.com/jersson14/Sistema_Odontologico",
    status: "public",
    category: "Full Stack",
    image: "/odontologia.png"
  },
  {
    id: 3,
    hasCaseStudy: true,
    title: {
      es: "SISRECUPEROS — Gestión de Recuperos Médicos",
      en: "SISRECUPEROS — Medical Recoupment Management"
    },
    description: {
      es: "Sistema web de gestión de recuperos médicos que administra pacientes, obras sociales, prácticas y facturación, vinculando cada práctica con su paciente y su factura correspondiente.",
      en: "Web system for medical recoupment management that handles patients, health insurance providers, medical procedures, and invoicing, linking each procedure to its patient and corresponding invoice."
    },
    technologies: ["PHP", "MySQL", "PDO", "JavaScript", "MVC"],
    demoUrl: "#",
    githubUrl: "https://github.com/jersson14/sistema_recuperos",
    status: "public",
    category: "Full Stack",
    image: "/recuperos.png"
  },
  {
    id: 4,
    hasCaseStudy: true,
    title: {
      es: "Sistema Web de Gestión Educativa",
      en: "Educational Management Web System"
    },
    description: {
      es: "Plataforma web para la gestión académica y administrativa de colegios, incluyendo control de estudiantes, docentes y procesos educativos.",
      en: "Web platform for the academic and administrative management of schools, including control of students, teachers, and educational processes."
    },
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    demoUrl: "https://colegioo.site/landing.html",
    githubUrl: "https://github.com/jersson14/colegio_sedes_sapientae",
    status: "public",
    featured: true,
    category: "EdTech",
    image: "/colegio.png"
  },
  {
    id: 5,
    hasCaseStudy: true,
    title: {
      es: "INCOCAT — Sistema de Gestión Documentaria y Trámites",
      en: "INCOCAT — Document Management & Procedures System"
    },
    description: {
      es: "Sistema web de administración interna para una empresa de gestoría/tramitología, con seguimiento de clientes, expedientes, pagos, ingresos/gastos, indicadores y notificaciones automáticas de expedientes atrasados.",
      en: "Internal management web system for a procedures/gestoría company, tracking clients, case files, payments, income/expenses, KPIs, and automatic notifications for delayed cases."
    },
    technologies: ["PHP", "MySQL", "AdminLTE", "PHPMailer", "mPDF", "DataTables"],
    demoUrl: "#",
    githubUrl: "https://github.com/jersson14/incocat_abancay",
    status: "public",
    category: "Gestoría",
    image: "/saneamiento_titulos.png"
  },
  {
    id: 7,
    hasCaseStudy: true,
    title: {
      es: "Sistema de Gestión de Grifo — Turnos y Créditos",
      en: "Gas Station Management System — Shifts & Credit"
    },
    description: {
      es: "Sistema web completo para la administración de un grifo: turnos con lectura automática de surtidores, ventas con múltiples métodos de pago, créditos a clientes y reportes gerenciales en tiempo real.",
      en: "Complete web system for gas station management: shifts with automatic pump readings, sales with multiple payment methods, customer credit, and real-time management reports."
    },
    technologies: ["PHP", "MySQL", "AdminLTE", "Chart.js", "mPDF", "Docker"],
    demoUrl: "#",
    githubUrl: "https://github.com/jersson14/grifo_grau",
    status: "public",
    category: "Retail",
    image: "/grifo.png"
  },
  {
    id: 8,
    hasCaseStudy: true,
    title: {
      es: "Sistema de Grados y Títulos — UTEA (con reporte SUNEDU)",
      en: "Degrees & Diplomas System — UTEA (SUNEDU Reporting)"
    },
    description: {
      es: "Sistema institucional para la UTEA que gestiona el ciclo completo de grados y títulos de pregrado y posgrado: expediente, validación documental, diploma, colación y reporte regulatorio a la SUNEDU.",
      en: "Institutional system for UTEA managing the full undergraduate and graduate degree lifecycle: case file, document validation, diploma issuance, graduation ceremony, and SUNEDU regulatory reporting."
    },
    technologies: ["PHP", "MySQL", "AdminLTE", "mPDF", "PHPMailer", "DSpace"],
    demoUrl: "#",
    githubUrl: "https://github.com/jersson14/Sistema_grado_titulos",
    status: "public",
    category: "EdTech",
    image: "/grados_y_titulos.png"
  },
  {
    id: 10,
    hasCaseStudy: true,
    title: {
      es: "NutriDiabetes — Recomendaciones Nutricionales con IA (RAG)",
      en: "NutriDiabetes — AI Nutrition Recommendations (RAG)"
    },
    description: {
      es: "Sistema inteligente de recomendaciones nutricionales para pacientes con Diabetes Mellitus Tipo 2, basado en la Tabla Peruana de Composición de Alimentos (CENAN/INS) y arquitectura RAG. Proyecto de tesis de Maestría con métricas de precisión validadas.",
      en: "Intelligent nutrition recommendation system for Type 2 Diabetes patients, based on the Peruvian Food Composition Table (CENAN/INS) and a RAG architecture. Master's thesis project with validated accuracy metrics."
    },
    technologies: ["Next.js", "Node.js", "FastAPI", "PostgreSQL", "Pinecone", "OpenAI GPT-4", "RAG"],
    demoUrl: "https://nutri-diabetes.vercel.app/",
    githubUrl: "https://github.com/jersson14/NutriDiabetes",
    status: "public",
    featured: true,
    category: "HealthTech",
    image: "/nutridiabetes.png",
    gradient: "linear-gradient(135deg, #052e16 0%, #064e3b 40%, #02040f 100%)"
  },
  {
    id: 11,
    hasCaseStudy: true,
    title: {
      es: "ITVentas — Sistema de Punto de Venta para Farmacia",
      en: "ITVentas — Pharmacy Point of Sale System"
    },
    description: {
      es: "Sistema de punto de venta, inventario, compras y reportes para farmacias independientes, con trazabilidad de lotes, control de vencimientos (FEFO), recetas médicas y registro de medicamentos de control especial.",
      en: "Point of sale, inventory, purchasing, and reporting system for independent pharmacies, with batch traceability, expiration control (FEFO), medical prescriptions, and special-control medicine tracking."
    },
    technologies: ["PHP", "MySQL", "AdminLTE", "Bootstrap", "Chart.js", "FPDF", "jQuery"],
    demoUrl: "https://demo.farmasuyana.shop/",
    githubUrl: "https://github.com/jersson14/sistema_farmacia",
    status: "public",
    featured: true,
    category: "HealthTech",
    image: "/farmacia.png",
    gradient: "linear-gradient(135deg, #0c1a4e 0%, #1e3a8a 40%, #02040f 100%)"
  },
  {
    id: 12,
    hasCaseStudy: true,
    title: {
      es: "Sistema de Gestión Comercial — PernoCentro",
      en: "Commercial Management System — PernoCentro"
    },
    description: {
      es: "Sistema de gestión comercial (inventario, compras, ventas y reportes) para PernoCentro, con cuentas por cobrar/pagar, permisos por módulo y dashboard de ventas en tiempo real.",
      en: "Commercial management system (inventory, purchasing, sales, and reporting) for PernoCentro, with accounts receivable/payable, module-level permissions, and a real-time sales dashboard."
    },
    technologies: ["PHP", "MySQL", "AdminLTE", "Bootstrap", "Chart.js", "FPDF"],
    demoUrl: "https://colegioo.site/pernos/vistas/login.html",
    githubUrl: "https://github.com/jersson14/Sis_Inventario",
    status: "public",
    featured: true,
    category: "Inventario",
    image: "/inventario.png",
    gradient: "linear-gradient(135deg, #431407 0%, #7c2d12 40%, #02040f 100%)"
  }
];
