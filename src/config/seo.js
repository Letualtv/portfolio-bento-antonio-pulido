// Configuración SEO para el portfolio
export const seoConfig = {
  title: 'Antonio Pulido - Full Stack Developer | Vue.js & Laravel Specialist',
  titleTemplate: '%s | Antonio Pulido Portfolio',
  description: 'Portfolio profesional de Antonio Pulido, Desarrollador Full Stack especializado en Vue.js, Laravel y desarrollo web moderno. Experiencia en IESA-CSIC y proyectos de investigación social.',
  keywords: [
    'Antonio Pulido',
    'Full Stack Developer',
    'Vue.js',
    'Laravel', 
    'JavaScript',
    'PHP',
    'Desarrollador Web',
    'IESA-CSIC',
    'Portfolio',
    'Córdoba',
    'España'
  ],
  author: 'Antonio Pulido',
  url: 'https://antonioupulido.dev', // Actualizar con el dominio real
  image: '/assets/profile-photo.jpg',
  locale: 'es_ES',
  alternateLocale: 'en_US',
  type: 'website',
  
  // Open Graph meta tags
  openGraph: {
    title: 'Antonio Pulido - Full Stack Developer Portfolio',
    description: 'Explora el portfolio de Antonio Pulido, desarrollador Full Stack con experiencia en Vue.js, Laravel y sistemas de investigación social.',
    image: '/assets/profile-photo.jpg',
    url: 'https://antonioupulido.dev',
    type: 'profile',
    profile: {
      firstName: 'Antonio',
      lastName: 'Pulido',
      username: 'antonioupulido'
    }
  },
  
  // Twitter Card meta tags
  twitter: {
    card: 'summary_large_image',
    site: '@antonioupulido', // Actualizar con el handle real
    creator: '@antonioupulido',
    title: 'Antonio Pulido - Full Stack Developer',
    description: 'Portfolio profesional de Antonio Pulido, especialista en Vue.js y Laravel',
    image: '/assets/profile-photo.jpg'
  },
  
  // Structured Data
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Antonio Pulido',
    jobTitle: 'Full Stack Developer',
    description: 'Desarrollador Full Stack especializado en Vue.js, Laravel y desarrollo web moderno',
    url: 'https://antonioupulido.dev',
    image: '/assets/profile-photo.jpg',
    sameAs: [
      'https://github.com/antonioupulido',
      'https://linkedin.com/in/antonioupulido'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'IESA-CSIC',
      description: 'Instituto de Estudios Sociales Avanzados - Consejo Superior de Investigaciones Científicas'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Córdoba',
      addressCountry: 'ES'
    },
    knowsAbout: [
      'Vue.js',
      'Laravel',
      'JavaScript',
      'PHP',
      'Full Stack Development',
      'Web Development',
      'Social Research Systems'
    ]
  }
}

// Función para generar meta tags dinámicamente
export function generateMetaTags(pageTitle, pageDescription, pageImage) {
  return [
    { title: pageTitle || seoConfig.title },
    { name: 'description', content: pageDescription || seoConfig.description },
    { name: 'keywords', content: seoConfig.keywords.join(', ') },
    { name: 'author', content: seoConfig.author },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: 'ES' },
    { name: 'revisit-after', content: '7 days' },
    
    // Open Graph
    { property: 'og:title', content: pageTitle || seoConfig.openGraph.title },
    { property: 'og:description', content: pageDescription || seoConfig.openGraph.description },
    { property: 'og:image', content: pageImage || seoConfig.openGraph.image },
    { property: 'og:url', content: seoConfig.openGraph.url },
    { property: 'og:type', content: seoConfig.openGraph.type },
    { property: 'og:locale', content: seoConfig.locale },
    { property: 'og:locale:alternate', content: seoConfig.alternateLocale },
    
    // Twitter
    { name: 'twitter:card', content: seoConfig.twitter.card },
    { name: 'twitter:site', content: seoConfig.twitter.site },
    { name: 'twitter:creator', content: seoConfig.twitter.creator },
    { name: 'twitter:title', content: pageTitle || seoConfig.twitter.title },
    { name: 'twitter:description', content: pageDescription || seoConfig.twitter.description },
    { name: 'twitter:image', content: pageImage || seoConfig.twitter.image },
    
    // Additional SEO
    { name: 'theme-color', content: '#2a9d8f' },
    { name: 'msapplication-TileColor', content: '#2a9d8f' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
  ]
}
