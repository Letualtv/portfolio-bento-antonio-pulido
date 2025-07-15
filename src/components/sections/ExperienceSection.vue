<template>
  <section id="experiencia" class="section experience-section">
    <div class="container">
      <h2 class="section-title">{{ t('sections.experienceTitle') }}</h2>
      
      <div class="experience-content">
        <!-- Proyectos destacados -->
        <div class="projects-grid">
          <div 
            v-for="project in projects"
            :key="project.id"
            class="project-card"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
              <div class="project-overlay">
                <div class="project-links">
                  <a :href="project.demo" class="project-link" target="_blank" rel="noopener noreferrer">
                    <i class="bi bi-eye" aria-hidden="true"></i>
                    Ver demo
                  </a>
                  <a :href="project.code" class="project-link" target="_blank" rel="noopener noreferrer">
                    <i class="bi bi-github" aria-hidden="true"></i>
                    Código
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span 
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Timeline de experiencia -->
        <div class="timeline-section">
          <h3 class="timeline-title">Experiencia profesional</h3>
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
              Ver más experiencia
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

const { t } = useI18n()

const projects = [
  {
    id: 1,
    title: 'Sistema de Encuestas IESA-CSIC',
    description: 'Sistema completo para la creación, distribución y análisis de encuestas sociales desarrollado para investigadores del IESA-CSIC.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Chart.js', 'Bootstrap'],
    demo: '#',
    code: '#'
  },
  {
    id: 2,
    title: 'Plataforma E-commerce PrestaShop',
    description: 'Tienda online completa con gestión de productos, pagos integrados y panel de administración personalizado.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    technologies: ['PrestaShop', 'PHP', 'MySQL', 'JavaScript', 'CSS3'],
    demo: '#',
    code: '#'
  },
  {
    id: 3,
    title: 'Aplicación 3D Odontológica',
    description: 'Aplicación web 3D para visualización dental con WebGL, formularios interactivos y integración con Firebase.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    technologies: ['WebGL', 'Three.js', 'Firebase', 'AWS', 'JavaScript'],
    demo: '#',
    code: '#'
  }
]

const experience = [
  {
    period: '2024 - Presente',
    position: 'Full Stack Developer',
    company: 'IESA-CSIC',
    description: 'Desarrollo de sistemas avanzados de encuestas sociales con Vue.js y Laravel. Creación de herramientas de análisis de datos y gestión de investigaciones para el Instituto de Estudios Sociales Avanzados.'
  },
  {
    period: '2024 (3 meses)',
    position: 'Prácticas profesionales',
    company: 'Medac',
    description: 'Desarrollo web full stack orientado al metaverso. Diseño y programación de la web de entrada al metaverso, un panel de control para estudiantes en el aula virtual y una plataforma para un nuevo proyecto de prácticas con realidad virtual.'
  },
  {
    period: '2022 - 2024',
    position: 'Grado Superior en Desarrollo de Aplicaciones Web',
    company: 'Formación Profesional',
    description: 'Técnico Superior en Desarrollo de Aplicaciones Web con especialización en PHP, JavaScript y bases de datos. Desarrollo de proyectos freelance paralelos con WordPress, PrestaShop y aplicaciones personalizadas.'
  }
]

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
  if (showAllExperience.value) return experience
  // En móvil/tablet, solo mostrar la primera experiencia
  if (windowWidth.value <= 1024) return [experience[0]]
  return experience
})

function handleShowMore() {
  showAllExperience.value = true
}
</script>

<style scoped>
.experience-section {
  padding: 100px 0;
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
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color);
  transform: translateX(-50%);
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
  width: calc(50% - 2rem);
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
@media (max-width: 768px) {
  .experience-section {
    padding: 80px 0;
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
    padding: 60px 0;
  }
  
  .container {
    padding: 0 0.75rem;
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
