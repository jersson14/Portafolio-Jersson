# 💼 Portafolio Profesional - Jersson Jorge Corilla Miranda

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.26.2-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

Portafolio web profesional y moderno desarrollado con React, Vite y Tailwind CSS. Diseñado para destacar proyectos, experiencia y habilidades técnicas con una interfaz premium, animaciones fluidas y diseño completamente responsivo.

---

## 🌟 Características Principales

### ✨ Diseño y UX
- **Diseño Premium**: Interfaz moderna con glassmorphism, gradientes vibrantes y efectos visuales sofisticados
- **Totalmente Responsivo**: Optimizado para desktop, tablet y móvil con breakpoints adaptativos
- **Animaciones Fluidas**: Transiciones y efectos implementados con Framer Motion
- **Modo Oscuro**: Esquema de colores oscuro profesional con acentos en azul y verde

### 🎯 Secciones Implementadas
1. **Hero** - Presentación principal con CTA destacados
2. **Sobre Mí** - Perfil profesional y propuesta de valor
3. **Experiencia** - Timeline de experiencia laboral
4. **Proyectos** - Galería de proyectos con efectos hover interactivos
5. **Servicios** - Servicios profesionales ofrecidos
6. **Stack Tecnológico** - Tecnologías y herramientas dominadas
7. **Certificaciones** - Certificaciones y cursos completados
8. **Contacto** - Formulario y enlaces a redes sociales
9. **Footer** - Información adicional y enlaces

### 🚀 Funcionalidades Destacadas

#### Proyectos con Efectos Hover
- **Desktop**: Overlay con descripción al pasar el mouse
- **Móvil**: Descripciones siempre visibles para mejor UX
- **Imágenes**: Efecto zoom suave (scale 110%)
- **Badges**: Categoría y estado (privado/público)

#### Descarga de CV
- **Header**: Botón verde prominente siempre visible
- **Hero**: CTA principal con gradiente destacado
- **Descarga Directa**: Archivo PDF con nombre personalizado

#### Optimización Móvil
- **Navegación Responsive**: Menú hamburguesa en móvil
- **Contenido Adaptativo**: Layout optimizado para pantallas pequeñas
- **Touch-Friendly**: Botones y elementos con tamaño adecuado para táctil

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.0** - Biblioteca de UI con hooks modernos
- **Vite 7.2.4** - Build tool ultrarrápido con HMR
- **Tailwind CSS 3.4.19** - Framework CSS utility-first
- **Framer Motion 12.26.2** - Biblioteca de animaciones

### Herramientas y Librerías
- **React Icons 5.5.0** - Iconos vectoriales
- **PostCSS 8.5.6** - Procesador CSS
- **Autoprefixer 10.4.23** - Prefijos CSS automáticos
- **ESLint 9.39.1** - Linter para código limpio

---

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18.x o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jersson14/Portafolio-Jersson.git

# Navegar al directorio
cd Portafolio-Jersson

# Instalar dependencias
npm install
```

### Comandos Disponibles

```bash
# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

---

## 📁 Estructura del Proyecto

```
Portafolio-Jersson/
├── public/                      # Archivos estáticos
│   ├── about-bg.png            # Imagen de fondo sección About
│   ├── cv_jersson.pdf          # CV en formato PDF
│   ├── hero-image.png          # Imagen principal Hero
│   ├── profile.png             # Foto de perfil
│   ├── colegio.png             # Proyecto: Sistema Educativo
│   ├── facturacion.png         # Proyecto: Facturación
│   ├── grados_y_titulos.png    # Proyecto: Diplomas
│   ├── grifo.png               # Proyecto: Gestión de Grifos
│   ├── odontologia.png         # Proyecto: Historias Clínicas
│   ├── recuperos.png           # Proyecto: Recuperos
│   ├── saneamiento_titulos.png # Proyecto: Saneamiento
│   └── tramite_documentario.png # Proyecto: Trámite Documentario
│
├── src/
│   ├── components/             # Componentes React
│   │   ├── About.jsx           # Sección Sobre Mí
│   │   ├── AnimatedBackground.jsx # Fondo animado
│   │   ├── Certifications.jsx  # Certificaciones
│   │   ├── Contact.jsx         # Formulario de contacto
│   │   ├── Experience.jsx      # Experiencia laboral
│   │   ├── Footer.jsx          # Pie de página
│   │   ├── Hero.jsx            # Sección principal
│   │   ├── Projects.jsx        # Galería de proyectos
│   │   ├── Services.jsx        # Servicios ofrecidos
│   │   └── TechStack.jsx       # Stack tecnológico
│   │
│   ├── data/                   # Datos del portafolio
│   │   ├── certifications.js   # Lista de certificaciones
│   │   ├── experience.js       # Experiencia laboral
│   │   ├── projects.js         # Proyectos destacados
│   │   ├── services.js         # Servicios profesionales
│   │   └── techStack.js        # Tecnologías dominadas
│   │
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos del App
│   ├── index.css               # Estilos globales y Tailwind
│   └── main.jsx                # Punto de entrada
│
├── .gitignore                  # Archivos ignorados por Git
├── eslint.config.js            # Configuración ESLint
├── index.html                  # HTML principal
├── package.json                # Dependencias y scripts
├── postcss.config.js           # Configuración PostCSS
├── tailwind.config.js          # Configuración Tailwind
├── vite.config.js              # Configuración Vite
└── README.md                   # Este archivo
```

---

## 🎨 Personalización

### Modificar Información Personal

#### 1. Datos de Proyectos
Edita `src/data/projects.js`:
```javascript
export const projectsData = [
  {
    id: 1,
    title: "Tu Proyecto",
    description: "Descripción del proyecto",
    image: "/tu-imagen.png",
    technologies: ["React", "Node.js"],
    category: "Full Stack",
    status: "public", // o "private"
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com/usuario/repo"
  }
];
```

#### 2. Experiencia Laboral
Edita `src/data/experience.js`:
```javascript
export const experienceData = [
  {
    id: 1,
    title: "Tu Puesto",
    company: "Empresa",
    period: "2020 - Presente",
    description: "Descripción del rol",
    achievements: ["Logro 1", "Logro 2"]
  }
];
```

#### 3. Stack Tecnológico
Edita `src/data/techStack.js` para agregar/modificar tecnologías.

#### 4. Certificaciones
Edita `src/data/certifications.js` para actualizar certificaciones.

### Cambiar Colores del Tema

Edita `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        400: '#60A5FA', // Azul claro
        500: '#3B82F6', // Azul principal
        600: '#2563EB', // Azul oscuro
      },
      dark: {
        950: '#0A0E1A', // Fondo principal
        900: '#0F172A', // Fondo secundario
      }
    }
  }
}
```

### Reemplazar CV

1. Coloca tu CV en `public/cv_jersson.pdf`
2. O actualiza la ruta en `src/App.jsx` y `src/components/Hero.jsx`

---

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Netlify

```bash
# Build
npm run build

# Desplegar carpeta dist/
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Agregar scripts en package.json
"homepage": "https://jersson14.github.io/Portafolio-Jersson",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Desplegar
npm run deploy
```

---

## 📱 Responsive Breakpoints

```css
/* Móvil: < 768px */
/* Tablet: 768px - 1023px */
/* Desktop: ≥ 1024px */
```

El diseño utiliza los breakpoints estándar de Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 🎯 Optimizaciones Implementadas

### Performance
- ✅ Lazy loading de imágenes
- ✅ Code splitting automático (Vite)
- ✅ Minificación de CSS y JS
- ✅ Compresión de assets

### SEO
- ✅ Meta tags optimizados
- ✅ Títulos descriptivos
- ✅ Estructura semántica HTML5
- ✅ IDs únicos para navegación

### Accesibilidad
- ✅ Contraste de colores adecuado
- ✅ Navegación por teclado
- ✅ Atributos ARIA donde necesario
- ✅ Textos alternativos en imágenes

---

## 🐛 Solución de Problemas

### El servidor de desarrollo no inicia
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Errores de Tailwind
```bash
# Verificar configuración de PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Build falla
```bash
# Verificar versión de Node
node --version  # Debe ser ≥ 18.x

# Limpiar y rebuildar
npm run lint
npm run build
```

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👤 Autor

**Jersson Jorge Corilla Miranda**

- 🌐 Portfolio: [https://jersson14.github.io/Portafolio-Jersson](https://jersson14.github.io/Portafolio-Jersson)
- 💼 LinkedIn: [linkedin.com/in/jersson-corilla](https://linkedin.com/in/jersson-corilla)
- 🐙 GitHub: [@jersson14](https://github.com/jersson14)
- 📧 Email: jersson.corilla@example.com

---

## 🙏 Agradecimientos

- **React Team** - Por la increíble biblioteca
- **Vite Team** - Por la herramienta de build ultrarrápida
- **Tailwind Labs** - Por el framework CSS
- **Framer** - Por la biblioteca de animaciones

---

## 📝 Changelog

### v1.0.0 (2026-01-17)
- ✅ Implementación inicial del portafolio
- ✅ 8 proyectos destacados con imágenes
- ✅ Efectos hover interactivos en desktop
- ✅ Vista móvil optimizada con descripciones visibles
- ✅ Botones de descarga de CV en header y hero
- ✅ Diseño completamente responsivo
- ✅ Animaciones con Framer Motion
- ✅ Logo actualizado a "JCM"

---

<div align="center">
  <p>Desarrollado con ❤️ por Jersson Corilla</p>
  <p>⭐ Si te gusta este proyecto, dale una estrella en GitHub!</p>
</div>
