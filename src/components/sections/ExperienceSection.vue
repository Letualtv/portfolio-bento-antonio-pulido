<template>
  <section id="experiencia" class="experience-section">
    <div class="container">
      <h2 class="section-title">{{ t('experience.title') }}</h2>
      
      <div class="experience-content">
        <!-- Proyectos destacados -->
        <transition-group name="project-fade" tag="div" class="row g-4 justify-content-center">
          <div v-for="project in visibleProjects" :key="project.title" class="col-12 col-sm-10 col-md-6 col-lg-4 d-flex align-items-stretch">
            <div class="project-card-theme w-100 h-100">
              <div class="project-img-container">
                <img v-if="project.image" :src="project.image" :alt="project.title" class="project-img-theme" />
                <!-- Botones sobre la imagen en desktop, abajo en móvil/tablet -->
                <div 
                  class="project-img-actions"
                  :class="{ 'show-always': windowWidth <= 1024 }"
                >
                  <template v-for="type in ['Demo','GitHub']">
                    <template v-if="project.links && project.links.find(l => l.label === type && l.url)">
                      <a
                        :href="project.links.find(l => l.label === type).url"
                        class="btn btn-theme d-flex align-items-center gap-2 px-3"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="type + ' ' + project.title"
                      >
                        <i v-if="project.links.find(l => l.label === type).icon" :class="`bi bi-${project.links.find(l => l.label === type).icon}`" aria-hidden="true"></i>
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
                <!-- En móvil/tablet los botones van abajo -->
                <div v-if="windowWidth <= 1024" class="d-flex flex-wrap gap-2 mt-2 justify-content-center">
                  <template v-for="type in ['Demo','GitHub']">
                    <template v-if="project.links && project.links.find(l => l.label === type && l.url)">
                      <a
                        :href="project.links.find(l => l.label === type).url"
                        class="btn btn-theme d-flex align-items-center gap-2 px-3"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="(currentLang === 'en' ? (type === 'Demo' ? 'Live demo' : 'GitHub') : (type === 'Demo' ? 'Demo' : 'GitHub')) + ' ' + project.title"
                      >
                        <i v-if="project.links.find(l => l.label === type).icon" :class="`bi bi-${project.links.find(l => l.label === type).icon}`" aria-hidden="true"></i>
                        <span>{{ currentLang === 'en' ? (type === 'Demo' ? 'Live demo' : 'GitHub') : (type === 'Demo' ? 'Demo' : 'GitHub') }}</span>
                      </a>
                    </template>
                    <template v-else>
                      <span class="btn btn-theme-disabled d-flex align-items-center gap-2 px-3 opacity-75" :aria-label="currentLang === 'en' ? (type === 'Demo' ? 'Live demo not available' : 'GitHub not available') : (type === 'Demo' ? 'Demo no disponible' : 'GitHub no disponible')">
                        <i :class="`bi bi-x-circle`" aria-hidden="true"></i>
                        <span>{{ currentLang === 'en' ? (type === 'Demo' ? 'Not available' : 'Not available') : 'No disponible' }}</span>
                      </span>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="d-flex justify-content-center mt-3" v-if="showMoreProjectsBtn">
          <button class="show-more-btn" @click="showAllProjects = true">
            {{ currentLang === 'en' ? 'See more projects' : 'Ver más proyectos' }}
          </button>
        </div>

        <!-- Timeline de experiencia -->
        <div class="timeline-section">
          <h3 class="timeline-title">{{ t('experience.timelineTitle') }}</h3>
          <div class="timeline">
            <transition-group name="timeline-fade" tag="div">
              <div 
                v-for="(exp, index) in visibleExperience"
                :key="index"
                class="timeline-item"
              >
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <div class="timeline-date">{{ exp.period }}</div>
                  <h4 class="timeline-job">{{ exp.position }}</h4>
                  <div class="timeline-company">{{ exp.company }}</div>
                  <p class="timeline-description">{{ exp.description }}</p>
                </div>
              </div>
            </transition-group>
            <button 
              v-if="!showAllExperience && experience.length > 1 && windowWidth <= 1024"
              class="show-more-btn"
              @click="handleShowMore"
            >
              {{ t('experience.showMore') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../composables/useI18n.js'
import imgProyecto1 from '../../assets/proyectos/proyecto1.jpg'

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
      ? 'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.'
      : 'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
    image: '',
    tech: ['JavaScript', 'Bootstrap'],
    links: [
      { label: 'Demo', url: '', icon: 'box-arrow-up-right' },
      { label: 'GitHub', url: '', icon: 'github' }
    ]
  },
  {
    title: currentLang.value === 'en' ? 'Project Gamma' : 'Proyecto Gamma',
    description: currentLang.value === 'en'
      ? 'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'
      : 'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
    image: '',
    tech: ['PHP', 'MySQL'],
    links: [
      { label: 'Demo', url: '', icon: 'box-arrow-up-right' },
      { label: 'GitHub', url: '', icon: 'github' }
    ]
  }
]))

const visibleProjects = computed(() => {
  return showAllProjects.value ? proyectosDestacados.value : proyectosDestacados.value.slice(0, 3)
})
const showMoreProjectsBtn = computed(() => {
  // Asegura reactividad y correcto refresco
  return proyectosDestacados.value.length > 3 && !showAllProjects.value
})

// Experiencia profesional internacionalizada
const experience = computed(() => t('experienceList'))
const showAllExperience = ref(false)
const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const visibleExperience = computed(() => {
  if (showAllExperience.value) return experience.value
  // En móvil/tablet, solo mostrar la primera experiencia
  if (windowWidth.value <= 1024) return [experience.value[0]]
  return experience.value
})

function handleShowMore() {
  showAllExperience.value = true
}
</script>

<style scoped>
.experience-section {
  padding: 4rem 0;
  background: var(--background-primary);
  transition: background-color var(--transition-normal);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}


/* Proyectos destacados con consonancia visual */
.project-card-theme {
  background: var(--background-secondary);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  border: 1.5px solid var(--border-color);
  overflow: hidden; /* Volver a poner para que la línea y overlay respeten el border-radius */
  display: flex;
  flex-direction: column;
  min-height: 370px;
  max-width: 400px;
  margin: 0 auto;
  transition: box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), border-color 0.2s, transform 0.25s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  backface-visibility: hidden;
  perspective: 1px;
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
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  z-index: 3;
}
.project-card-theme:hover::before {
  transform: scaleX(1);
}
.project-card-theme:hover {
  box-shadow: 0 8px 32px 0 rgba(148,210,189,0.18), 0 1.5px 6px 0 rgba(69,123,157,0.08);
  border-color: var(--persian-green);
  transform: translateY(-8px) scale(1.025);
  z-index: 2;
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
  background: var(--background-primary);
  display: block;
  transition: filter 0.3s cubic-bezier(0.4,0,0.2,1);
}
.project-card-theme:hover .project-img-theme {
  filter: brightness(0.65) saturate(0.9);
}
/* Acciones sobre la imagen: centradas y con transición de opacidad */
.project-img-actions {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.4,0,0.2,1);
  z-index: 4;
}
.project-card-theme:hover .project-img-actions {
  opacity: 1;
  pointer-events: all;
}

/* Siempre mostrar los botones en móvil/tablet */
.project-img-actions.show-always {
  opacity: 1 !important;
  pointer-events: all !important;
  position: static;
  background: none;
  padding: 0.5rem 0 0 0;
  margin-top: 0.5rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.project-content-theme {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}
.project-title-theme {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--text-primary);
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
  transition: background 0.2s, color 0.2s;
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
@media (max-width: 850px) {
  .project-card-theme {
    max-width: 95vw;
    min-height: 340px;
  }
  .project-img-container {
    height: 160px;
    border-top-left-radius: var(--border-radius-lg);
    border-top-right-radius: var(--border-radius-lg);
  }
  .project-img-theme {
    height: 100%;
    border-top-left-radius: var(--border-radius-lg);
    border-top-right-radius: var(--border-radius-lg);
  }
  .timeline-section {
    padding-left: 0 !important;
  }
  .timeline {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .timeline-item {
    flex-direction: column !important;
    align-items: flex-start !important;
    padding-left: 0 !important;
    position: relative;
    gap: 0.5rem;
  }
  .timeline-dot {
    left: 0.5rem !important;
    top: 0.5rem;
    transform: none !important;
    position: absolute;
    animation: dotFadeIn 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .timeline-content {
    width: 100% !important;
    margin-left: 2.5rem !important;
    padding: 1rem !important;
  }
}
@keyframes dotFadeIn {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@media (max-width: 480px) {
  .project-card-theme {
    max-width: 99vw;
    min-height: 300px;
    border-radius: var(--border-radius-lg);
  }
  .project-img-container {
    height: 120px;
    border-top-left-radius: var(--border-radius-lg);
    border-top-right-radius: var(--border-radius-lg);
  }
  .project-img-theme {
    height: 100%;
    border-top-left-radius: var(--border-radius-lg);
    border-top-right-radius: var(--border-radius-lg);
  }
  .project-content-theme {
    padding: 1rem;
  }
}
.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
}

[data-theme="dark"] .section-title {
  filter: brightness(1.2) contrast(1.2);
}

.experience-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Proyectos */

/* Timeline */
.timeline-section {
  margin-top: 2rem;
  padding-left: 0 !important;
}

.timeline-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--text-primary);
}

[data-theme="dark"] .timeline-title {
  filter: brightness(1.2) contrast(1.2);
}

.timeline {
  position: relative;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  width: 2px;
  background: var(--border-color);
  transform: translateX(-50%);
  /* Ajusta la línea para que empiece y termine en el centro de los dots */
  top: calc(16px / 2); /* 16px es el tamaño del dot, la línea empieza en el centro del primero */
  bottom: calc(16px / 2); /* la línea termina en el centro del último dot */
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.timeline-item:nth-child(odd) {
  flex-direction: row-reverse;
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-right: 2rem;
  margin-left: 0;
  text-align: right;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-left: 2rem;
  margin-right: 0;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  background: var(--persian-green);
  border: 3px solid var(--background-secondary);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 0 0 4px var(--tiffany-blue);
}

.timeline-content {
  background: var(--background-secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  width: calc(50% - 4rem);
  margin-left: 2rem;
}

.timeline-date {
  color: var(--persian-green);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.timeline-job {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.timeline-company {
  color: var(--secondary-color);
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.timeline-description {
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

/* Botón "Ver más experiencia" */
.show-more-btn {
  display: block;
  margin: 0.5rem auto 0 auto;
  padding: 0.45rem 1.2rem;
  background: var(--background-secondary);
  color: var(--text-primary);
  border: 1.5px solid var(--border-color);
  border-radius: 24px;
  font-weight: 500;
  font-size: 0.98rem;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(69,123,157,0.06);
  transition: background 0.18s, color 0.18s, border-color 0.18s;
}

.show-more-btn:hover {
  background: var(--background-primary);
  color: var(--persian-green);
  border-color: var(--persian-green);
}



/* Responsive Design */
@media (max-width: 850px) {
  .experience-section {
    padding: 4rem 0;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-card {
    margin: 0 auto;
    max-width: 400px;
  }
  
  .timeline::before {
    left: 1rem;
  }
  
  .timeline-item {
    flex-direction: column !important;
    align-items: flex-start;
    padding-left: 3rem;
  }
  
  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    margin: 0;
    text-align: left;
    width: 100%;
  }
  
  .timeline-dot {
    left: 1rem;
    transform: none;
  }
  
  .timeline-content {
    width: calc(100% - 2rem);
  }
}

@media (max-width: 480px) {
  .experience-section {
    padding: 4rem 0;
  }
  

  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-content {
    padding: 1rem;
  }
  
  .timeline-content {
    padding: 1rem;
  }
  
  .project-links {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .project-link {
    justify-content: center;
  }
}

/* Transiciones del timeline */
.timeline-fade-enter-active, .timeline-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.timeline-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.timeline-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.timeline-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.timeline-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Animación de entrada para proyectos */
.project-fade-enter-active, .project-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.project-fade-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.97);
}
.project-fade-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.project-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.project-fade-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.97);
}

.timeline-dot-boot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--persian-green);
  border: 3px solid var(--background-secondary);
  box-shadow: 0 0 0 4px var(--tiffany-blue);
  animation: dotFadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
}
.text-theme {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--persian-green);
}

</style>