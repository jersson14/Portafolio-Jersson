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
    image: "/derejia.webp",
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
    hasCaseStudy: true,
    title: {
      es: "Sistema de Trámite Documentario con IA",
      en: "AI Document Tracking System"
    },
    description: {
      es: "Reemplaza el expediente en papel: registra, deriva, controla plazos en días hábiles y firma digitalmente con QR. Un agente de IA responde preguntas sobre los trámites y oculta los datos personales antes de consultar al modelo.",
      en: "Replaces paper files: registers, routes, tracks deadlines in business days and signs digitally with QR. An AI agent answers questions about cases and masks personal data before querying the model."
    },
    technologies: ["PHP", "MySQL", "Bootstrap", "AJAX", "API RENIEC", "RAG", "IA"],
    demoUrl: "https://tramitedoc.jcm-abc.com/",
    githubUrl: "https://github.com/jersson14/TRAMITE_DOC",
    status: "public",
    category: "Full Stack",
    image: "/live/tramite-1.webp",
    metrics: [
      { value: "60%", label: "Reducción de Tiempo" },
      { value: "500+", label: "Consultas/Mes Auto." },
      { value: "4.8/5", label: "Satisfacción Usuario" }
    ],
    live: {
      order: 4,
      short: { es: "Trámite documentario", en: "Document tracking" },
      ai: true,
      trialLogin: true,
      docUrl: "https://drive.google.com/file/d/1-Lm8RL1Moup2rIO7GgohGOY7X8Muk5bU/view?usp=sharing",
      shots: ["/live/tramite-1.webp", "/live/tramite-2.webp", "/live/tramite-3.webp"],
      facts: [
        { value: "5", label: { es: "Roles con bitácora de auditoría", en: "Roles with audit log" } },
        { value: "QR", label: { es: "Firma digital verificable", en: "Verifiable digital signature" } },
        { value: "Solo lee", label: { es: "La IA no modifica ni borra datos", en: "The AI never edits or deletes" } }
      ],
      features: [
        { es: "Agente de IA (ChatGPT o Gemini) que respeta lo que cada área puede ver", en: "AI agent (ChatGPT or Gemini) that respects what each department may see" },
        { es: "Mesa de partes virtual y consulta con expediente y DNI", en: "Virtual front desk and lookup by case and ID number" },
        { es: "Semáforo de plazos en días hábiles y feriados nacionales", en: "Deadline traffic light in business days and national holidays" },
        { es: "Recorrido de cada expediente como diagrama de flujo", en: "Each case route drawn as a flow diagram" }
      ]
    }
  },

  // ── REGULAR PROJECTS (grilla 3 columnas) ──────────────────────────────────
  {
    id: 6,
    hasCaseStudy: true,
    title: {
      es: "Sistema de Transportes y Facturación Electrónica",
      en: "Transport & Electronic Invoicing System"
    },
    description: {
      es: "Venta de pasajes, salidas diarias, encomiendas y comprobantes electrónicos SUNAT en un solo sistema web para empresas de transporte interprovincial. Si SUNAT se cae, el ticket se entrega igual y el comprobante se regulariza solo.",
      en: "Ticket sales, daily departures, parcels and SUNAT electronic receipts in a single web system for intercity transport companies. If SUNAT goes down, the ticket is still issued and the receipt is reconciled automatically."
    },
    technologies: ["PHP", "MySQL", "Greenter", "API SUNAT", "API RENIEC", "Docker"],
    demoUrl: "https://sisfacturacion.jcm-abc.com/",
    githubUrl: "https://github.com/jersson14/sistema_micaela",
    status: "public",
    category: "FinTech",
    image: "/facturacion.webp",
    metrics: [
      { value: "+10k", label: "Facturas/Mes" },
      { value: "0%", label: "Duplicidad" },
      { value: "100%", label: "Visibilidad Gerencial" }
    ],
    live: {
      order: 1,
      short: { es: "Transportes", en: "Transport" },
      ai: false,
      trialLogin: true,
      docUrl: "https://drive.google.com/file/d/1WPtm0mYC0_u-Ri5DBfebKo6L7wNRdpCP/view?usp=sharing",
      shots: ["/facturacion.webp", "/live/transporte-1.webp", "/live/transporte-2.webp"],
      facts: [
        { value: "< 1 min", label: { es: "Emitir un comprobante", en: "Issue a receipt" } },
        { value: "5 min", label: { es: "Cierre de caja del día", en: "Daily cash closing" } },
        { value: "~1,600", label: { es: "Comprobantes al mes", en: "Receipts per month" } }
      ],
      features: [
        { es: "El DNI o RUC completa los datos del cliente desde RENIEC y SUNAT", en: "ID or tax number fills in customer data from RENIEC and SUNAT" },
        { es: "Facturas, boletas y notas con ticket, PDF, XML y CDR", en: "Invoices, receipts and credit notes with ticket, PDF, XML and CDR" },
        { es: "Manifiesto de pasajeros y seguimiento de encomiendas en línea", en: "Passenger manifest and online parcel tracking" },
        { es: "Reenvío automático cuando SUNAT no responde", en: "Automatic resend when SUNAT is unavailable" }
      ]
    }
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
    image: "/odontologia.webp"
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
    image: "/recuperos.webp"
  },
  {
    id: 4,
    hasCaseStudy: true,
    title: {
      es: "Sistema de Gestión Educativa con IA",
      en: "AI School Management System"
    },
    description: {
      es: "Matrícula, notas, asistencia, aula virtual, pensiones, caja y planilla en un solo lugar para colegios de inicial, primaria y secundaria. Cada perfil, de dirección a familias, tiene su propio espacio, también en el celular.",
      en: "Enrollment, grades, attendance, virtual classroom, tuition, cash and payroll in one place for preschool, primary and secondary schools. Every profile, from principal to family, has its own space, on mobile too."
    },
    technologies: ["PHP", "MySQL", "AdminLTE", "jQuery", "mPDF", "DataTables"],
    demoUrl: "https://colegio.jcm-abc.com/index.php",
    githubUrl: "https://github.com/jersson14/colegio_sedes_sapientae",
    status: "public",
    category: "EdTech",
    image: "/live/colegio-1.webp",
    metrics: [
      { value: "12+", label: "Módulos Funcionales" },
      { value: "36", label: "Tablas en BD" },
      { value: "263", label: "Controladores PHP" }
    ],
    live: {
      order: 6,
      short: { es: "Gestión educativa", en: "School management" },
      ai: true,
      trialLogin: true,
      docUrl: "https://drive.google.com/file/d/1JccLmIPCN2n7puSDJy8bmBA5LSQjXGih/view?usp=sharing",
      shots: ["/live/colegio-1.webp", "/live/colegio-2.webp", "/live/colegio-3.webp"],
      facts: [
        { value: "12", label: { es: "Módulos en un solo sistema", en: "Modules in one system" } },
        { value: "7", label: { es: "Espacios según el perfil", en: "Profile-specific spaces" } },
        { value: "PDF", label: { es: "Libretas por bimestre", en: "Term report cards" } }
      ],
      features: [
        { es: "Aula virtual con tareas, exámenes, entrega y calificación", en: "Virtual classroom with assignments, exams, delivery and grading" },
        { es: "Pensiones con mora automática y varias formas de pago", en: "Tuition with automatic late fees and several payment methods" },
        { es: "Comunicados con confirmación de lectura y aviso por WhatsApp", en: "Announcements with read receipts and WhatsApp notices" },
        { es: "Auditoría de cambios, copias de seguridad y permisos por rol", en: "Change audit, backups and role permissions" }
      ]
    }
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
    image: "/saneamiento_titulos.webp"
  },
  {
    id: 7,
    hasCaseStudy: true,
    title: {
      es: "Sistema de Grifo con IA",
      en: "AI Gas Station System"
    },
    description: {
      es: "Turnos, caja, créditos, flotas, inventario y facturación electrónica para estaciones de servicio, con un asistente de IA. El grifero cierra el turno desde el celular y el dueño ve la rentabilidad por combustible.",
      en: "Shifts, cash, credit, fleets, inventory and electronic invoicing for gas stations, with an AI assistant. Attendants close shifts from their phone and owners see profitability by fuel type."
    },
    technologies: ["PHP", "MySQL", "AdminLTE", "Chart.js", "mPDF", "Docker"],
    demoUrl: "https://sistemagrifo.jcm-abc.com/",
    githubUrl: "https://github.com/jersson14/grifo_grau",
    status: "public",
    category: "Retail",
    image: "/live/grifo-1.webp",
    live: {
      order: 3,
      short: { es: "Grifo", en: "Gas station" },
      ai: true,
      trialLogin: false,
      docUrl: "https://drive.google.com/file/d/1I3f4fFaAeN7M3d7Nj2RDfrjzCcQLgrGz/view?usp=sharing",
      shots: ["/live/grifo-1.webp", "/live/grifo-2.webp", "/live/grifo-3.webp"],
      facts: [
        { value: "5–10 min", label: { es: "Cierre de turno (antes 30–45)", en: "Shift closing (was 30–45)" } },
        { value: "Al día", label: { es: "Deuda de cada flota", en: "Debt of each fleet" } },
        { value: "PDF · Excel", label: { es: "Informes para el contador", en: "Accountant reports" } }
      ],
      features: [
        { es: "Asistente con IA sobre ventas, stock y créditos vencidos", en: "AI assistant for sales, stock and overdue credit" },
        { es: "Galones, totales y cuadre de caja calculados por surtidor", en: "Gallons, totals and cash reconciliation computed per pump" },
        { es: "Flotas con línea de crédito, placas autorizadas y alertas", en: "Fleets with credit lines, authorized plates and alerts" },
        { es: "Página web propia con los precios del día en vivo", en: "Own website with live daily prices" }
      ]
    }
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
    image: "/grados_y_titulos.webp"
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
    technologies: ["Next.js", "Node.js", "FastAPI", "PostgreSQL", "Pinecone", "OpenAI GPT-4", "RAG", "Vercel"],
    demoUrl: "https://nutri-diabetes.vercel.app/",
    githubUrl: "https://github.com/jersson14/NutriDiabetes",
    status: "public",
    featured: true,
    category: "HealthTech",
    image: "/nutridiabetes.webp",
    gradient: "linear-gradient(135deg, #052e16 0%, #064e3b 40%, #02040f 100%)",
    metrics: [
      { value: "73.3%", label: "Precisión Excelente/Buena" },
      { value: "+93%", label: "Coherencia Semántica" },
      { value: "888", label: "Alimentos Vectorizados" }
    ]
  },
  {
    id: 11,
    hasCaseStudy: true,
    title: {
      es: "Sistema de Farmacia con IA",
      en: "AI Pharmacy System"
    },
    description: {
      es: "Punto de venta, caja, inventario por lotes y vencimientos, recetas y tienda online para farmacias y boticas. El dueño pregunta en español, por la web o por WhatsApp, y la IA responde con sus ventas y su stock.",
      en: "Point of sale, cash register, batch and expiry inventory, prescriptions and online store for pharmacies. Owners ask in plain language, on the web or WhatsApp, and the AI answers from their own sales and stock."
    },
    technologies: ["PHP", "MySQL", "AdminLTE", "Bootstrap", "Chart.js", "FPDF", "jQuery"],
    demoUrl: "https://farmacia.jcm-abc.com/",
    githubUrl: "https://github.com/jersson14/sistema_farmacia",
    status: "public",
    category: "HealthTech",
    image: "/live/farmacia-1.webp",
    gradient: "linear-gradient(135deg, #0c1a4e 0%, #1e3a8a 40%, #02040f 100%)",
    metrics: [
      { value: "-80%", label: "Tiempo por Venta" },
      { value: "-90%", label: "Errores de Inventario" },
      { value: "-60%", label: "Mermas por Vencimiento" }
    ],
    live: {
      order: 2,
      short: { es: "Farmacia", en: "Pharmacy" },
      ai: true,
      trialLogin: false,
      docUrl: "https://drive.google.com/file/d/1AyI06i-IJOTksNyFhgZH2YwtRE60HIOq/view?usp=sharing",
      shots: ["/live/farmacia-1.webp", "/live/farmacia-2.webp", "/live/farmacia-3.webp"],
      facts: [
        { value: "FEFO", label: { es: "Primero sale lo que vence antes", en: "First to expire, first out" } },
        { value: "30/90/180", label: { es: "Días de alerta antes de vencer", en: "Days of expiry alerts" } },
        { value: "Web + WA", label: { es: "Canales para consultar a la IA", en: "Channels to query the AI" } }
      ],
      features: [
        { es: "Consultas en lenguaje natural: ¿qué productos vencen este mes?", en: "Natural-language queries: which products expire this month?" },
        { es: "Reportes explicados por IA y enviados por correo", en: "AI-explained reports delivered by email" },
        { es: "Recetas médicas y libro digital de psicotrópicos", en: "Prescriptions and digital controlled-substances log" },
        { es: "Tienda online con pedidos que llegan directo al sistema", en: "Online store with orders flowing straight into the system" }
      ]
    }
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
    image: "/inventario.webp",
    gradient: "linear-gradient(135deg, #431407 0%, #7c2d12 40%, #02040f 100%)",
    metrics: [
      { value: "13", label: "Módulos Funcionales" },
      { value: "95%", label: "Madurez en Ventas" },
      { value: "~9,430", label: "Líneas de Código" }
    ]
  },
  {
    id: 13,
    hasCaseStudy: true,
    title: {
      es: "Mi Tienda — Sistema Multinegocio con IA",
      en: "Mi Tienda — AI Multi-Business System"
    },
    description: {
      es: "Ventas, inventario, caja, compras y reportes en un sistema que se adapta a 14 rubros: restaurante, farmacia, ropa, ferretería, bodega, veterinaria y más. Incluye un asistente con IA (Claude) que respeta los permisos de cada usuario.",
      en: "Sales, inventory, cash, purchasing and reporting in a system that adapts to 14 business types: restaurant, pharmacy, clothing, hardware, grocery, vet and more. Includes an AI assistant (Claude) that respects each user's permissions."
    },
    technologies: ["PHP", "Claude API", "Nubefact"],
    demoUrl: "https://tienda.jcm-abc.com/",
    githubUrl: "#",
    status: "private",
    category: "Retail / PyME",
    image: "/live/tienda-1.webp",
    live: {
      order: 5,
      short: { es: "Multinegocio", en: "Multi-business" },
      ai: true,
      trialLogin: false,
      docUrl: "https://drive.google.com/file/d/1IawrnhLpShlp3JucxQmGIjE4gqw8Lcdm/view?usp=sharing",
      shots: ["/live/tienda-1.webp", "/live/tienda-2.webp", "/live/tienda-3.webp"],
      facts: [
        { value: "14", label: { es: "Rubros listos para usar", en: "Business types ready to use" } },
        { value: "3 s", label: { es: "Registrar una venta con lector", en: "Record a sale with a scanner" } },
        { value: "7", label: { es: "Roles con permisos", en: "Roles with permissions" } }
      ],
      features: [
        { es: "Asistente con IA sobre ventas, utilidad, stock y cobranzas", en: "AI assistant for sales, profit, stock and receivables" },
        { es: "Mesas, tallas, lotes o venta por peso según el rubro", en: "Tables, sizes, batches or weight sales by business type" },
        { es: "Boletas y facturas a SUNAT mediante Nubefact", en: "SUNAT receipts and invoices through Nubefact" },
        { es: "Varios locales con caja, series y stock propios", en: "Multiple branches with their own cash, series and stock" }
      ]
    }
  }
];
