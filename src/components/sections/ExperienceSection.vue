<template>
  <section 
    id="experiencia" 
    class="experience-section py-5"
    role="main"
    aria-labelledby="experience-title"
  >
    <div class="container">
      <h2 id="experience-title" class="section-title text-center mb-5">{{ t('experience.title') }}</h2>
      
      <div class="experience-content">
        <!-- Sección de Proyectos -->
        <div class="projects-section mb-5" role="region" aria-labelledby="projects-heading">
          <h3 id="projects-heading" class="visually-hidden">{{ t('accessibility.featuredProjects') }}</h3>

          <transition-group name="project-fade" tag="div" class="row g-4 justify-content-center">
            <div 
              v-for="(project, index) in visibleProjects" 
              :key="project.title" 
              class="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
              :style="{ '--animation-delay': index * 0.1 + 's' }"
            >
              <article 
                class="project-card-theme w-100 h-100" 
                @mouseenter="handleProjectHover" 
                @mouseleave="handleProjectLeave"
                role="article"
                :aria-labelledby="`project-title-${index}`"
                :aria-describedby="`project-desc-${index}`"
              >
                <div class="project-img-container">
                  <img 
                    v-if="project.image" 
                    :src="project.image" 
                    :alt="`${currentLang === 'en' ? 'Screenshot of' : 'Captura de pantalla de'} ${project.title}`" 
                    class="project-img-theme" 
                    loading="lazy"
                    decoding="async"
                    width="403"
                    height="200"
                    fetchpriority="low"
                    sizes="(max-width: 480px) 350px, (max-width: 768px) 400px, (max-width: 1024px) 300px, 403px"
                  />
                  <div v-else class="project-placeholder" role="img" :aria-label="`${currentLang === 'en' ? 'Project preview placeholder for' : 'Imagen de marcador de posición para'} ${project.title}`">
                    <i class="bi bi-code-slash" aria-hidden="true"></i>
                    <span>{{ currentLang === 'en' ? 'Project Preview' : 'Vista Previa' }}</span>
                  </div>
                  <!-- Botones sobre la imagen -->
                  <div class="project-img-actions" :class="{ 'show-always': windowWidth <= 1024 }">
                    <template v-for="type in ['Demo','GitHub']" :key="type">
                      <template v-if="project.links && project.links.find(l => l.label === type && l.url)">
                        <a
                          :href="project.links.find(l => l.label === type).url"
                          class="btn btn-primary-custom d-flex align-items-center gap-2 px-3"
                          target="_blank"
                          rel="noopener noreferrer"
                          :aria-label="`${currentLang === 'en' ? (type === 'Demo' ? 'View live demo of' : 'View source code of') : (type === 'Demo' ? 'Ver demo en vivo de' : 'Ver código fuente de')} ${project.title} ${currentLang === 'en' ? '(opens in new window)' : '(se abre en nueva ventana)'}`"
                          @focus="handleButtonFocus"
                        >
                          <i :class="`bi bi-${project.links.find(l => l.label === type).icon}`" aria-hidden="true"></i>
                          <span>{{ type }}</span>
                        </a>
                      </template>
                    </template>
                  </div>
                </div>
                <div class="project-content-theme d-flex flex-column">
                  <h4 :id="`project-title-${index}`" class="project-title-theme mb-2">{{ project.title }}</h4>
                  <p :id="`project-desc-${index}`" class="project-description-theme flex-grow-1">{{ project.description }}</p>
                  <div v-if="project.tech && project.tech.length" class="tech-stack mb-3" role="group" :aria-label="t('accessibility.technologiesUsed')">
                    <div class="tech-label mb-2">
                      <i class="bi bi-gear-fill me-2" aria-hidden="true"></i>
                      {{ currentLang === 'en' ? 'Technologies:' : 'Tecnologías:' }}
                    </div>
                    <div class="d-flex flex-wrap gap-2">
                      <span 
                        v-for="tech in project.tech" 
                        :key="tech" 
                        class="badge badge-theme"
                        role="text"
                        :aria-label="`${currentLang === 'en' ? 'Technology' : 'Tecnología'}: ${tech}`"
                      >{{ tech }}</span>
                    </div>
                  </div>
                  <!-- Botones en móvil -->
                  <div v-if="windowWidth <= 1024" class="d-flex flex-wrap gap-2 mt-auto justify-content-center">
                    <template v-for="type in ['Demo','GitHub']" :key="type">
                      <template v-if="project.links && project.links.find(l => l.label === type && l.url)">
                        <a
                          :href="project.links.find(l => l.label === type).url"
                          class="btn btn-primary-custom d-flex align-items-center gap-2 px-3 flex-fill"
                          target="_blank"
                          rel="noopener noreferrer"
                          :aria-label="`${currentLang === 'en' ? (type === 'Demo' ? 'View live demo of' : 'View source code of') : (type === 'Demo' ? 'Ver demo en vivo de' : 'Ver código fuente de')} ${project.title} ${currentLang === 'en' ? '(opens in new window)' : '(se abre en nueva ventana)'}`"
                        >
                          <i :class="`bi bi-${project.links.find(l => l.label === type).icon}`"></i>
                          <span>{{ currentLang === 'en' ? (type === 'Demo' ? 'Live demo' : 'GitHub') : (type === 'Demo' ? 'Demo' : 'GitHub') }}</span>
                        </a>
                      </template>
                    </template>
                  </div>
                </div>
              </article>
            </div>
          </transition-group>
          <div class="text-center mt-4" v-if="showMoreProjectsBtn">
            <button 
              class="btn btn-primary-custom show-more-btn" 
              @click="toggleProjects" 
              :aria-expanded="showAllProjects"
              :aria-describedby="showAllProjects ? 'projects-expanded' : 'projects-collapsed'"
              role="button"
              tabindex="0"
            >
              <i class="bi bi-arrow-down-circle me-2" aria-hidden="true"></i>
              {{ currentLang === 'en' ? 'See more projects' : 'Ver más proyectos' }}
            </button>
            <div id="projects-expanded" class="visually-hidden">{{ t('accessibility.allProjectsVisible') }}</div>
            <div id="projects-collapsed" class="visually-hidden">{{ t('accessibility.someProjectsHidden') }}</div>
          </div>
        </div>

        <!-- Sección de Trayectoria Profesional -->
        <div class="timeline-section" role="region" aria-labelledby="timeline-heading">
          <h3 id="timeline-heading" class="section-title text-center mb-5">
            {{ t('experience.timelineTitle') }}
          </h3>
          <div class="timeline-container" role="list" aria-label="{{ currentLang === 'en' ? 'Professional timeline' : 'Cronología profesional' }}">
            <Timeline :value="visibleExperience" :align="timelineAlign" layout="vertical" :animate="true" class="custom-timeline">
              <template #marker="{ item, index }">
                <div class="timeline-marker-wrapper" :style="{ '--marker-delay': index * 0.2 + 's' }">
                  <span class="timeline-marker-custom" :class="{ 'active': index < visibleExperience.length }">
                    <i class="bi bi-mortarboard-fill" v-if="item.position?.includes('Grado') || item.position?.includes('Higher Degree')"></i>
                    <i class="bi bi-briefcase-fill" v-else-if="item.company && item.company !== 'Formación Profesional' && item.company !== 'Vocational Training'"></i>
                    <i class="bi bi-three-dots" v-else></i>
                  </span>
                </div>
              </template>
              <template #content="{ item, index }">
                <div 
                  class="timeline-card-theme mb-4 timeline-fade-in position-relative" 
                  :style="{ '--card-delay': index * 0.15 + 's' }"
                  role="listitem"
                  :aria-labelledby="`timeline-position-${index}`"
                  :aria-describedby="`timeline-desc-${index}`"
                >
                  <div class="card-body p-4">
                    <div class="timeline-content">
                      <!-- Layout para escritorio con tarjetas alternadas -->
                      <div class="timeline-header mb-3" v-if="windowWidth > 1024 && timelineAlign === 'alternate'">
                        <div class="timeline-info" :class="{ 'alternate-left': index % 2 === 0, 'alternate-right': index % 2 === 1 }">
                          <!-- Título y tiempo en la misma línea -->
                          <!-- Tarjetas de la izquierda: título a la izquierda, tiempo a la derecha -->
                          <div v-if="index % 2 === 0" class="d-flex align-items-center justify-content-between gap-3 mb-2">
                            <h4 :id="`timeline-position-left-${index}`" class="timeline-job-theme mb-0">{{ item.position }}</h4>
                            <span class="timeline-badge-period-inline" role="text" :aria-label="`${t('accessibility.period')}: ${item.period}`">{{ item.period }}</span>
                          </div>
                          <!-- Tarjetas de la derecha: tiempo a la izquierda, título a la derecha -->
                          <div v-else class="d-flex align-items-center justify-content-between gap-3 mb-2">
                            <span class="timeline-badge-period-inline" role="text" :aria-label="`${t('accessibility.period')}: ${item.period}`">{{ item.period }}</span>
                            <h4 :id="`timeline-position-right-${index}`" class="timeline-job-theme mb-0">{{ item.position }}</h4>
                          </div>
                          <!-- Empresa debajo, sin icono -->
                          <h5 class="timeline-company-theme mb-0" v-if="item.company">
                            {{ item.company }}
                          </h5>
                        </div>
                      </div>
                      <!-- Layout para móvil/tablet -->
                      <div class="timeline-header mb-3" v-else>
                        <div class="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-2">
                          <h4 :id="`timeline-position-mobile-${index}`" class="timeline-job-theme mb-0">{{ item.position }}</h4>
                          <span class="timeline-badge-period animated-pill" role="text" :aria-label="`${t('accessibility.period')}: ${item.period}`">{{ item.period }}</span>
                        </div>
                        <h5 class="timeline-company-theme mb-0" v-if="item.company">
                          {{ item.company }}
        </h5>
                      </div>
                      <p :id="`timeline-desc-${index}`" class="timeline-description-theme mb-0">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </Timeline>
          </div>
          <div class="text-center mt-4">
            <button
              v-if="!showAllExperience && hasHiddenExperience"
              class="btn btn-primary-custom show-more-btn"
              @click="handleShowMore"
              :aria-expanded="showAllExperience"
              :aria-describedby="showAllExperience ? 'timeline-expanded' : 'timeline-collapsed'"
              role="button"
              tabindex="0"
            >
              <i class="bi bi-clock-history me-2" aria-hidden="true"></i>
              {{ t('experience.showMore') }}
            </button>
            <div id="timeline-expanded" class="visually-hidden">{{ t('accessibility.timelineVisible') }}</div>
            <div id="timeline-collapsed" class="visually-hidden">{{ t('accessibility.timelineCollapsed') }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from '../../composables/useI18n.js'
import imgProyecto1 from '../../assets/proyectos/proyecto1.jpg'
import Timeline from 'primevue/timeline'

const { t, currentLang } = useI18n()

// SEO: JSON-LD Structured Data
const generateStructuredData = () => {
  const projects = proyectosDestacados.value.filter(p => p.links?.find(l => l.url))
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Antonio Pulido",
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "IESA-CSIC"
    },
    "hasCredential": experience.value.map(exp => ({
      "@type": "EducationalOccupationalCredential",
      "name": exp.position,
      "recognizedBy": {
        "@type": "Organization", 
        "name": exp.company || "Professional Experience"
      },
      "dateCreated": exp.period
    })),
    "hasCreatedWork": projects.map(project => ({
      "@type": "SoftwareApplication",
      "name": project.title,
      "description": project.description,
      "programmingLanguage": project.tech,
      "url": project.links?.find(l => l.label === 'Demo')?.url || project.links?.find(l => l.url)?.url
    }))
  }
}

// Insertar structured data en el head
onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(generateStructuredData())
  script.id = 'experience-structured-data'
  document.head.appendChild(script)
  
  nextTick(() => {
    window.addEventListener('scroll', updateTimelineProgress)
    window.addEventListener('resize', updateTimelineProgress)
    updateTimelineProgress()
  })
})

onUnmounted(() => {
  // Limpiar structured data
  const existingScript = document.getElementById('experience-structured-data')
  if (existingScript) {
    document.head.removeChild(existingScript)
  }
  
  window.removeEventListener('scroll', updateTimelineProgress)
  window.removeEventListener('resize', updateTimelineProgress)
})

// Proyectos destacados
const showAllProjects = ref(false)
const proyectosDestacados = computed(() => ([
  {
    title: currentLang.value === 'en' ? 'IBN Cifras' : 'IBN Cifras',
    description: currentLang.value === 'en'
      ? 'Survey system for IESA - CSIC for social research and data analysis.'
      : 'Sistema de encuestas de IESA - CSIC para investigación social y análisis de datos.',
    image: imgProyecto1,
    tech: ['PHP', 'JavaScript', 'Chart.js', 'Bootstrap'],
    links: [
      { label: 'Demo', url: 'https://estudiosocial.es/IBN25001', icon: 'box-arrow-up-right' },
      { label: 'GitHub', url: '', icon: 'github' }
    ]
  },
  {
    title: currentLang.value === 'en' ? 'Project Alpha' : 'Proyecto Alfa',
    description: currentLang.value === 'en'
      ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.'
      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
    image: '',
    tech: ['Vue', 'Vite', 'CSS'],
    links: [
      { label: 'Demo', url: '', icon: 'box-arrow-up-right' },
      { label: 'GitHub', url: '', icon: 'github' }
    ]
  },
  {
    title: currentLang.value === 'en' ? 'Project Beta' : 'Proyecto Beta',
    description: currentLang.value === 'en'
      ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.'
      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
    image: '',
    tech: ['Vue', 'Vite', 'CSS'],
    links: [
      { label: 'Demo', url: '', icon: 'box-arrow-up-right' },
      { label: 'GitHub', url: '', icon: 'github' }
    ]
  }
]))

// Lógica responsive para proyectos
const windowWidth = ref(window.innerWidth)
const visibleProjects = computed(() => {
  if (showAllProjects.value) return proyectosDestacados.value
  
  if (windowWidth.value <= 768) { // Móvil
    return proyectosDestacados.value.slice(0, 1)
  } else if (windowWidth.value <= 1024) { // Tablet
    return proyectosDestacados.value.slice(0, 2)
  } else { // Desktop
    return proyectosDestacados.value.slice(0, 3)
  }
})
const showMoreProjectsBtn = computed(() => {
  if (showAllProjects.value) return false
  if (windowWidth.value <= 768) {
    return proyectosDestacados.value.length > 1
  } else if (windowWidth.value <= 1024) {
    return proyectosDestacados.value.length > 2
  } else {
    return proyectosDestacados.value.length > 3
  }
})

// Experiencia profesional multilingüe
const experience = computed(() => {
  if (currentLang.value === 'en') {
    return [
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
        description: 'Senior Technician in Web Application Development specializing in PHP, JavaScript, and databases. Freelance projects with WordPress, PrestaShop, and custom applications.',
        hidden: true
      },
      {
        period: '2017 - 2024',
        position: 'Other jobs',
        company: '',
        description: 'Various customer service positions: gas station attendant, online booking manager for rural homes, real estate advisor, etc.',
        hidden: true
      }
    ]
  } else {
    return [
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
        description: 'Técnico Superior en Desarrollo de Aplicaciones Web especializado en PHP, JavaScript y bases de datos. Proyectos freelance con WordPress, PrestaShop y aplicaciones a medida.',
        hidden: true
      },
      {
        period: '2017 - 2024',
        position: 'Otros puestos de trabajo',
        company: '',
        description: 'Diversos puestos de atención al cliente: expendedor de gasolinera, gestor de reservas online de casas rurales, asesor inmobiliario, etc.',
        hidden: true
      }
    ]
  }
})
const showAllExperience = ref(false)
const timelineRefs = ref([])
const timelineProgress = ref(0)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

function updateTimelineProgress() {
  const items = timelineRefs.value.filter(Boolean)
  if (!items.length) return timelineProgress.value = 0
  const windowHeight = window.innerHeight
  let maxVisible = 0
  items.forEach((el, idx) => {
    const rect = el.getBoundingClientRect()
    if (rect.top < windowHeight * 0.8) maxVisible = idx + 1
  })
  timelineProgress.value = (maxVisible / items.length) * 100
}
// Tengo sueño, ayuda :)

const visibleExperience = computed(() => {
  let arr = experience.value
  if (!showAllExperience.value) arr = arr.filter(e => !e.hidden)
  if (showAllExperience.value) return arr
  if (windowWidth.value <= 1024) return arr.slice(0, 1)
  return arr.slice(0, 2)
})

const timelineAlign = computed(() => windowWidth.value > 1024 ? 'alternate' : 'left')

// Función para manejar hover en proyectos con mejor accesibilidad
function handleProjectHover(event) {
  const card = event.currentTarget
  card.style.setProperty('--hover-scale', '1.02')
  // Anunciar cambio a lectores de pantalla
  card.setAttribute('aria-live', 'polite')
}

function handleProjectLeave(event) {
  const card = event.currentTarget
  card.style.setProperty('--hover-scale', '1')
  card.removeAttribute('aria-live')
}

// Mejor manejo de focus para accesibilidad
function handleButtonFocus(event) {
  event.target.style.transform = 'scale(1.05)'
  // Anunciar focus
  const button = event.target
  button.setAttribute('aria-live', 'polite')
  setTimeout(() => {
    event.target.style.transform = ''
    button.removeAttribute('aria-live')
  }, 200)
}

// Función para toggle de proyectos con anuncio para lectores de pantalla
function toggleProjects() {
  showAllProjects.value = !showAllProjects.value
  
  // Anunciar cambio de estado
  const message = showAllProjects.value 
    ? (currentLang.value === 'en' ? 'All projects are now visible' : 'Todos los proyectos ahora son visibles')
    : (currentLang.value === 'en' ? 'Showing featured projects only' : 'Mostrando solo proyectos destacados')
  
  // Crear anuncio temporal para lectores de pantalla
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'assertive')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'visually-hidden'
  announcement.textContent = message
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

const hasHiddenExperience = computed(() => {
  return experience.value.some(item => item.hidden)
})

function handleShowMore() {
  showAllExperience.value = true
  
  // Anunciar cambio para lectores de pantalla
  const message = currentLang.value === 'en' 
    ? 'Full professional timeline is now visible'
    : 'La cronología profesional completa ahora es visible'
  
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'assertive')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'visually-hidden'
  announcement.textContent = message
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
</script>

<style>
/* Estilos generales */
.experience-section {
  padding: 4rem 0;
  background: var(--background-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Accesibilidad - Screen readers */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* Focus visible para mejor accesibilidad */
.btn-primary-custom:focus-visible,
.show-more-btn:focus-visible {
  outline: 3px solid var(--persian-green);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(42, 157, 143, 0.2);
}

/* Skip links para lectores de pantalla */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--persian-green);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 100;
}

.skip-link:focus {
  top: 6px;
}

.section-title,
.subsection-title,
.timeline-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subsection-title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}

[data-theme="dark"] .section-title,
[data-theme="dark"] .subsection-title,
[data-theme="dark"] .timeline-title {
  filter: brightness(1.2) contrast(1.2);
}

.experience-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Estilos para proyectos */
.project-card-theme {
  background: var(--background-secondary);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  border: 1.5px solid var(--border-color);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 370px;
  transition: all 0.3s ease;
  will-change: transform, box-shadow;
  contain: layout style paint;
}

.project-card-theme::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--cerulean), var(--persian-green), var(--saffron));
  border-top-left-radius: var(--border-radius-xl);
  border-top-right-radius: var(--border-radius-xl);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  z-index: 3;
}

.project-card-theme:hover::before {
  transform: scaleX(1);
}

.project-card-theme:hover {
  box-shadow: 0 8px 32px rgba(148,210,189,0.18);
  border-color: var(--persian-green);
  transform: translateY(-8px);
}

.project-img-container {
  position: relative;
  width: 100%;
  height: 200px;
  border-top-left-radius: var(--border-radius-xl);
  border-top-right-radius: var(--border-radius-xl);
  overflow: hidden;
}

.project-img-theme {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.project-card-theme:hover .project-img-theme {
  filter: brightness(0.65) saturate(0.9);
}

/* Solo aplicar hover effects en desktop */
@media (min-width: 1025px) {
  .project-card-theme:hover .project-img-actions {
    opacity: 1;
    pointer-events: all;
  }
}

.project-img-actions {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 4;
}

.project-img-actions.show-always {
  opacity: 1 !important;
  pointer-events: all !important;
  position: static;
  padding-top: 0.5rem;
  flex-direction: row;
}

.project-content-theme {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-title-theme {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.project-description-theme {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tech-label {
  color: var(--text-primary);
  font-weight: 600;
}

[data-theme="dark"] .tech-label {
  color: var(--honeydew);
}

.badge-theme {
  background: var(--tiffany-blue);
  color: var(--charcoal);
  padding: 0.18em 0.7em;
  border-radius: 50px !important;
  font-size: 0.78em;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(69,123,157,0.08);
}

.btn-theme {
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--charcoal) !important;
  border: none;
  font-weight: 600;
  border-radius: 50px !important;
  box-shadow: 0 2px 8px rgba(69,123,157,0.08);
  transition: all 0.2s ease;
  padding: 0.75em 1.5em;
}

.btn-theme:hover {
  background: linear-gradient(135deg, var(--saffron), var(--persian-green));
  color: var(--honeydew) !important;
  transform: scale(1.05);
}

.btn-primary-custom {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  color: var(--honeydew) !important;
  border: none;
  font-weight: 600;
  border-radius: 50px !important;
  box-shadow: 0 4px 12px rgba(69, 123, 157, 0.3);
  transition: var(--transition-normal);
  padding: 0.75em 1.5em;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  min-height: 44px;
}

.btn-primary-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(42, 157, 143, 0.4);
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--honeydew) !important;
}

.btn-theme-disabled {
  background: var(--background-secondary);
  color: var(--text-muted) !important;
  border: 1.5px dashed var(--border-color);
  border-radius: 50px !important;
  font-weight: 600;
  padding: 0.75em 1.5em;
  cursor: not-allowed;
}

.show-more-btn {
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--charcoal) !important;
  border: none;
  font-weight: 600;
  border-radius: 50px !important;
  box-shadow: 0 2px 8px rgba(69,123,157,0.08);
  padding: 0.75em 1.5em;
  transition: all 0.2s ease;
  min-width: 200px;
  text-align: center;
}

.show-more-btn:hover {
  background: linear-gradient(135deg, var(--saffron), var(--persian-green));
  color: var(--honeydew) !important;
  transform: scale(1.05);
}

/* Responsive para proyectos */
@media (max-width: 1024px) {
  .project-card-theme {
    min-height: 340px;
  }
  .project-img-container {
    height: 160px;
  }
  
  /* Botones en tablet se comportan como en móvil */
  .project-img-actions {
    opacity: 0;
    visibility: hidden;
  }
  
  .project-img-actions.show-always {
    opacity: 1;
    visibility: visible;
  }
  
  /* Asegurar que los botones del contenido sean visibles y más redondos */
  .project-content-theme .btn-primary-custom {
    min-height: 44px;
    font-size: 0.9rem;
    padding: 0.75em 1.5em;
    border-radius: 50px !important;
  }
}

@media (max-width: 768px) {
  .project-card-theme {
    min-height: 320px;
  }
  .project-img-container {
    height: 140px;
  }
  
  .project-content-theme .btn-primary-custom {
    min-height: 42px;
    font-size: 0.85rem;
    padding: 0.7em 1.4em;
    border-radius: 50px !important;
  }
}

@media (max-width: 480px) {
  .project-card-theme {
    min-height: 300px;
    border-radius: var(--border-radius-lg);
  }
  .project-img-container {
    height: 120px;
  }
  .project-content-theme {
    padding: 1rem;
  }
  
  .project-content-theme .btn-primary-custom {
    min-height: 40px;
    font-size: 0.8rem;
    padding: 0.6em 1.2em;
    border-radius: 50px !important;
  }
}

.timeline-marker-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  border: 3px solid var(--persian-green);
  box-shadow: 0 0 0 4px var(--background-primary);
  margin: 0.5rem auto;
  animation: dotPulse 1.2s cubic-bezier(.4,0,.2,1) infinite alternate;
  color: white;
  font-size: 0.9rem;
  line-height: 1;
  position: relative;
}

.timeline-marker-custom i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes dotPulse {
  0% { box-shadow: 0 0 0 4px var(--background-primary), 0 0 0 0 var(--persian-green, #2a9d8f); }
  100% { box-shadow: 0 0 0 4px var(--background-primary), 0 0 12px 4px var(--persian-green, #2a9d8f); }
}

/* Timeline alineado a la izquierda en móvil/tablet */
@media (max-width: 1024px) {
  .p-timeline.p-timeline-vertical {
    justify-content: flex-start !important;
    align-items: flex-start !important;
  }
  .p-timeline-event-opposite {
    display: none !important;
  }
  .p-timeline-event-content {
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100%;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
    box-sizing: border-box;
  }
  .timeline-card-theme {
    width: 100%;
    box-sizing: border-box;
    margin-left: 0;
    margin-right: 0;
  }
  .p-timeline-event {
    flex-direction: row !important;
    align-items: flex-start !important;
  }
  .p-timeline-event-marker {
    left: 0 !important;
    margin-left: 0 !important;
    margin-right: 1rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .p-timeline-vertical::before {
    left: 16px !important;
    width: 2px !important;
    background: linear-gradient(180deg, var(--persian-green), var(--saffron)) !important;
    opacity: 0.8 !important;
    display: block !important;
    visibility: visible !important;
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    height: 100% !important;
  }
}

/* Modo oscuro para tarjetas del timeline */
.timeline-card-theme {
  background: var(--background-secondary);
  color: var(--text-primary);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  border: 1.5px solid var(--border-color);
  transition: background 0.3s, color 0.3s, border-color 0.3s;
  /* Unifica borde y fondo con HeroSection y ContactSection */
}
[data-theme="dark"] .timeline-card-theme {
  background: var(--background-primary);
  color: var(--honeydew);
  border-color: var(--persian-green);
}
.timeline-card-theme .card-body {
  background: transparent;
  color: inherit;
}

/* Animación de entrada más suave */
.timeline-fade-in {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  animation: fadeInUpTimeline 0.7s cubic-bezier(.4,0,.2,1) forwards;
}
@keyframes fadeInUpTimeline {
  to {
    opacity: 1;
    transform: none;
  }
}

/* Animación de la línea del timeline mejorada */
.p-timeline-vertical::before {
  animation: timelineLineGrow 1.2s cubic-bezier(.4,0,.2,1) forwards;
  transform-origin: top;
  height: 0 !important;
  background: linear-gradient(180deg, var(--cerulean), var(--persian-green), var(--saffron));
  opacity: 0.7;
}
.p-timeline-vertical.p-timeline-animated::before {
  animation: timelineLineGrow 1.2s cubic-bezier(.4,0,.2,1) forwards;
}
@keyframes timelineLineGrow {
  0% {
    height: 0;
    opacity: 0.5;
    filter: blur(2px);
  }
  80% {
    filter: blur(0.5px);
  }
  100% {
    height: 100%;
    opacity: 1;
    filter: blur(0);
  }
}

.timeline-badge-period {
  font-size: 0.85em;
  padding: 0.4em 0.9em;
  border-radius: 50px !important;
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--charcoal);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(69,123,157,0.08);
  border: none;
  animation: pillPop 0.7s cubic-bezier(.4,0,.2,1);
  white-space: nowrap;
  min-width: max-content;
}

.timeline-badge-period-inline {
  font-size: 0.8em;
  padding: 0.3em 0.8em;
  border-radius: 50px !important;
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--charcoal);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(69,123,157,0.08);
  border: none;
  white-space: nowrap;
  animation: pillPop 0.7s cubic-bezier(.4,0,.2,1);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.timeline-info {
  flex: 1;
  min-width: 0; /* Permite que el texto se ajuste */
}

.alternate-left {
  text-align: left;
}

.alternate-right {
  text-align: right;
}

@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .timeline-badge-period {
    align-self: flex-start;
    font-size: 0.8em;
    padding: 0.3em 0.8em;
  }
}

@keyframes pillPop {
  0% { transform: scale(0.7); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

/* Reducir movimiento para usuarios con preferencias de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .project-card-theme,
  .timeline-card-theme,
  .btn-primary-custom,
  .show-more-btn {
    transition: none !important;
    animation: none !important;
  }
  
  .timeline-fade-in {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
  
  .timeline-marker-custom {
    animation: none !important;
  }
}

/* Mejorar contraste para modo alto contraste */
@media (prefers-contrast: high) {
  .project-card-theme {
    border: 2px solid var(--text-primary);
  }
  
  .btn-primary-custom {
    border: 2px solid var(--persian-green);
  }
  
  .timeline-marker-custom {
    border-width: 4px;
  }
}
</style>

