<template>
  <section id="experiencia" class="experience-section">
    <div class="container">
      <h2 class="section-title">{{ t('experience.title') }}</h2>
      
      <div class="experience-content">
        <!-- Proyectos destacados próximamente -->
        <div class="projects-grid" style="display: flex; justify-content: center; align-items: center; min-height: 180px;">
          <span style="font-size: 1.3rem; color: var(--text-muted); font-weight: 600;">Próximamente...</span>
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
import { useI18n } from '../../composables/useI18n.js'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { t, currentLang } = useI18n()

// Los proyectos ahora se obtienen de t('experience.projects')

// Experiencia profesional internacionalizada
const experience = computed(() => {
  return t('experienceList')
})

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
  display: grid;
  gap: 4rem;
}

/* Proyectos */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--background-secondary);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
  border: 1px solid var(--border-color);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-normal);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(38, 70, 83, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-normal);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--persian-green);
  color: white;
  text-decoration: none;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  transition: var(--transition-normal);
}

.project-link:hover {
  background: var(--saffron);
  color: var(--charcoal);
  transform: translateY(-2px);
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.project-description {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: var(--tiffany-blue);
  color: var(--charcoal);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
}

/* Timeline */
.timeline-section {
  margin-top: 2rem;
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
  margin: 1.5rem auto 0 auto;
  padding: 0.75rem 2rem;
  background: var(--persian-green);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background var(--transition-normal);
}

.show-more-btn:hover {
  background: var(--saffron);
  color: var(--charcoal);
}

@media (min-width: 1025px) {
  .show-more-btn {
    display: none;
  }
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
</style>
