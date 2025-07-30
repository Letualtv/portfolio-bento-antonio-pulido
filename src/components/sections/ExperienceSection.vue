<template>
  <section id="experiencia" class="experience-section py-5">
    <div class="container">
      <h2 class="section-title text-center mb-5">{{ t('experience.title') }}</h2>
      
      <div class="experience-content">
        <!-- Proyectos destacados -->
        <transition-group name="project-fade" tag="div" class="row g-4 justify-content-center">
          <div 
            v-for="project in visibleProjects" 
            :key="project.title" 
            class="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
          >
            <div class="project-card-theme w-100 h-100">
              <div class="project-img-container">
                <img v-if="project.image" :src="project.image" :alt="project.title" class="project-img-theme" />
                <!-- Botones sobre la imagen -->
                <div class="project-img-actions" :class="{ 'show-always': windowWidth <= 1024 }">
                  <template v-for="type in ['Demo','GitHub']">
                    <template v-if="project.links && project.links.find(l => l.label === type && l.url)">
                      <a
                        :href="project.links.find(l => l.label === type).url"
                        class="btn btn-theme d-flex align-items-center gap-2 px-3"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="type + ' ' + project.title"
                      >
                        <i :class="`bi bi-${project.links.find(l => l.label === type).icon}`" aria-hidden="true"></i>
                        <span>{{ type }}</span>
                      </a>
                    </template>
                    <template v-else>
                      <span class="btn btn-theme-disabled d-flex align-items-center gap-2 px-3 opacity-75" :aria-label="type + ' no disponible'">
                        <i :class="`bi bi-x-circle`" aria-hidden="true"></i>
                        <span>No disponible</span>
                      </span>
                    </template>
                  </template>
                </div>
              </div>
              <div class="project-content-theme d-flex flex-column">
                <h4 class="project-title-theme mb-2">{{ project.title }}</h4>
                <p class="project-description-theme flex-grow-1">{{ project.description }}</p>
                <div v-if="project.tech && project.tech.length" class="mb-2 d-flex flex-wrap gap-2">
                  <span v-for="tech in project.tech" :key="tech" class="badge badge-theme">{{ tech }}</span>
                </div>
                <!-- Botones en móvil -->
                <div v-if="windowWidth <= 1024" class="d-flex flex-wrap gap-2 mt-2 justify-content-center">
                  <template v-for="type in ['Demo','GitHub']">
                    <template v-if="project.links && project.links.find(l => l.label === type && l.url)">
                      <a
                        :href="project.links.find(l => l.label === type).url"
                        class="btn btn-theme d-flex align-items-center gap-2 px-3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i :class="`bi bi-${project.links.find(l => l.label === type).icon}`"></i>
                        <span>{{ currentLang === 'en' ? (type === 'Demo' ? 'Live demo' : 'GitHub') : (type === 'Demo' ? 'Demo' : 'GitHub') }}</span>
                      </a>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="d-flex justify-content-center mt-3" v-if="showMoreProjectsBtn">
          <button class="show-more-btn" @click="showAllProjects = true" tabindex="0">
            {{ currentLang === 'en' ? 'See more projects' : 'Ver más proyectos' }}
          </button>
        </div>
        <!-- Timeline simplificado -->
        <section class="timeline-section py-5">
          <h3 class="timeline-title text-center mb-5">
            {{ t('experience.timelineTitle') }}
          </h3>
          <Timeline :value="visibleExperience" :align="timelineAlign" layout="vertical" :animate="true">
            <template #marker>
              <span class="timeline-marker-custom"></span>
            </template>
            <template #content="slotProps">
              <div class="card timeline-card-theme mb-4 timeline-fade-in position-relative">
                <div class="card-body p-4">
                  <span class="timeline-badge-period animated-pill">{{ slotProps.item.period }}</span>
                  <h5 class="timeline-job-theme mb-1">{{ slotProps.item.position }}</h5>
                  <h6 class="timeline-company-theme mb-2">{{ slotProps.item.company }}</h6>
                  <p class="timeline-description-theme mb-0">{{ slotProps.item.description }}</p>
                </div>
              </div>
            </template>
          </Timeline>
          <div class="d-flex justify-content-center mt-4">
            <button
              v-if="!showAllExperience && experience.length > visibleExperience.length"
              class="show-more-btn"
              @click="handleShowMore"
              tabindex="0"
            >
              {{ t('experience.showMore') }}
            </button>
          </div>
        </section>
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

onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', updateTimelineProgress)
    window.addEventListener('resize', updateTimelineProgress)
    updateTimelineProgress()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateTimelineProgress)
  window.removeEventListener('resize', updateTimelineProgress)
})

const visibleExperience = computed(() => {
  let arr = experience.value
  if (!showAllExperience.value) arr = arr.filter(e => !e.hidden)
  if (showAllExperience.value) return arr
  if (windowWidth.value <= 1024) return arr.slice(0, 1)
  return arr.slice(0, 2)
})

const timelineAlign = computed(() => windowWidth.value > 1024 ? 'alternate' : 'left')

function handleShowMore() {
  showAllExperience.value = true
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

.section-title,
.timeline-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

[data-theme="dark"] .section-title,
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

.project-card-theme:hover .project-img-actions {
  opacity: 1;
  pointer-events: all;
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

.badge-theme {
  background: var(--tiffany-blue);
  color: var(--charcoal);
  padding: 0.18em 0.7em;
  border-radius: var(--border-radius-sm);
  font-size: 0.78em;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(69,123,157,0.08);
}

.btn-theme {
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--charcoal) !important;
  border: none;
  font-weight: 600;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(69,123,157,0.08);
  transition: all 0.2s ease;
  padding: 0.5em 1.2em;
}

.btn-theme:hover {
  background: linear-gradient(135deg, var(--saffron), var(--persian-green));
  color: var(--honeydew) !important;
}

.btn-theme-disabled {
  background: var(--background-secondary);
  color: var(--text-muted) !important;
  border: 1.5px dashed var(--border-color);
  border-radius: 30px;
  font-weight: 600;
  padding: 0.5em 1.2em;
  cursor: not-allowed;
}

.show-more-btn {
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--charcoal) !important;
  border: none;
  font-weight: 600;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(69,123,157,0.08);
  padding: 0.5em 1.2em;
  transition: all 0.2s ease;
  min-width: 200px;
  text-align: center;
}

.show-more-btn:hover {
  background: linear-gradient(135deg, var(--saffron), var(--persian-green));
  color: var(--honeydew) !important;
}

/* Responsive para proyectos */
@media (max-width: 1024px) {
  .project-card-theme {
    min-height: 340px;
  }
  .project-img-container {
    height: 160px;
  }
}

@media (max-width: 768px) {
  .project-card-theme {
    min-height: 320px;
  }
  .project-img-container {
    height: 140px;
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
}

.timeline-marker-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  border: 4px solid var(--persian-green);
  box-shadow: 0 0 0 4px var(--background-primary);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  animation: dotPulse 1.2s cubic-bezier(.4,0,.2,1) infinite alternate;
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
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  z-index: 2;
  font-size: 0.95em;
  padding: 0.45em 1.1em;
  border-radius: 1.5em;
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--charcoal);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(69,123,157,0.08);
  border: none;
  animation: pillPop 0.7s cubic-bezier(.4,0,.2,1);
}
@keyframes pillPop {
  0% { transform: scale(0.7); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
</style>

