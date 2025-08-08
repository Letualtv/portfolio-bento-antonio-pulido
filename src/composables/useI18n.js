import { ref, computed } from 'vue'

const currentLanguage = ref('es')

const translations = {
  es: {
    githubStar: {
      label: '¿Te gusta este porfolio?',
      button: 'Dale una estrella'
    },
    experienceList: [
      {
        period: '2024 - Actualidad',
        position: 'Desarrollador Full Stack',
        company: 'IESA-CSIC',
        description: 'Desarrollo de sistemas avanzados de encuestas sociales con Vue.js y Laravel. Creación de herramientas de análisis de datos y gestión de investigación para el Instituto de Estudios Sociales Avanzados.'
      },
      {
        period: '2024 (3 meses)',
        position: 'Prácticas profesionales',
        company: 'Medac',
        description: 'Desarrollo web full stack enfocado en el metaverso. Diseño y programación de la web de entrada al metaverso, panel de control para alumnos en aula virtual y plataforma para nuevo proyecto de prácticas con realidad virtual.'
      },
      {
        period: '2022 - 2024',
        position: 'Grado Superior en Desarrollo de Aplicaciones Web',
        company: 'Formación Profesional',
        description: 'Técnico Superior en Desarrollo de Aplicaciones Web especializado en PHP, JavaScript y bases de datos. Proyectos freelance con WordPress, PrestaShop y aplicaciones a medida.'
      },
      {
        period: '2017 - 2024',
        position: 'Otros puestos de trabajo',
        company: '',
        description: 'Diversos puestos de atención al cliente: expendedor de gasolinera, gestor de reservas online de casas rurales, asesor inmobiliario, etc.'
      }
    ],
    experience: {
      title: 'Proyectos destacados',
      subtitle: 'Algunos de mis trabajos más relevantes',
      timelineTitle: 'Trayectoria profesional',
      showMore: 'Ver más experiencia',
      code: 'Código',
      demo: 'Demo',
      projects: [
        {
          id: 1,
          title: 'Sistema de Encuestas IESA-CSIC',
          description: 'Sistema completo para la creación, distribución y análisis de encuestas sociales desarrollado para investigadores del IESA-CSIC.',
          technologies: ['Vue.js', 'Laravel', 'MySQL', 'Chart.js', 'Bootstrap'],
          demo: '#',
          code: '#'
        },
        {
          id: 2,
          title: 'Plataforma E-commerce PrestaShop',
          description: 'Tienda online completa con gestión de productos, pagos integrados y panel de administración personalizado.',
          technologies: ['PrestaShop', 'PHP', 'MySQL', 'JavaScript', 'CSS3'],
          demo: '#',
          code: '#'
        },
        {
          id: 3,
          title: 'Aplicación 3D Odontológica',
          description: 'Aplicación web 3D para visualización dental con WebGL, formularios interactivos y integración con Firebase.',
          technologies: ['WebGL', 'Three.js', 'Firebase', 'AWS', 'JavaScript'],
          demo: '#',
          code: '#'
        }
      ]
    },
    // Navegación
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      experience: 'Experiencia',
      contact: 'Contacto',
      goTo: 'Ir a'
    },
    
    // Sección Hero
    hero: {
      greeting: 'Hola, soy',
      name: 'Antonio Pulido',
      title: 'Full Stack Developer',
      currentPosition: 'Full Stack Developer en IESA - CSIC',
      institution: 'Técnico Superior en Desarrollo de Aplicaciones Web',
      description: 'Desarrollador de PHP (Laravel) y JavaScript (Vue.js), enfocado en crear soluciones eficientes, escalables y de alto rendimiento. Graduado en Desarrollo de Aplicaciones Web, con certificaciones en eCommerce, Full Stack y SEO.',
      downloadCV: 'Descargar CV',
      viewWork: 'Ver trabajos',
      availableForWork: 'Disponible para proyectos'
    },
    
    // Secciones
    sections: {
      aboutTitle: 'Acerca de mí',
      experienceTitle: 'Proyectos destacados',
      contactTitle: 'Contacto'
    },

// Sección Contact mejorada
    contact: {
      contactDescription: 'Estoy siempre abierto a nuevas oportunidades y proyectos.',
name: 'Nombre',
      subject: 'Asunto',
      message: 'Mensaje',
      sending: 'Enviando...',
      send: 'Enviar mensaje',

      phone: 'Teléfono',
      email: 'Correo electrónico',
      location: 'Ubicación',
      locationValue: 'Desde Córdoba con amor ❤️',
    },
    // Sección About mejorada
    about: {
      title: 'Acerca de mí',
      subtitle: '',
      yearsExperience: 'Años de experiencia',
      projectsCompleted: 'Proyectos completados',
      technologiesMastered: 'Tecnologías dominadas',
      
      // Bento Cards
      techStack: {
        title: 'Stack técnico',
        subtitle: 'Tecnologías que domino',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Herramientas',
        databases: 'Bases de datos'
      },
      
      specialization: {
        title: 'Especialización',
        subtitle: 'PHP & JavaScript developer en IESA-CSIC',
        vue: 'Vue.js & Frontend',
        vueDesc: 'Frameworks frontend para aplicaciones interactivas y experiencia de usuario optimizada',
        laravel: 'PHP & Laravel',
        laravelDesc: 'Backend robusto con bases de datos MySQL escalables para sistemas complejos',
        integration: 'Sistemas de Encuestas',
        integrationDesc: 'Desarrollo completo desde creación hasta análisis de resultados'
      },
      
      achievements: {
        title: 'Logros',
        subtitle: 'Experiencia real en desarrollo',
        project1: 'Desarrollador Full-Stack IESA-CSIC',
        project1Desc: 'Sistema avanzado de creación, recopilación y análisis de encuestas sociales para investigadores',
        project2: 'Proyectos Metaverso & 3D',
        project2Desc: 'Landing pages, formularios con AWS/Firebase y aplicaciones 3D odontológicas con WebGL',
        project3: 'Transformación Digital PYMES',
        project3Desc: 'WordPress, PrestaShop y certificaciones en CMS, SEO para modernización empresarial'
      },
      
      currentlyLearning: {
        title: 'Explorando',
        subtitle: 'Crecimiento técnico continuo',
        nuxt: 'Testing & PHPUnit',
        vue3: 'Docker & Contenedores',
        testing: 'React & React Native'
      },
      
      philosophy: {
        title: 'Filosofía',
        subtitle: 'Principios que guían mi código',
        clean: 'Código Limpio',
        cleanDesc: 'Legible, mantenible y bien documentado',
        performance: 'Performance',
        performanceDesc: 'Optimización en cada línea de código',
        results: 'Enfocado a Resultados',
        resultsDesc: 'Soluciones que generan impacto real y valor medible'
      },
      
      collaboration: {
        title: 'Colaboración',
        subtitle: 'Metodologías y soft skills destacadas',
        agile: 'Scrum & Kanban',
        git: 'Git & GitHub',
        communication: 'Trabajo en equipo',
        mentoring: 'Adaptabilidad & Perseverancia'
      }
    },
    
    // Accesibilidad
    accessibility: {
      skipToMain: 'Saltar al contenido principal',
      toggleTheme: 'Cambiar tema',
      toggleLanguage: 'Cambiar idioma',
      profileImage: 'Foto de perfil de Antonio Pulido',
      socialLink: 'Enlace a {platform}',
      featuredProjects: 'Proyectos Destacados',
      technologiesUsed: 'Tecnologías utilizadas',
      allProjectsVisible: 'Todos los proyectos ahora son visibles',
      someProjectsHidden: 'Algunos proyectos están ocultos',
      period: 'Período',
      timelineVisible: 'La cronología profesional completa ahora es visible',
      timelineCollapsed: 'La cronología profesional está resumida',
      mainNavigation: 'Navegación principal'
    },
    
    // Footer
    footer: {
      description: 'Creando soluciones web innovadoras con tecnologías modernas y metodologías ágiles. Especializado en desarrollo frontend y backend.',
      navigation: 'Navegación',
      contact: 'Contacto',
      followMe: 'Sígueme',
      rights: 'Todos los derechos reservados.',
      madeWith: 'Desarrollado con',
      licence: 'Uso permitido con atribución. No se permite uso comercial. <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.es" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:2px;text-decoration:none;color:inherit;font-size:0.95em;"><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" style="height:0.9em;vertical-align:middle;opacity:0.6;"> <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" style="height:0.9em;vertical-align:middle;opacity:0.6;"> <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" style="height:0.9em;vertical-align:middle;opacity:0.6;"> CC BY-NC 4.0</a>'
    }
  },
  
  en: {
    githubStar: {
      label: 'Do you like this portfolio?',
      button: 'Star it'
    },
    experienceList: [
      {
        period: '2024 - Present',
        position: 'Full Stack Developer',
        company: 'IESA-CSIC',
        description: 'Development of advanced social survey systems with Vue.js and Laravel. Creation of data analysis tools and research management for the Institute of Advanced Social Studies.'
      },
      {
        period: '2024 (3 months)',
        position: 'Professional Internship',
        company: 'Medac',
        description: 'Full stack web development focused on the metaverse. Design and programming of the entry website to the metaverse, a control panel for students in the virtual classroom, and a platform for a new internship project with virtual reality.'
      },
      {
        period: '2022 - 2024',
        position: 'Higher Degree in Web Application Development',
        company: 'Vocational Training',
        description: 'Senior Technician in Web Application Development specializing in PHP, JavaScript, and databases. Freelance projects with WordPress, PrestaShop, and custom applications.'
      },
      {
        period: '2017 - 2024',
        position: 'Other jobs',
        company: '',
        description: 'Various customer service positions: gas station attendant, online booking manager for rural homes, real estate advisor, etc.'
      }
    ],
    experience: {
      title: 'Featured Projects',
      subtitle: 'Some of my most relevant work',
      timelineTitle: 'Professional Trajectory',
      showMore: 'Show more experience',
      code: 'Code',
      demo: 'Demo',
      projects: [
        {
          id: 1,
          title: 'IESA-CSIC Survey System',
          description: 'Complete system for the creation, distribution and analysis of social surveys developed for IESA-CSIC researchers.',
          technologies: ['Vue.js', 'Laravel', 'MySQL', 'Chart.js', 'Bootstrap'],
          demo: '#',
          code: '#'
        },
        {
          id: 2,
          title: 'PrestaShop E-commerce Platform',
          description: 'Full online store with product management, integrated payments and custom admin panel.',
          technologies: ['PrestaShop', 'PHP', 'MySQL', 'JavaScript', 'CSS3'],
          demo: '#',
          code: '#'
        },
        {
          id: 3,
          title: '3D Dental Application',
          description: '3D web application for dental visualization with WebGL, interactive forms and Firebase integration.',
          technologies: ['WebGL', 'Three.js', 'Firebase', 'AWS', 'JavaScript'],
          demo: '#',
          code: '#'
        }
      ]
    },
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      contact: 'Contact',
      goTo: 'Go to'
    },
    
    // Hero Section
    hero: {
      greeting: 'Hi, I\'m',
      name: 'Antonio Pulido',
      title: 'Full Stack Developer',
      currentPosition: 'Full Stack Developer at IESA - CSIC',
      institution: 'Web Application Development Graduate',
      description: 'Full Stack Developer with skills in PHP (Laravel) and JavaScript (Vue.js), focused on creating efficient, scalable and high-performance solutions. Graduate in Web Application Development, with certifications in eCommerce, Full Stack and SEO.',
      downloadCV: 'Download CV',
      viewWork: 'View Work',
      availableForWork: 'Available for projects'
    },
    
    // Sections
    sections: {
      aboutTitle: 'About Me',
      experienceTitle: 'Experiencie',
      contactTitle: 'Contact'
    },

    // Enhanced About Section
    about: {
      title: 'About Me',
      subtitle: '',
      yearsExperience: 'Years of experience',
      projectsCompleted: 'Projects completed',
      technologiesMastered: 'Technologies mastered',
      
      // Bento Cards
      techStack: {
        title: 'Tech stack',
        subtitle: 'Technologies I master',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Tools',
        databases: 'Databases'
      },
      
      specialization: {
        title: 'Specialization',
        subtitle: 'PHP & JavaScript developer at IESA-CSIC',
        vue: 'Vue.js & Frontend',
        vueDesc: 'Frontend frameworks for interactive applications and optimized user experience',
        laravel: 'PHP & Laravel',
        laravelDesc: 'Robust backend with scalable MySQL databases for complex systems',
        integration: 'Survey Systems',
        integrationDesc: 'Complete development from creation to results analysis'
      },
      
      achievements: {
        title: 'Achievements',
        subtitle: 'Real development experience',
        project1: 'Full-Stack Developer IESA-CSIC',
        project1Desc: 'Advanced system for creating, collecting and analyzing social surveys for researchers',
        project2: 'Metaverse & 3D Projects',
        project2Desc: 'Landing pages, forms with AWS/Firebase and 3D dental applications with WebGL',
        project3: 'SME Digital Transformation',
        project3Desc: 'WordPress, PrestaShop and CMS, SEO certifications for business modernization'
      },
      
      currentlyLearning: {
        title: 'Exploring',
        subtitle: 'Continuous technical growth',
        nuxt: 'Testing & PHPUnit',
        vue3: 'Docker & Containers',
        testing: 'React & React Native'
      },
      
      philosophy: {
        title: 'Philosophy',
        subtitle: 'Principles that guide my code',
        clean: 'Clean Code',
        cleanDesc: 'Readable, maintainable and well documented',
        performance: 'Performance',
        performanceDesc: 'Optimization in every line of code',
        results: 'Results Focused',
        resultsDesc: 'Solutions that generate real impact and measurable value'
      },
      
      collaboration: {
        title: 'Collaboration',
        subtitle: 'Methodologies and outstanding soft skills',
        agile: 'Scrum & Kanban',
        git: 'Git & GitHub',
        communication: 'Team Work',
        mentoring: 'Adaptability & Perseverance'
      }
    },
    
    // Accessibility
    accessibility: {
      skipToMain: 'Skip to main content',
      toggleTheme: 'Toggle theme',
      toggleLanguage: 'Toggle language',
      profileImage: 'Antonio Pulido\'s profile picture',
      socialLink: 'Link to {platform}',
      featuredProjects: 'Featured Projects',
      technologiesUsed: 'Technologies used',
      allProjectsVisible: 'All projects are now visible',
      someProjectsHidden: 'Some projects are hidden',
      period: 'Period',
      timelineVisible: 'Full professional timeline is now visible',
      timelineCollapsed: 'Professional timeline is summarized',
      mainNavigation: 'Main navigation'
    },
    
// Contact Section
    contact: {
      contactDescription: 'I am always open to new opportunities and projects.',
      name: 'Name',
      subject: 'Subject',
      message: 'Message',
      sending: 'Sending...',
      send: 'Send message',

      phone: 'Phone',
      email: 'Email',
      location: 'Location',
      locationValue: 'From Córdoba with love ❤️',
    },


    // Footer
    footer: {
      description: 'Creating innovative web solutions with modern technologies and agile methodologies. Specialized in frontend and backend development.',
      navigation: 'Navigation',
      contact: 'Contact',
      followMe: 'Follow Me',
      rights: 'All rights reserved.',
      madeWith: 'Built with',
      licence: 'Allowed with attribution. No commercial use allowed. <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:2px;text-decoration:none;color:inherit;font-size:0.95em;"><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" style="height:0.9em;vertical-align:middle;opacity:0.6;"> <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" style="height:0.9em;vertical-align:middle;opacity:0.6;"> <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" style="height:0.9em;vertical-align:middle;opacity:0.6;"> CC BY-NC 4.0</a>'
    }
  }
}

export function useI18n() {
  const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
      
      // Actualizar atributo lang del documento
      document.documentElement.lang = lang
    }
  }

  const toggleLanguage = () => {
    const newLang = currentLanguage.value === 'es' ? 'en' : 'es'
    setLanguage(newLang)
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[currentLanguage.value]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Devolver la clave si no se encuentra la traducción
      }
    }
    
    return value || key
  }

  const initLanguage = () => {
    // Comprobar idioma guardado o idioma del navegador
    const savedLang = localStorage.getItem('language')
    const browserLang = navigator.language.split('-')[0]
    
    if (savedLang && translations[savedLang]) {
      currentLanguage.value = savedLang
    } else if (translations[browserLang]) {
      currentLanguage.value = browserLang
    } else {
      currentLanguage.value = 'es' // Idioma por defecto
    }
    
    document.documentElement.lang = currentLanguage.value
  }

  const currentLang = computed(() => currentLanguage.value)

  return {
    currentLang,
    setLanguage,
    toggleLanguage,
    t,
    initLanguage
  }
}
