import { motion } from 'framer-motion';
import { FaArrowLeft, FaServer, FaDatabase, FaRobot, FaIdCard, FaFileSignature, FaDocker, FaFileInvoiceDollar, FaChartLine, FaBalanceScale, FaFileAlt, FaSearch, FaPills, FaCashRegister, FaBoxes, FaUsersCog, FaTooth, FaCalendarCheck, FaClock, FaEnvelope, FaGasPump, FaGraduationCap } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const caseStudiesData = {
    9: { // DereJ-IA Perú
        title: "Construyendo una Plataforma Legal con",
        highlight: "Inteligencia Artificial",
        badges: ["LegalTech", "SaaS", "Perú"],
        description: "Plataforma SaaS legal que combina búsqueda semántica (RAG) sobre legislación peruana, generación de documentos jurídicos y herramientas de análisis procesal, pensada para estudiantes de Derecho y abogados en ejercicio.",
        challenge: {
            title: "El Desafío",
            text: "Estudiantes y abogados en Perú dependen de búsquedas manuales dispersas en códigos y jurisprudencia, y de la redacción manual de escritos, lo que genera:",
            points: [
                "Pérdida de Tiempo: Buscar la norma o jurisprudencia correcta toma horas entre múltiples fuentes.",
                "Redacción Repetitiva: Escritos, contratos y resoluciones se redactan desde cero en cada caso.",
                "Falta de Herramientas Locales: Las soluciones de IA genéricas no entienden el ordenamiento jurídico peruano."
            ],
            questions: [
                "¿Cómo reducir el tiempo de búsqueda legal mediante IA entrenada en legislación peruana?",
                "¿Cómo automatizar la generación de escritos procesales sin perder rigor jurídico?",
                "¿Cómo ofrecer estas herramientas de forma escalable bajo un modelo SaaS por planes?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaSearch,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Chat Jurídico con RAG",
                    desc: "Búsqueda semántica sobre Código Civil, Penal, Procesal y jurisprudencia (Pinecone + embeddings OpenAI), con respuesta en streaming (SSE) y modo de búsqueda en internet para jurisprudencia reciente."
                },
                {
                    icon: FaFileAlt,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Analizador de Expedientes (OCR + IA)",
                    desc: "Acepta PDF, DOCX e imágenes escaneadas con OCR automático (GPT-4o Vision). Extrae hechos clave, normas aplicables, viabilidad del caso y genera alegatos e interrogatorios estratégicos."
                },
                {
                    icon: FaBalanceScale,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Generador de Escritos y Documentos",
                    desc: "Más de 20 plantillas Word (demandas, recursos, contratos, resoluciones y sentencias) generadas por IA, con preview editable antes de exportar."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (SaaS multi-plan)",
            frontend: { label: "VIEW", text: "Frontend", sub: "Next.js + React + TypeScript" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "Node.js + Express (≈60 endpoints)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL + Pinecone", sub: "Datos + búsqueda vectorial" },
                { icon: FaRobot, color: "text-green-400", title: "OpenAI (4 modelos)", sub: "RAG, OCR y generación" }
            ]
        },
        results: [
            { value: "20+", title: "Módulos de IA", desc: "Desde chat jurídico hasta generación de sentencias y contratos." },
            { value: "4", title: "Planes SaaS", desc: "Freemium, PRO, PREMIUM y ELITE con cuotas y módulos diferenciados." },
            { value: "60+", title: "Endpoints API", desc: "Backend modular con autenticación JWT y control de cuotas por plan." }
        ],
        gallery: ["/derejia.webp"]
    },
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
    4: { // Colegio Sedes Sapientae
        title: "Digitalizando la Gestión Académica del",
        highlight: "Colegio Sedes Sapientae",
        badges: ["EdTech", "Sistema MVC"],
        description: "Sistema web integral de gestión escolar que centraliza matrícula, asistencia, notas, tareas virtuales, pensiones y atención de enfermería/psicología en una sola plataforma.",
        challenge: {
            title: "El Desafío",
            text: "La gestión tradicional en papel y hojas de cálculo sueltas generaba procesos lentos y dispersos:",
            points: [
                "Información Dispersa: Alumnos, notas, asistencia y pagos registrados en cuadernos y Excel sin centralizar.",
                "Reportes Manuales: Boletas de notas y constancias elaboradas a mano, una por una.",
                "Comunicación Limitada: Padres y alumnos dependían de comunicados impresos para conocer notas y tareas."
            ],
            questions: [
                "¿Cómo centralizar matrícula, notas, asistencia y pagos en un solo sistema por roles?",
                "¿Cómo automatizar la generación de boletas y constancias en PDF?",
                "¿Cómo dar seguimiento digital a solicitudes de información de nuevos postulantes?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaFileAlt,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Gestión Académica Integral",
                    desc: "Matrícula por año/nivel/aula, asignación docente-curso, control de asistencia diaria, registro de notas por periodo y tareas virtuales calificables entre docentes y alumnos."
                },
                {
                    icon: FaFileInvoiceDollar,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Pensiones y Reportes PDF",
                    desc: "Control de pagos de pensión, ingresos y egresos con indicadores, y generación automática de boletas de notas y constancias mediante mPDF."
                },
                {
                    icon: FaIdCard,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Acceso por Roles + Landing Pública",
                    desc: "Cinco roles (admin, docente, alumno, padre, personal administrativo) con módulos de enfermería/psicología, comunicados y un formulario público de solicitud de información."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (MVC)",
            frontend: { label: "VIEW", text: "Frontend", sub: "AdminLTE + Bootstrap + jQuery" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP MVC (263 controladores · 38 modelos)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL / MariaDB", sub: "36 tablas (PDO + MySQLi)" },
                { icon: FaFileInvoiceDollar, color: "text-green-400", title: "mPDF", sub: "Boletas y constancias" }
            ]
        },
        results: [
            { value: "12+", title: "Módulos Funcionales", desc: "Desde matrícula hasta enfermería y psicología en un solo sistema." },
            { value: "36", title: "Tablas en BD", desc: "Modelo de datos relacional completo para toda la operación escolar." },
            { value: "~52k", title: "Líneas de Código", desc: "Código propio entre PHP y JS, sin contar librerías de terceros." }
        ]
    },
    10: { // NutriDiabetes
        title: "IA con Respaldo Científico para",
        highlight: "Pacientes con Diabetes Tipo 2",
        badges: ["HealthTech", "RAG", "Tesis de Maestría"],
        description: "Sistema inteligente de recomendaciones nutricionales para pacientes con Diabetes Mellitus Tipo 2 (DM2), basado en la Tabla Peruana de Composición de Alimentos 2025 (CENAN/INS) y arquitectura RAG, desarrollado como proyecto de tesis de Maestría.",
        challenge: {
            title: "El Desafío",
            text: "Los pacientes con DM2 en Perú no contaban con una herramienta que combine datos nutricionales oficiales con recomendaciones personalizadas y seguras:",
            points: [
                "Información Genérica: Los LLM de propósito general no están anclados a datos nutricionales peruanos reales.",
                "Riesgo Clínico: Una recomendación sin reglas de seguridad puede ignorar medicamentos o picos glucémicos.",
                "Sin Medición de Calidad: No existía un sistema que evaluara la precisión y utilidad real de sus respuestas."
            ],
            questions: [
                "¿Cómo anclar las recomendaciones a los 888 alimentos reales de la TPCA 2025 mediante RAG?",
                "¿Cómo aplicar reglas clínicas (food sequencing, interacción con medicamentos) de forma automática?",
                "¿Cómo medir cuantitativamente la precisión del sistema frente a LLMs sin RAG?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaSearch,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Pipeline RAG Clínico",
                    desc: "Embeddings (text-embedding-3-small) + búsqueda semántica en Pinecone sobre los 888 alimentos de la TPCA 2025, con un system prompt clínico (~160 líneas) que aplica reglas de food sequencing e interacciones farmacológicas antes de generar la receta con GPT-4."
                },
                {
                    icon: FaChartLine,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Seguimiento de Salud DM2",
                    desc: "Registro y gráficas de glucosa, perfil clínico (HbA1c, medicamentos, complicaciones) y dashboard de métricas, sobre una base de datos PostgreSQL con 17+ tablas, triggers y vistas."
                },
                {
                    icon: FaRobot,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Evaluación Cuantitativa (Tesis)",
                    desc: "Microservicio FastAPI independiente que registra MAPE, similitud coseno y tiempos de respuesta por consulta, permitiendo comparar el RAG contra LLMs sin contexto (GPT-4o-mini, Claude Haiku)."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (Microservicios)",
            frontend: { label: "VIEW", text: "Frontend", sub: "Next.js 14 PWA + TailwindCSS" },
            backend: { label: "Controller / Model", text: "Backend + AI Service", sub: "Node.js/Express + FastAPI (Python)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "PostgreSQL + Pinecone", sub: "17+ tablas · 888 alimentos vectorizados" },
                { icon: FaRobot, color: "text-green-400", title: "OpenAI GPT-4", sub: "Generación + embeddings RAG" }
            ]
        },
        results: [
            { value: "73.3%", title: "Precisión Excelente/Buena", desc: "De las consultas con error calórico (MAPE) menor al 10%, validado contra la TPCA 2025." },
            { value: "+93%", title: "Mejor Coherencia Semántica", desc: "Similitud coseno superior frente a GPT-4o-mini usado sin RAG (0.276 vs 0.143)." },
            { value: "888", title: "Alimentos Vectorizados", desc: "Base de conocimiento oficial CENAN/INS indexada en Pinecone para RAG." }
        ],
        gallery: ["/nutridiabetes.webp"]
    },
    11: { // Sistema Farmacia / ITVentas
        title: "Digitalizando la Operación de una",
        highlight: "Farmacia Independiente",
        badges: ["Retail Salud", "Punto de Venta"],
        description: "Sistema de punto de venta, inventario, compras y reportes para farmacias independientes, con trazabilidad de lotes, control de vencimientos (FEFO), recetas médicas y registro de medicamentos de control especial.",
        challenge: {
            title: "El Desafío",
            text: "La gestión manual en una farmacia generaba pérdidas de tiempo y riesgo regulatorio:",
            points: [
                "Ventas Lentas: Cálculo manual de cada venta sin control de stock en tiempo real (3-5 min por venta).",
                "Mermas por Vencimiento: Sin alertas de stock mínimo ni control de lotes, los productos vencían sin detectarse.",
                "Cierre de Caja a Mano: 15-20 minutos cuadrando papeles, sin trazabilidad de diferencias."
            ],
            questions: [
                "¿Cómo reducir el tiempo de venta y eliminar errores de cálculo manual?",
                "¿Cómo controlar lotes y vencimientos aplicando la política FEFO de forma automática?",
                "¿Cómo dar trazabilidad regulatoria a medicamentos de control especial y recetas Rx?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaCashRegister,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Punto de Venta con Atajos de Teclado",
                    desc: "Búsqueda por nombre comercial, genérico, laboratorio o código de barras; venta confirmada en segundos (F10) con apertura automática de gaveta e impresión de ticket térmico."
                },
                {
                    icon: FaPills,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Trazabilidad de Lotes (FEFO)",
                    desc: "Control de vencimientos por lote con despacho First-Expired-First-Out, registro de recetas médicas (Rx) y libro de control de psicotrópicos y narcóticos."
                },
                {
                    icon: FaFileInvoiceDollar,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Caja, Compras y Reportes PDF",
                    desc: "Apertura/cierre de caja con diferencia calculada automáticamente, recepción de mercadería con actualización de stock por trigger, y reportes en PDF (FPDF) de ventas, compras y cierres."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (MVC Artesanal)",
            frontend: { label: "VIEW", text: "Frontend", sub: "AdminLTE + Bootstrap 3 + jQuery" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP 8.x sin framework (capa AJAX + Modelos)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL / MariaDB", sub: "24 migraciones idempotentes" },
                { icon: FaPills, color: "text-green-400", title: "Periféricos POS", sub: "Impresora térmica + gaveta de dinero" }
            ]
        },
        results: [
            { value: "-80%", title: "Tiempo por Venta", desc: "De 3-5 min de cálculo manual a 15-30 seg con búsqueda y confirmación F10." },
            { value: "-90%", title: "Errores de Inventario", desc: "Stock actualizado en tiempo real por triggers en lugar de conteo físico periódico." },
            { value: "-60%", title: "Mermas por Vencimiento", desc: "Alertas automáticas y despacho FEFO frente a la detección manual al vender." }
        ],
        gallery: ["/farmacia.webp"]
    },
    12: { // Sis_Inventario - PernoCentro
        title: "Control Total de Stock para",
        highlight: "PernoCentro",
        badges: ["Retail Ferretero", "Inventario"],
        description: "Sistema de gestión comercial (inventario, compras, ventas y reportes) para PernoCentro, una ferretería que necesitaba controlar stock, facturación y cuentas por cobrar/pagar desde un solo panel, sin depender de hojas sueltas.",
        challenge: {
            title: "El Desafío",
            text: "PernoCentro gestionaba su stock y ventas de forma manual, sin trazabilidad real:",
            points: [
                "Stock sin Control: Sin actualización automática, el inventario se desfasaba frente a lo realmente disponible.",
                "Cuentas Dispersas: Cuentas por cobrar y pagar sin seguimiento centralizado de saldos y vencimientos.",
                "Reportes Manuales: Sin un dashboard único para ver compras, ventas y movimientos por periodo."
            ],
            questions: [
                "¿Cómo centralizar inventario, compras, ventas y cuentas en un solo panel?",
                "¿Cómo dar acceso granular por módulo a cada perfil de usuario (almacén, ventas, administración)?",
                "¿Cómo generar reportes y comprobantes (boleta, factura, ticket) sin depender de procesos manuales?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaBoxes,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Inventario y Compras",
                    desc: "CRUD de artículos con categorías, unidades de medida e imagen; registro de compras por proveedor que actualiza el stock automáticamente al confirmarse el ingreso."
                },
                {
                    icon: FaCashRegister,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Ventas y Cuentas",
                    desc: "Emisión de boleta, factura y ticket de caja, con seguimiento de cuentas por cobrar y por pagar, y dashboard con gráficos de ventas/compras por periodo (Chart.js)."
                },
                {
                    icon: FaUsersCog,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Usuarios, Permisos y Reportes",
                    desc: "Permisos granulares por módulo (escritorio, almacén, compras, ventas, acceso), reportes en PDF (FPDF) y exportación a Excel/CSV vía DataTables Buttons."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (MVC en capas)",
            frontend: { label: "VIEW", text: "Frontend", sub: "AdminLTE + Bootstrap 3 + jQuery" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP 8.x puro (14 endpoints AJAX · 14 modelos)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL / MariaDB", sub: "Consultas preparadas (mysqli)" },
                { icon: FaFileInvoiceDollar, color: "text-green-400", title: "FPDF", sub: "Reportes y tickets imprimibles" }
            ]
        },
        results: [
            { value: "13", title: "Módulos Funcionales", desc: "Desde inventario y compras hasta cuentas por cobrar/pagar y backup." },
            { value: "95%", title: "Madurez en Ventas", desc: "Boleta, factura, ticket y series de comprobante con flujo completo." },
            { value: "~9,430", title: "Líneas de Código PHP", desc: "Código propio medido directamente del repositorio, sin librerías de terceros." }
        ],
        gallery: ["/inventario.webp"]
    },
    1: { // Odontológico
        title: "Gestión Clínica Integral para un",
        highlight: "Consultorio Odontológico",
        badges: ["HealthTech", "Odontograma Digital"],
        description: "Sistema web que centraliza pacientes, doctores, citas, historias clínicas, odontogramas, tratamientos, pagos e ingresos/gastos de un consultorio dental en una sola plataforma.",
        challenge: {
            title: "El Desafío",
            text: "El consultorio dependía de fichas físicas y registros dispersos para gestionar pacientes y tratamientos:",
            points: [
                "Fichas Físicas: Historial clínico y odontogramas en papel, difíciles de consultar entre citas.",
                "Seguimiento Fragmentado: Consultas, tratamientos y pagos registrados sin relación entre sí.",
                "Control Financiero Débil: Sin visibilidad clara de saldos pactados, pagos e ingresos por paciente."
            ],
            questions: [
                "¿Cómo centralizar historia clínica, odontograma y tratamientos de cada paciente?",
                "¿Cómo dar seguimiento al ciclo completo cita → consulta → tratamiento → pago?",
                "¿Cómo controlar montos pactados, saldos e ingresos/gastos del consultorio?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaTooth,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Odontograma Digital",
                    desc: "Manejo gráfico e interactivo de piezas dentales vía AJAX, con simbología, diagnóstico inicial y diagnóstico final por paciente."
                },
                {
                    icon: FaCalendarCheck,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Citas, Consultas e Historia Clínica",
                    desc: "Programación de citas por médico y paciente, registro de diagnóstico presuntivo/definitivo, antecedentes, signos, síntomas y seguimiento clínico (FUA)."
                },
                {
                    icon: FaFileInvoiceDollar,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Tratamientos, Pagos y Reportes",
                    desc: "Catálogo de tratamientos y tarifas por especialidad, control de montos pactados, saldos e ingresos/gastos, con generación de boletas, vouchers y comprobantes en PDF (mPDF/FPDI)."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (3 Capas)",
            frontend: { label: "VIEW", text: "Frontend", sub: "Bootstrap/AdminLTE + jQuery + DataTables" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP nativo (controlador/ + modelo/)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL / MariaDB", sub: "Pacientes, citas, historias y pagos" },
                { icon: FaFileInvoiceDollar, color: "text-green-400", title: "mPDF / FPDI", sub: "Boletas, vouchers y comprobantes" }
            ]
        },
        results: [
            { value: "80%", title: "Menos Dependencia de Papel", desc: "Datos clínicos y administrativos disponibles desde la plataforma." },
            { value: "70%", title: "Más Rapidez en Historiales", desc: "Acceso digital inmediato a antecedentes, diagnósticos y controles." },
            { value: "65%", title: "Más Control Financiero", desc: "Saldos, montos pactados y pagos registrados por paciente." }
        ],
        gallery: ["/odontologia.webp"]
    },
    3: { // SISRECUPEROS
        title: "Conciliación de Recuperos Médicos con",
        highlight: "Obras Sociales",
        badges: ["HealthTech", "MVC + PDO"],
        description: "Sistema web de gestión de recuperos médicos que administra pacientes, obras sociales, prácticas y facturación, vinculando cada práctica realizada con su paciente y su factura correspondiente.",
        challenge: {
            title: "El Desafío",
            text: "La gestión de recuperos médicos dependía de archivos físicos y planillas dispersas:",
            points: [
                "Historiales en Papel: Búsqueda de información de pacientes en archivo físico.",
                "Carga sin Validación: Prácticas y facturación registradas manualmente, propensas a errores y duplicados.",
                "Conciliación Manual: Cruce manual de planillas para verificar facturas contra obras sociales."
            ],
            questions: [
                "¿Cómo centralizar pacientes, prácticas y facturación en una sola base de datos?",
                "¿Cómo vincular directamente cada práctica con su paciente y su factura?",
                "¿Cómo dar acceso digital inmediato a archivos adjuntos (historias clínicas, recetas)?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaIdCard,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Pacientes y Obras Sociales",
                    desc: "Alta, edición y búsqueda centralizada de pacientes, con validación de datos para evitar registros duplicados, y gestión de obras sociales y planes."
                },
                {
                    icon: FaFileAlt,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Prácticas con Archivos Adjuntos",
                    desc: "Catálogo de prácticas médicas asignadas a cada paciente, con carga de archivos PDF (historias clínicas, recetas) accesibles digitalmente en segundos."
                },
                {
                    icon: FaFileInvoiceDollar,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Facturación Vinculada",
                    desc: "Emisión y archivo de facturas vinculadas directamente a paciente y práctica, agilizando la conciliación con cada obra social."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (MVC + PDO)",
            frontend: { label: "VIEW", text: "Frontend", sub: "Vistas PHP por módulo" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP nativo (controller/ por módulo)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL (PDO)", sub: "Pacientes, prácticas y facturas" },
                { icon: FaFileAlt, color: "text-green-400", title: "Archivos Adjuntos", sub: "PDFs de prácticas y fotos de pacientes" }
            ]
        },
        results: [
            { value: "70%", title: "Menos Tiempo de Búsqueda", desc: "Consulta centralizada de historiales en BD frente al archivo físico." },
            { value: "90%", title: "Acceso Más Rápido a Adjuntos", desc: "Historias clínicas y recetas en PDF disponibles en segundos." },
            { value: "40%", title: "Menos Tiempo de Conciliación", desc: "Vinculación directa paciente-práctica-factura frente al cruce manual de planillas." }
        ],
        gallery: ["/recuperos.webp"]
    },
    5: { // Saneamiento de Títulos
        title: "Digitalizando el Seguimiento de Expedientes en",
        highlight: "INCOCAT Abancay",
        badges: ["Gestoría", "Tramitología"],
        description: "Sistema web de administración interna para una empresa de gestoría/tramitología, con seguimiento de clientes, expedientes, pagos, ingresos/gastos, indicadores y reuniones, reemplazando un flujo que antes se gestionaba en papel y hojas de cálculo.",
        challenge: {
            title: "El Desafío",
            text: "La operación diaria de la gestoría dependía de papel y hojas de cálculo dispersas:",
            points: [
                "Expedientes en Papel: Búsqueda y consulta de expedientes sin un sistema centralizado.",
                "Sin Alertas de Atraso: Expedientes atrasados se detectaban tarde, sin notificación automática.",
                "Reportes Manuales: Generación de informes y control financiero hecho a mano por cada expediente."
            ],
            questions: [
                "¿Cómo centralizar clientes, expedientes y pagos por distrito/provincia/región?",
                "¿Cómo detectar y notificar automáticamente expedientes atrasados?",
                "¿Cómo automatizar la generación de reportes en PDF y el control de indicadores?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaFileAlt,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Expedientes y Ubigeo Dinámico",
                    desc: "Registro, búsqueda y filtros de expedientes por fecha/estado/distrito/provincia, con dependencias en cascada de región-provincia-distrito y consulta de DNI por AJAX para autocompletar datos del cliente."
                },
                {
                    icon: FaClock,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Notificaciones Automáticas (Cron)",
                    desc: "Tareas programadas que alertan expedientes atrasados y envían comunicados por correo (PHPMailer), evitando que un caso se pierda de vista."
                },
                {
                    icon: FaChartLine,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Indicadores y Reportes PDF",
                    desc: "Panel con totales de expedientes (en trámite, en proceso, observados, finalizados), clientes, reuniones, ingresos y gastos, con reportes generados automáticamente en PDF (mPDF)."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (MVC)",
            frontend: { label: "VIEW", text: "Frontend", sub: "AdminLTE + DataTables + AJAX" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP nativo (PDO/MySQLi)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL / MariaDB", sub: "Clientes, expedientes y pagos" },
                { icon: FaEnvelope, color: "text-green-400", title: "PHPMailer + mPDF", sub: "Notificaciones y reportes PDF" }
            ]
        },
        results: [
            { value: "70%", title: "Menos Tiempo de Búsqueda", desc: "Consulta de expedientes centralizada frente al archivo físico." },
            { value: "80%", title: "Menos Expedientes Atrasados", desc: "Detección sin notificar a tiempo, gracias a las alertas automáticas por cron." },
            { value: "90%", title: "Menos Tiempo en Reportes", desc: "Generación de PDF automática frente a la elaboración manual de informes." }
        ],
        gallery: ["/saneamiento_titulos.webp"]
    },
    7: { // Grifo Grau
        title: "Cuadre de Caja en Minutos para una",
        highlight: "Estación de Servicio",
        badges: ["Retail", "Combustibles"],
        description: "Sistema web completo para la administración de un grifo: turnos DÍA/NOCHE con lectura automática de 12 surtidores, ventas con 6 métodos de pago, créditos a clientes y reportes gerenciales en tiempo real.",
        challenge: {
            title: "El Desafío",
            text: "El grifo registraba turnos, ventas y créditos en papel, reconstruyendo la información recién a fin de mes:",
            points: [
                "Cuadre de Caja Lento: 45-60 min calculando galones y caja manualmente al cerrar cada turno.",
                "Errores de Cuadre Frecuentes: Sumas manuales por método de pago propensas a error.",
                "Créditos sin Control: Revisión manual de cuadernos para saber qué clientes tenían deuda vencida."
            ],
            questions: [
                "¿Cómo automatizar la lectura de los 12 surtidores y el cálculo del cuadre de caja por turno?",
                "¿Cómo controlar créditos a clientes con alertas de vencimiento y un ranking de deudores?",
                "¿Cómo dar visibilidad diaria de ventas, combustibles y desempeño por grifero sin esperar a fin de mes?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaGasPump,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Turnos y Surtidores Automatizados",
                    desc: "Apertura/cierre de turno con lectura automática de 12 surtidores (2 máquinas), cálculo de galones vendidos por combustible y validación de faltante/sobrante en tiempo real."
                },
                {
                    icon: FaCashRegister,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Ventas y Créditos a Clientes",
                    desc: "Registro de ventas con 6 métodos de pago (YAPE, BCP, VISA, efectivo, etc.), créditos con vale y vencimiento, historial de pagos, Top 10 deudores y consulta de DNI/RUC en tiempo real."
                },
                {
                    icon: FaChartLine,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Dashboard y Reportes Gerenciales",
                    desc: "4 gráficos (Chart.js) con ventas por combustible, comparativo DÍA vs NOCHE y métodos de pago, más exportación de reportes a PDF (mPDF) y Excel con un clic."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (MVC)",
            frontend: { label: "VIEW", text: "Frontend", sub: "AdminLTE 3 + jQuery AJAX (sin recargas)" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP + PDO (100+ controladores)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL / MariaDB", sub: "Turnos, surtidores y créditos" },
                { icon: FaDocker, color: "text-green-400", title: "Docker Compose", sub: "Despliegue contenerizado" }
            ]
        },
        results: [
            { value: "↓80%", title: "Tiempo de Cierre de Turno", desc: "De 45-60 min de cálculo manual a 8-10 min con lecturas automáticas." },
            { value: "↓90%", title: "Errores de Cuadre", desc: "Validación automática de faltante/sobrante en tiempo real." },
            { value: "↓95%", title: "Tiempo de Reportes", desc: "Exportación a PDF/Excel con un clic frente a 20-30 min armando el reporte a mano." }
        ],
        gallery: ["/grifo.webp"]
    },
    8: { // Grados y Títulos - UTEA
        title: "Del Expediente al Diploma para la",
        highlight: "UTEA",
        badges: ["EdTech", "SUNEDU"],
        description: "Sistema institucional para la Universidad Tecnológica Empresarial de Arequipa (UTEA) que gestiona el ciclo completo de grados y títulos (pregrado y posgrado): registro de expediente, validación documental, emisión de diploma, colación y reporte regulatorio a la SUNEDU.",
        challenge: {
            title: "El Desafío",
            text: "El área de Grados y Títulos gestionaba expedientes y diplomas en papel y hojas de Excel:",
            points: [
                "Registro Lento: 25-30 min por expediente con formularios físicos sin validación.",
                "Diplomas Manuales: 1-2 días elaborando y revisando cada diploma a mano.",
                "Reportes SUNEDU Tardados: Días consolidando datos en Excel para el reporte regulatorio."
            ],
            questions: [
                "¿Cómo centralizar el expediente de pregrado y posgrado, desde el registro hasta el diploma?",
                "¿Cómo validar automáticamente los datos del estudiante (DNI/RUC) y cumplir la normativa MINEDU de autoidentificación étnica?",
                "¿Cómo generar el reporte SUNEDU y los diplomas en minutos en lugar de días?"
            ]
        },
        solution: {
            features: [
                {
                    icon: FaIdCard,
                    color: "text-primary-400",
                    bg: "bg-primary-500/20",
                    title: "Portal Público de Registro",
                    desc: "Los estudiantes registran sus datos, foto y declaración de autoidentificación étnica (normativa MINEDU), con validación automática de DNI/RUC vía API Decolecta y seguimiento en línea del trámite."
                },
                {
                    icon: FaGraduationCap,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    title: "Diplomas, Colación y Repositorio",
                    desc: "Generación de diplomas en PDF (mPDF) con firma digital, programación de ceremonias de colación con notificación por correo (PHPMailer), e integración con el repositorio académico DSpace."
                },
                {
                    icon: FaFileInvoiceDollar,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    title: "Reporte Regulatorio SUNEDU",
                    desc: "Exportación de datos en el formato oficial exigido por la SUNEDU para grados de pregrado y posgrado, con reportes filtrables por facultad, escuela, sede y modalidad."
                }
            ]
        },
        architecture: {
            title: "Arquitectura del Sistema (MVC + Integraciones)",
            frontend: { label: "VIEW", text: "Frontend", sub: "AdminLTE + jQuery + DataTables" },
            backend: { label: "Controller / Model", text: "Backend Logic", sub: "PHP + PDO (Stored Procedures)" },
            services: [
                { icon: FaDatabase, color: "text-yellow-400", title: "MySQL + DSpace", sub: "Expedientes + repositorio académico" },
                { icon: FaFileInvoiceDollar, color: "text-green-400", title: "API Decolecta + SUNEDU", sub: "Validación DNI/RUC + reporte regulatorio" }
            ]
        },
        results: [
            { value: "↓90%", title: "Tiempo de Emisión de Diploma", desc: "De 1-2 días de elaboración manual a minutos con plantilla PDF automatizada." },
            { value: "↓95%", title: "Tiempo de Reporte SUNEDU", desc: "Exportación automática frente a días de consolidación manual en Excel." },
            { value: "100%", title: "Expedientes con Seguimiento Digital", desc: "Portal público de seguimiento en tiempo real, sin visitas presenciales." }
        ],
        gallery: ["/grados_y_titulos.webp"]
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
    const { t } = useLanguage();
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
                        <FaArrowLeft /> {t('case_study.back')}
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
                                <span key={idx} className="inline-block px-4 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400                       text-sm font-medium">
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
                            {t('case_study.solution_title')}
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
                        <h2 className="text-3xl font-bold text-white mb-10 text-center">{t('case_study.results')}</h2>
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

                    {/* Gallery */}
                    {data.gallery && data.gallery.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-10 text-center">{t('case_study.gallery')}</h2>
                            <div className="grid gap-8">
                                {data.gallery.map((src, idx) => (
                                    <img
                                        key={idx}
                                        src={src}
                                        alt={`${data.highlight} - ${idx + 1}`}
                                        className="w-full rounded-2xl border border-white/10 shadow-2xl"
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </motion.div>
    );
};

export default ProjectCaseStudy;
