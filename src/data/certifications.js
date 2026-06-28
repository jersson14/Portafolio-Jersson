import { FaAws, FaGraduationCap, FaShieldAlt, FaChartBar, FaCertificate } from 'react-icons/fa';

export const certificationsData = [
  {
    id: 1,
    title: {
      es: "AWS Certified Cloud Practitioner",
      en: "AWS Certified Cloud Practitioner"
    },
    issuer: { es: "Amazon Web Services", en: "Amazon Web Services" },
    year: "2026",
    icon: FaAws,
    color: "#FF9900",
    credentialUrl: null
  },
  {
    id: 2,
    title: {
      es: "Programa de Especialización en Gestión de Proyectos de Software",
      en: "Specialization Program in Software Project Management"
    },
    issuer: { es: "Universidad Continental", en: "Continental University" },
    year: "2026",
    icon: FaGraduationCap,
    color: "#0ea5e9",
    credentialUrl: null
  },
  {
    id: 3,
    title: {
      es: "Programa de Especialización en Desarrollo de Aplicaciones Móviles y Web",
      en: "Specialization Program in Mobile & Web App Development"
    },
    issuer: { es: "Universidad Continental", en: "Continental University" },
    year: "2026",
    icon: FaGraduationCap,
    color: "#0ea5e9",
    credentialUrl: null
  },
  {
    id: 4,
    title: {
      es: "Certificado de Excelencia en Desarrollo de Software",
      en: "Certificate of Excellence in Software Development"
    },
    issuer: { es: "INCOCAT S.R.L.", en: "INCOCAT S.R.L." },
    year: "2026",
    icon: FaCertificate,
    color: "#10b981",
    credentialUrl: null
  },
  {
    id: 5,
    title: {
      es: "AWS Cloud Practitioner Essentials",
      en: "AWS Cloud Practitioner Essentials"
    },
    issuer: { es: "Amazon Web Services", en: "Amazon Web Services" },
    year: "Nov. 2025",
    icon: FaAws,
    color: "#FF9900",
    credentialUrl: null
  },
  {
    id: 6,
    title: {
      es: "Programa de Especialización en Desarrollo de Software",
      en: "Specialization Program in Software Development"
    },
    issuer: { es: "Universidad Continental", en: "Continental University" },
    year: "Ago. 2025",
    icon: FaGraduationCap,
    color: "#0ea5e9",
    credentialUrl: null
  },
  {
    id: 7,
    title: {
      es: "I Congreso Internacional de Investigación en Ciencia y Tecnología Computacional",
      en: "1st International Congress on Research in Computer Science and Technology"
    },
    issuer: { es: "Universidad Nacional Micaela Bastidas de Apurímac", en: "Universidad Nacional Micaela Bastidas de Apurímac" },
    year: "Jul. 2025",
    icon: FaGraduationCap,
    color: "#22d3ee",
    credentialUrl: null
  },
  {
    id: 8,
    title: {
      es: "Inteligencia Artificial y Ciberseguridad",
      en: "Artificial Intelligence and Cybersecurity"
    },
    issuer: { es: "Universidad Tecnológica de los Andes", en: "Universidad Tecnológica de los Andes" },
    year: "Jul. 2025",
    icon: FaShieldAlt,
    color: "#8b5cf6",
    credentialUrl: null
  },
  {
    id: 9,
    title: {
      es: "Tableau: Visualización de Datos y Storytelling para Negocios",
      en: "Tableau: Data Visualization and Storytelling for Business"
    },
    issuer: { es: "Platzi", en: "Platzi" },
    year: "Abr. 2024",
    icon: FaChartBar,
    color: "#F2C811",
    credentialUrl: null
  }
];

/* Cursos adicionales — formato compacto (chips), agrupados por institución
   y ordenados internamente del más reciente al más antiguo */
export const moreCertifications = [
  {
    issuer: "Platzi",
    courses: [
      { title: { es: "Ciencia de Datos con Jupyter Notebooks y Anaconda", en: "Data Science with Jupyter Notebooks and Anaconda" }, year: "Abr. 2025" },
      { title: { es: "Marketing Digital", en: "Digital Marketing" }, year: "Nov. 2024" },
      { title: { es: "Curso de ChatGPT", en: "ChatGPT Course" }, year: "Ago. 2024" },
      { title: { es: "Análisis y Manipulación de Datos con Python", en: "Data Analysis and Manipulation with Python" }, year: "Jun. 2024" },
      { title: { es: "Manipulación y Transformación de Datos con Pandas y NumPy", en: "Data Manipulation with Pandas and NumPy" }, year: "Abr. 2024" },
      { title: { es: "Principios de Visualización de Datos para BI", en: "Data Visualization Principles for BI" }, year: "Abr. 2024" },
      { title: { es: "Python: Entornos Virtuales y Pip", en: "Python: Virtual Environments and Pip" }, year: "Abr. 2024" },
      { title: { es: "Git y GitHub Profesional", en: "Professional Git and GitHub" }, year: "Mar. 2024" },
      { title: { es: "Fundamentos de Ingeniería de Software", en: "Software Engineering Fundamentals" }, year: "Mar. 2024" },
      { title: { es: "Introducción a la Terminal y Línea de Comandos", en: "Introduction to Terminal and Command Line" }, year: "Mar. 2024" },
      { title: { es: "Fundamentos de Ingeniería de Datos", en: "Data Engineering Fundamentals" }, year: "Mar. 2024" },
      { title: { es: "Carrera en Data Science e Inteligencia Artificial", en: "Career in Data Science and AI" }, year: "Mar. 2024" },
      { title: { es: "Python: Comprehensions, Funciones y Manejo de Errores", en: "Python: Comprehensions, Functions and Error Handling" }, year: "Feb. 2024" },
      { title: { es: "Fundamentos de Python", en: "Python Fundamentals" }, year: "Feb. 2024" }
    ]
  },
  {
    issuer: "ITEC",
    courses: [
      { title: { es: "Redacción de Documentos Administrativos", en: "Administrative Document Writing" }, year: "Ene. 2024" },
      { title: { es: "Ofimática Nivel Avanzado", en: "Advanced Office Automation" }, year: "Jun. 2021" }
    ]
  },
  {
    issuer: "CENAP Perú",
    courses: [
      { title: { es: "Herramientas de Inteligencia Artificial", en: "Artificial Intelligence Tools" }, year: "2024" }
    ]
  },
  {
    issuer: "GEG Corporación",
    courses: [
      { title: { es: "Especialista en Administración de Redes", en: "Network Administration Specialist" }, year: "Ago. 2023" },
      { title: { es: "Administrador de Servidores Windows y Linux", en: "Windows & Linux Server Administrator" }, year: "Ago. 2023" }
    ]
  },
  {
    issuer: "Skill - Centro de Capacitación",
    courses: [
      { title: { es: "Actualización en Microsoft Power BI", en: "Microsoft Power BI Update" }, year: "Nov. 2022" }
    ]
  },
  {
    issuer: "Universidad Tecnológica de los Andes",
    courses: [
      { title: { es: "Inglés Básico", en: "Basic English" }, year: "2022" }
    ]
  }
];

export const languagesData = [
  { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" }, percent: 100 },
  { name: { es: "Inglés", en: "English" }, level: { es: "Básico", en: "Basic" }, percent: 20 },
  { name: { es: "Italiano", en: "Italian" }, level: { es: "Básico", en: "Basic" }, percent: 15 }
];
