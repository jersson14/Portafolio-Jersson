import { FaAws, FaGraduationCap, FaChartBar, FaCertificate } from 'react-icons/fa';
import { SiCisco, SiGooglegemini } from 'react-icons/si';

/* Las fechas se escriben en español; en inglés solo cambian estos meses. */
const MONTHS_EN = { Ene: 'Jan', Abr: 'Apr', Ago: 'Aug', Dic: 'Dec' };
export const certDate = (date, lang) =>
  lang === 'en' ? date.replace(/^(Ene|Abr|Ago|Dic)/, (m) => MONTHS_EN[m]) : date;

/* AWS primero; el resto, del más reciente al más antiguo. Fechas según cada certificado. */
export const certificationsData = [
  {
    id: 1,
    title: {
      es: "AWS Certified Cloud Practitioner",
      en: "AWS Certified Cloud Practitioner"
    },
    issuer: { es: "Amazon Web Services", en: "Amazon Web Services" },
    year: "Feb. 2026",
    validUntil: "2029",
    icon: FaAws,
    color: "#FF9900",
    credentialUrl: null
  },
  {
    id: 2,
    title: {
      es: "Educador Certificado de Gemini",
      en: "Gemini Certified Educator"
    },
    issuer: { es: "Google for Education", en: "Google for Education" },
    year: "Nov. 2026",
    validUntil: "2029",
    icon: SiGooglegemini,
    color: "#4285F4",
    credentialUrl: null
  },
  {
    id: 3,
    title: {
      es: "Conciencia Digital",
      en: "Digital Awareness"
    },
    issuer: { es: "Cisco Networking Academy · Universidad César Vallejo", en: "Cisco Networking Academy · Universidad César Vallejo" },
    year: "Nov. 2026",
    icon: SiCisco,
    color: "#1BA0D7",
    credentialUrl: "https://www.netacad.com/recognitions/verify/3d11bae6-e0f0-40a0-ba84-278591d1b831"
  },
  {
    id: 4,
    title: {
      es: "Introducción a Ciberseguridad",
      en: "Introduction to Cybersecurity"
    },
    issuer: { es: "Cisco Networking Academy · Universidad César Vallejo", en: "Cisco Networking Academy · Universidad César Vallejo" },
    year: "Nov. 2026",
    icon: SiCisco,
    color: "#1BA0D7",
    credentialUrl: "https://www.netacad.com/recognitions/verify/f041c874-9531-4c72-bd5d-a387e24aa598"
  },
  {
    id: 5,
    title: {
      es: "Programa de Especialización en Investigación de Ingeniería de Software",
      en: "Specialization Program in Software Engineering Research"
    },
    issuer: { es: "Universidad Continental", en: "Continental University" },
    year: "Jul. 2026",
    icon: FaGraduationCap,
    color: "#0ea5e9",
    credentialUrl: null
  },
  {
    id: 6,
    title: {
      es: "Programa de Especialización en Gestión de Proyectos de Software",
      en: "Specialization Program in Software Project Management"
    },
    issuer: { es: "Universidad Continental", en: "Continental University" },
    year: "Mar. 2026",
    icon: FaGraduationCap,
    color: "#0ea5e9",
    credentialUrl: null
  },
  {
    id: 7,
    title: {
      es: "AWS Cloud Practitioner Essentials",
      en: "AWS Cloud Practitioner Essentials"
    },
    issuer: { es: "AWS Training & Certification", en: "AWS Training & Certification" },
    year: "Feb. 2026",
    icon: FaAws,
    color: "#FF9900",
    credentialUrl: null
  },
  {
    id: 8,
    title: {
      es: "Programa de Especialización en Desarrollo de Aplicaciones Móviles y Web",
      en: "Specialization Program in Mobile & Web App Development"
    },
    issuer: { es: "Universidad Continental", en: "Continental University" },
    year: "Ene. 2026",
    icon: FaGraduationCap,
    color: "#0ea5e9",
    credentialUrl: null
  },
  {
    id: 9,
    title: {
      es: "Certificado de Excelencia en Desarrollo de Software",
      en: "Certificate of Excellence in Software Development"
    },
    issuer: { es: "INCOCAT S.R.L.", en: "INCOCAT S.R.L." },
    year: "Ene. 2026",
    icon: FaCertificate,
    color: "#10b981",
    credentialUrl: null
  },
  {
    id: 10,
    title: {
      es: "Programa de Especialización en Desarrollo de Software",
      en: "Specialization Program in Software Development"
    },
    issuer: { es: "Universidad Continental", en: "Continental University" },
    year: "Sep. 2025",
    icon: FaGraduationCap,
    color: "#0ea5e9",
    credentialUrl: null
  },
  {
    id: 11,
    title: {
      es: "I Congreso Internacional de Investigación en Ciencia y Tecnología Computacional",
      en: "1st International Congress on Research in Computer Science and Technology"
    },
    issuer: { es: "Universidad Nacional Micaela Bastidas de Apurímac", en: "Universidad Nacional Micaela Bastidas de Apurímac" },
    year: "Ago. 2025",
    icon: FaGraduationCap,
    color: "#22d3ee",
    credentialUrl: null
  },
  {
    id: 12,
    title: {
      es: "Tableau: Visualización de Datos y Storytelling para Negocios",
      en: "Tableau: Data Visualization and Storytelling for Business"
    },
    issuer: { es: "Platzi", en: "Platzi" },
    year: "May. 2024",
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
      { title: { es: "Marketing Digital", en: "Digital Marketing" }, year: "Nov. 2024" },
      { title: { es: "Curso de ChatGPT", en: "ChatGPT Course" }, year: "Sep. 2024" },
      { title: { es: "Análisis y Manipulación de Datos con Python", en: "Data Analysis and Manipulation with Python" }, year: "Jul. 2024" },
      { title: { es: "Manipulación y Transformación de Datos con Pandas y NumPy", en: "Data Manipulation with Pandas and NumPy" }, year: "May. 2024" },
      { title: { es: "Principios de Visualización de Datos para BI", en: "Data Visualization Principles for BI" }, year: "May. 2024" },
      { title: { es: "Ciencia de Datos con Jupyter Notebooks y Anaconda", en: "Data Science with Jupyter Notebooks and Anaconda" }, year: "May. 2024" },
      { title: { es: "Python: Entornos Virtuales y Pip", en: "Python: Virtual Environments and Pip" }, year: "May. 2024" },
      { title: { es: "Git y GitHub Profesional", en: "Professional Git and GitHub" }, year: "Abr. 2024" },
      { title: { es: "Fundamentos de Ingeniería de Software", en: "Software Engineering Fundamentals" }, year: "Abr. 2024" },
      { title: { es: "Introducción a la Terminal y Línea de Comandos", en: "Introduction to Terminal and Command Line" }, year: "Abr. 2024" },
      { title: { es: "Fundamentos de Ingeniería de Datos", en: "Data Engineering Fundamentals" }, year: "Abr. 2024" },
      { title: { es: "Carrera en Data Science e Inteligencia Artificial", en: "Career in Data Science and AI" }, year: "Abr. 2024" },
      { title: { es: "Python: Comprehensions, Funciones y Manejo de Errores", en: "Python: Comprehensions, Functions and Error Handling" }, year: "Mar. 2024" },
      { title: { es: "Fundamentos de Python", en: "Python Fundamentals" }, year: "Mar. 2024" }
    ]
  },
  {
    issuer: "ITEC",
    courses: [
      { title: { es: "Redacción de Documentos Administrativos", en: "Administrative Document Writing" }, year: "Feb. 2024" },
      { title: { es: "Ofimática Nivel Avanzado", en: "Advanced Office Automation" }, year: "Jul. 2021" }
    ]
  },
  {
    issuer: "CENAP Perú",
    courses: [
      { title: { es: "Herramientas de Inteligencia Artificial", en: "Artificial Intelligence Tools" }, year: "Ene. 2024" }
    ]
  },
  {
    issuer: "GEG Corporación",
    courses: [
      { title: { es: "Especialista en Administración de Redes", en: "Network Administration Specialist" }, year: "Sep. 2023" },
      { title: { es: "Administrador de Servidores Windows y Linux", en: "Windows & Linux Server Administrator" }, year: "Sep. 2023" }
    ]
  },
  {
    issuer: "Skill - Centro de Capacitación",
    courses: [
      { title: { es: "Actualización en Microsoft Power BI", en: "Microsoft Power BI Update" }, year: "Dic. 2022" }
    ]
  },
  {
    issuer: "Universidad Tecnológica de los Andes",
    courses: [
      { title: { es: "Seminario Internacional: Inteligencia Artificial y Ciberseguridad", en: "International Seminar: Artificial Intelligence and Cybersecurity" }, year: "Jul. 2025" },
      { title: { es: "Inglés Básico", en: "Basic English" }, year: "Ene. 2022" }
    ]
  }
];

export const languagesData = [
  { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" }, percent: 100 },
  { name: { es: "Inglés", en: "English" }, level: { es: "Intermedio (B1)", en: "Intermediate (B1)" }, percent: 50 },
  { name: { es: "Italiano", en: "Italian" }, level: { es: "Básico", en: "Basic" }, percent: 15 }
];
