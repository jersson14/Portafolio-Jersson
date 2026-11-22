export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Mí',
      tech_stack: 'Tecnologías',
      projects: 'Proyectos',
      experience: 'Experiencia',
      certifications: 'Certificaciones',
      services: 'Servicios',
      contact: 'Contacto'
    },
    hero: {
      greeting: '👋 Hola, bienvenido a mi portafolio',
      role: 'Cloud Solutions Architect (AWS/Azure) | AI & RAG Engineering | Full Stack & Data Analytics',
      description_prefix: 'Ingeniero de Sistemas certificado como',
      description_highlight_1: 'AWS Cloud Practitioner',
      description_connector: 'con',
      description_highlight_2: 'Maestría en Ingeniería de Software,',
      description_suffix: 'especializado en Arquitectura Cloud (AWS/Azure), Ingeniería de Datos e Inteligencia Artificial Aplicada (RAG). Enfocado en la automatización de flujos complejos, la optimización de infraestructura en la nube y el diseño de pipelines de datos para la toma de decisiones estratégicas.',
      buttons: {
        projects: 'Ver Proyectos',
        contact: 'Contactar',
        cv: 'Descargar CV'
      }
    },
    about: {
      title: 'Sobre Mí',
      subtitle: 'Ingeniero de Software con pasión por crear soluciones tecnológicas de alto impacto',
      card_title: 'Ingeniero de Sistemas e Informática',
      description_1: 'Ingeniero de Sistemas certificado como AWS Cloud Practitioner con Maestría en Ingeniería de Software, especializado en Arquitectura Cloud (AWS/Azure), Ingeniería de Datos e Inteligencia Artificial Aplicada (RAG). Mi enfoque está en la automatización de flujos complejos, optimización de infraestructura en la nube y el diseño de pipelines de datos para la toma de decisiones estratégicas.',
      description_2: 'Como Fundador y Arquitecto Principal de la plataforma SaaS DEREJ-IA, lidero el despliegue de soluciones en LegalTech basadas en modelos generativos y Web Scraping. Cuento con trayectoria diseñando arquitecturas elásticas en la nube y co-diseñando sistemas de gestión institucional reconocidos formalmente por optimizar procesos administrativos.',
      specialties: {
        title: 'Áreas de Especialización',
        items: [
          { label: 'Cloud & DevOps', desc: 'AWS, Azure, Docker, Arquitecturas Elásticas, CI/CD.' },
          { label: 'Data Engineering & IA', desc: 'Inteligencia Artificial (RAG), Web Scraping, Pipelines ETL, Power BI, QuickSight.' },
          { label: 'Core Development', desc: 'Python, Node.js, PHP, TypeScript, SQL Server, PostgreSQL, MySQL y NoSQL.' },
          { label: 'AI-Assisted Development', desc: 'Dominio amplio del ecosistema de herramientas de IA generativa, incluyendo Claude Code, OpenAI Codex, Gemini, Antigravity y otros agentes de IA aplicados a flujos de desarrollo, prototipado y automatización de código. Manejo de MCP (Model Context Protocol), Skills y orquestación de agentes para integrar IA en sistemas y flujos de trabajo productivos.' }
        ]
      },
      mentorship_title: 'Docencia y Mentoria',
      mentorship_desc: 'Docente e instructor en tecnologías de programación, Python, Power BI y SQL, compartiendo conocimiento y formando a la próxima generación de profesionales tech.',
      skills: {
        fullstack: {
          title: 'Full Stack Development',
          desc: 'Desarrollo completo de aplicaciones web con tecnologías modernas (React, Node, Python)'
        },
        cloud: {
          title: 'Cloud Architecture',
          desc: 'Diseño e implementación de infraestructura escalable y serverless en AWS y Azure'
        },
        data: {
          title: 'Data & AI Solutions',
          desc: 'Análisis de datos avanzado, Power BI y automatización con Inteligencia Artificial'
        }
      }
    },
    projects: {
      title: 'Mis Proyectos',
      subtitle: 'Soluciones empresariales desarrolladas con tecnologías modernas y mejores prácticas',
      top_title: 'Proyecto Principal',
      featured_title: 'Proyectos Destacados',
      featured_subtitle: 'Soluciones innovadoras con tecnologías de vanguardia',
      other_title: 'Otros Proyectos',
      other_subtitle: 'Más soluciones empresariales desarrolladas',
      badge_featured: 'DESTACADO',
      buttons: {
        case_study: 'Ver Caso de Estudio',
        demo: 'Ver Demo',
        demo_wip: 'Demo en preparación',
        private: 'Privado',
        github: 'GitHub',
        coming_soon: 'Próximamente'
      },
      note: 'Cada proyecto fue desarrollado con código limpio, arquitectura escalable y mejores prácticas de la industria.'
    },
    live: {
      title: 'Sistemas con demo abierta',
      subtitle: 'Seis productos que puedes abrir ahora mismo. Elige uno, mira sus pantallas reales y entra a probarlo.',
      online: 'En línea',
      enter: 'Entrar a la demo',
      docs: 'Documentación',
      shot: 'Captura',
      trial: 'Los usuarios de prueba aparecen en la pantalla de ingreso.',
      note: 'Cifras y tiempos referenciales, tomados de la documentación de cada sistema.'
    },
    voice: {
      start: 'Hablar con el agente',
      talk: 'Hablar',
      end: 'Terminar',
      stop: 'Detener',
      listen: 'Escuchar',
      mute: 'Silenciar la voz',
      unmute: 'Activar la voz',
      denied: 'No pude usar el micrófono. Actívalo en los permisos del navegador, o escríbeme por aquí.',
      failed: 'No pude escucharte esta vez. Inténtalo de nuevo o escríbeme por aquí.',
      listening: 'Te escucho',
      transcribing: 'Entendiendo',
      thinking: 'Pensando',
      speaking: 'Hablando',
      paused: 'En pausa',
      hint_listening: 'Habla con naturalidad. Termino cuando haces una pausa.',
      hint_transcribing: 'Un momento.',
      hint_thinking: 'Reviso los proyectos de Jersson.',
      hint_speaking: 'Tócame para interrumpir.',
      hint_paused: 'El micrófono está apagado.',
      tap_listening: 'Terminé de hablar',
      tap_transcribing: 'Entendiendo',
      tap_thinking: 'Pensando',
      tap_speaking: 'Interrumpir y hablar',
      tap_paused: 'Hablar'
    },
    agent: {
      title: 'Agente JCM',
      subtitle: 'documentos · en tu navegador',
      subtitle_llm: 'documentos',
      llm_down: 'sin respuesta, uso búsqueda local',
      privacy: 'Texto y voz generados con IA (OpenAI). No compartas datos sensibles.',
      quota: 'preguntas',
      robot_hide: 'Ocultar el robot',
      robot_show: 'Mostrar el robot',
      launcher: 'Pregúntale a mi agente',
      open: 'Abrir el agente',
      close: 'Cerrar',
      reset: 'Nueva conversación',
      send: 'Enviar',
      thinking: 'Buscando',
      welcome: 'Soy el agente del Ing. Jersson. ¿En qué te puedo ayudar?',
      welcome_sub: 'Háblame o escríbeme: te recomiendo un sistema para tu negocio, comparo una vacante con su perfil o te guío por la página.',
      placeholder: 'Escribe tu pregunta o pega una vacante',
      demo: 'Demo',
      case: 'Caso de estudio',
      match_caption: 'requisitos con respaldo',
      match_missing: 'No figuran en el portafolio:',
      pause: 'Pausar',
      resume: 'Continuar',
      next: 'Siguiente',
      hero_placeholder: '¿Tienes un negocio o una vacante? Cuéntame'
    },
    experience: {
      title: 'Experiencia Profesional',
      subtitle: 'Mi trayectoria en el desarrollo de software y tecnología',
      current_badge: 'Actual'
    },
    certifications: {
        title: 'Certificaciones',
        subtitle: 'Validación de conocimientos y competencias técnicas',
        languages_title: 'Idiomas',
        more_title: 'Más Cursos y Certificaciones',
        view_credential: 'Ver credencial',
        valid_until: 'Vigente hasta',
        badge: 'Certificado'
    },
    services: {
        title: 'Mis Servicios',
        subtitle: 'Soluciones tecnológicas a medida para potenciar tu negocio'
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
      form_title: 'Envíame un mensaje',
      labels: {
        name: 'Nombre completo',
        email: 'Email',
        message: 'Mensaje',
        location: 'Ubicación'
      },
      placeholders: {
        name: 'Tu nombre',
        email: 'tu@email.com',
        message: 'Cuéntame sobre tu proyecto...'
      },
      button_whatsapp: 'Enviar por WhatsApp',
      info_title: 'Información de contacto',
      social_title: 'Sígueme en redes',
      whatsapp_card: {
        title: '¿Prefieres WhatsApp?',
        subtitle: 'Haz clic aquí para chatear directamente'
      }
    },
    tech_stack: {
        title: 'Stack Tecnológico',
        subtitle: 'Tecnologías y herramientas que domino',
        learning_text: 'Y siempre aprendiendo nuevas tecnologías para mantenerme actualizado con las últimas tendencias'
    },
    footer: {
        rights: 'Todos los derechos reservados.',
        developed_by: 'Desarrollado con React, Tailwind CSS y Framer Motion'
    },
    case_study: {
      back: 'Volver al Portafolio',
      solution_title: 'La Solución Tecnológica',
      results: 'Resultados e Impacto',
      gallery: 'Galería del Proyecto'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Me',
      tech_stack: 'Tech Stack',
      projects: 'Projects',
      experience: 'Experience',
      certifications: 'Certifications',
      services: 'Services',
      contact: 'Contact'
    },
    hero: {
      greeting: '👋 Hello, welcome to my portfolio',
      role: 'Cloud Solutions Architect (AWS/Azure) | AI & RAG Engineering | Full Stack & Data Analytics',
      description_prefix: 'Systems Engineer certified as',
      description_highlight_1: 'AWS Cloud Practitioner',
      description_connector: 'with a',
      description_highlight_2: 'Master\'s in Software Engineering,',
      description_suffix: 'specialized in Cloud Architecture (AWS/Azure), Data Engineering, and Applied Artificial Intelligence (RAG). Focused on automating complex workflows, optimizing cloud infrastructure, and designing data pipelines for strategic decision-making.',
      buttons: {
        projects: 'View Projects',
        contact: 'Contact Me',
        cv: 'Download CV'
      }
    },
    about: {
      title: 'About Me',
      subtitle: 'Software Engineer with a passion for creating high-impact technological solutions',
      card_title: 'Systems & Informatics Engineer',
      description_1: 'Systems Engineer certified as AWS Cloud Practitioner with a Master\'s in Software Engineering, specialized in Cloud Architecture (AWS/Azure), Data Engineering, and Applied Artificial Intelligence (RAG). My focus is on automating complex workflows, optimizing cloud infrastructure, and designing data pipelines for strategic decision-making.',
      description_2: 'As Founder and Lead Architect of the DEREJ-IA SaaS platform, I lead the deployment of LegalTech solutions based on generative models and Web Scraping. I have a proven track record designing elastic cloud architectures and co-designing institutional management systems formally recognized for optimizing administrative processes.',
      specialties: {
        title: 'Areas of Specialization',
        items: [
          { label: 'Cloud & DevOps', desc: 'AWS, Azure, Docker, Elastic Architectures, CI/CD.' },
          { label: 'Data Engineering & AI', desc: 'Artificial Intelligence (RAG), Web Scraping, ETL Pipelines, Power BI, QuickSight.' },
          { label: 'Core Development', desc: 'Python, Node.js, PHP, TypeScript, SQL Server, PostgreSQL, MySQL, and NoSQL.' },
          { label: 'AI-Assisted Development', desc: 'Extensive mastery of the generative AI tooling ecosystem, including Claude Code, OpenAI Codex, Gemini, Antigravity, and other AI agents applied to development workflows, prototyping, and code automation. Proficient with MCP (Model Context Protocol), Skills, and agent orchestration to integrate AI into production systems and workflows.' }
        ]
      },
      mentorship_title: 'Teaching & Mentorship',
      mentorship_desc: 'Professor and instructor in programming technologies, Python, Power BI, and SQL, sharing knowledge and training the next generation of tech professionals.',
      skills: {
        fullstack: {
          title: 'Full Stack Development',
          desc: 'End-to-end web application development with modern technologies (React, Node, Python)'
        },
        cloud: {
          title: 'Cloud Architecture',
          desc: 'Design and implementation of scalable and serverless infrastructure on AWS and Azure'
        },
        data: {
          title: 'Data & AI Solutions',
          desc: 'Advanced data analysis, Power BI, and automation with Artificial Intelligence'
        }
      }
    },
    projects: {
      title: 'My Projects',
      subtitle: 'Enterprise solutions developed with modern technologies and best practices',
      top_title: 'Main Project',
      featured_title: 'Featured Projects',
      featured_subtitle: 'Innovative solutions with cutting-edge technologies',
      other_title: 'Other Projects',
      other_subtitle: 'More enterprise solutions developed',
      badge_featured: 'FEATURED',
      buttons: {
        case_study: 'View Case Study',
        demo: 'View Demo',
        demo_wip: 'Demo in progress',
        private: 'Private',
        github: 'GitHub',
        coming_soon: 'Coming Soon'
      },
      note: 'Each project was developed with clean code, scalable architecture, and industry best practices.'
    },
    live: {
      title: 'Systems with an open demo',
      subtitle: 'Six products you can open right now. Pick one, browse its real screens and try it.',
      online: 'Online',
      enter: 'Open the demo',
      docs: 'Documentation',
      shot: 'Screenshot',
      trial: 'Trial users are shown on the login screen.',
      note: 'Reference figures and times, taken from the documentation of each system.'
    },
    voice: {
      start: 'Talk to the agent',
      talk: 'Talk',
      end: 'End',
      stop: 'Stop',
      listen: 'Listen',
      mute: 'Mute the voice',
      unmute: 'Turn the voice on',
      denied: 'I could not use the microphone. Allow it in your browser, or type here.',
      failed: 'I could not hear you this time. Try again or type here.',
      listening: 'Listening',
      transcribing: 'Understanding',
      thinking: 'Thinking',
      speaking: 'Speaking',
      paused: 'Paused',
      hint_listening: 'Speak naturally. I stop when you pause.',
      hint_transcribing: 'One moment.',
      hint_thinking: 'Checking the projects.',
      hint_speaking: 'Tap me to interrupt.',
      hint_paused: 'The microphone is off.',
      tap_listening: 'I finished talking',
      tap_transcribing: 'Understanding',
      tap_thinking: 'Thinking',
      tap_speaking: 'Interrupt and talk',
      tap_paused: 'Talk'
    },
    agent: {
      title: 'JCM Agent',
      subtitle: 'documents · in your browser',
      subtitle_llm: 'documents',
      llm_down: 'no response, using local search',
      privacy: 'AI-generated text and voice (OpenAI). Do not share sensitive data.',
      quota: 'questions',
      robot_hide: 'Hide the robot',
      robot_show: 'Show the robot',
      launcher: 'Ask my agent',
      open: 'Open the agent',
      close: 'Close',
      reset: 'New conversation',
      send: 'Send',
      thinking: 'Searching',
      welcome: 'I am Jersson’s agent. How can I help you?',
      welcome_sub: 'Talk or type: I recommend a system for your business, match a job offer with the profile or guide you through the page.',
      placeholder: 'Type a question or paste a job offer',
      demo: 'Demo',
      case: 'Case study',
      match_caption: 'requirements backed up',
      match_missing: 'Not listed in the portfolio:',
      pause: 'Pause',
      resume: 'Resume',
      next: 'Next',
      hero_placeholder: 'Have a business or a job opening? Tell me'
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'My journey in software development and technology',
      current_badge: 'Current'
    },
    certifications: {
        title: 'Certifications',
        subtitle: 'Validation of technical skills and competencies',
        languages_title: 'Languages',
        more_title: 'More Courses & Certifications',
        view_credential: 'View credential',
        valid_until: 'Valid until',
        badge: 'Certificate'
    },
    services: {
        title: 'My Services',
        subtitle: 'Custom tech solutions to empower your business'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Have a project in mind? Let\'s talk!',
      form_title: 'Send me a message',
      labels: {
        name: 'Full Name',
        email: 'Email',
        message: 'Message',
        location: 'Location'
      },
      placeholders: {
        name: 'Your Name',
        email: 'you@email.com',
        message: 'Tell me about your project...'
      },
      button_whatsapp: 'Send via WhatsApp',
      info_title: 'Contact Information',
      social_title: 'Follow me',
      whatsapp_card: {
        title: 'Prefer WhatsApp?',
        subtitle: 'Click here to chat directly'
      }
    },
    tech_stack: {
        title: 'Tech Stack',
        subtitle: 'Technologies and tools I master',
        learning_text: 'And always learning new technologies to keep up to date with the latest trends'
    },
    footer: {
        rights: 'All rights reserved.',
        developed_by: 'Developed with React, Tailwind CSS and Framer Motion'
    },
    case_study: {
      back: 'Back to Portfolio',
      solution_title: 'The Technology Solution',
      results: 'Results & Impact',
      gallery: 'Project Gallery'
    }
  }
};
