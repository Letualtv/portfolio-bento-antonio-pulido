import { ref, computed } from 'vue'

const currentLanguage = ref('es')

const translations = {
  es: {
    // Navegación
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      experience: 'Proyectos destacados',
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
      description: 'Desarrollador Full Stack con manejo avanzado de PHP (Laravel) y JavaScript (Vue.js), enfocado en crear soluciones eficientes, escalables y de alto rendimiento. Graduado en Desarrollo de Aplicaciones Web, con certificaciones en eCommerce, Full Stack y SEO.',
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
      socialLink: 'Enlace a {platform}'
    },
    
    // Footer
    footer: {
      description: 'Creando soluciones web innovadoras con tecnologías modernas y metodologías ágiles. Especializado en desarrollo frontend y backend.',
      navigation: 'Navegación',
      contact: 'Contacto',
      followMe: 'Sígueme',
      rights: 'Todos los derechos reservados.',
      madeWith: 'Desarrollado con'
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Featured Projects',
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
      description: 'Full Stack Developer with advanced skills in PHP (Laravel) and JavaScript (Vue.js), focused on creating efficient, scalable and high-performance solutions. Graduate in Web Application Development, with certifications in eCommerce, Full Stack and SEO.',
      downloadCV: 'Download CV',
      viewWork: 'View Work',
      availableForWork: 'Available for projects'
    },
    
    // Sections
    sections: {
      aboutTitle: 'About Me',
      experienceTitle: 'Featured Projects',
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
      socialLink: 'Link to {platform}'
    },
    
    // Footer
    footer: {
      description: 'Creating innovative web solutions with modern technologies and agile methodologies. Specialized in frontend and backend development.',
      navigation: 'Navigation',
      contact: 'Contact',
      followMe: 'Follow Me',
      rights: 'All rights reserved.',
      madeWith: 'Built with'
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
