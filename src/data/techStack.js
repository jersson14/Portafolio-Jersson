import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaBootstrap, 
  FaPhp, FaNodeJs, FaPython, FaJava,
  FaDatabase, FaAws, FaDocker, FaGitAlt, FaGithub, FaCloud, FaChartBar, FaMicrosoft
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiMysql, SiPostgresql, SiMongodb, 
  SiTableau, SiMariadb, SiSqlite, SiTypescript
} from 'react-icons/si';

export const techStackData = {
  frontend: {
    title: "Frontend",
    technologies: [
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Vue.js", icon: FaVuejs, color: "#4FC08D" },
      { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ]
  },
  backend: {
    title: "Backend",
    technologies: [
      { name: "PHP", icon: FaPhp, color: "#777BB4" },
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Python", icon: FaPython, color: "#3776AB" },
      { name: "Java", icon: FaJava, color: "#007396" },
    ]
  },
  database: {
    title: "Bases de Datos",
    technologies: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MariaDB", icon: SiMariadb, color: "#C0765A" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
    ]
  },
  cloud: {
    title: "Cloud & DevOps",
    technologies: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Azure", icon: FaCloud, color: "#0078D4" },
      { name: "Docker", icon: FaDocker, color: "#2496ED" },
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
    ]
  },
  data: {
    title: "Data & BI",
    technologies: [
      { name: "Power BI", icon: FaChartBar, color: "#F2C811" },
      { name: "Tableau", icon: SiTableau, color: "#E97627" },
      { name: "SQL", icon: FaDatabase, color: "#CC2927" },
    ]
  },
  ai: {
    title: "IA & Automatización",
    technologies: [
      { name: "Python", icon: FaPython, color: "#3776AB" },
      { name: "Power Automate", icon: FaMicrosoft, color: "#0066FF" },
    ]
  }
};
