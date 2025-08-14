<template>
  <section id="about" class="about-section">
    <div class="container-fluid container-xl">
      <!-- Header con stats -->
      <div class="about-header">
        <h2 class="section-title">{{ t('about.title') }}</h2>
        <p class="section-subtitle"></p>
        
        <!-- Stats Dashboard -->
        <div class="stats-grid">
          <div class="stat-card" data-aos="fade-up" data-aos-delay="100">
            <div class="stat-number">{{ experienceData.value }}</div>
            <div class="stat-label">{{ experienceData.label }}</div>
            <div class="stat-icon">
              <i class="bi bi-calendar-check"></i>
            </div>
          </div>
          <div class="stat-card" data-aos="fade-up" data-aos-delay="200">
            <div class="stat-number">10+</div>
            <div class="stat-label">{{ t('about.projectsCompleted') }}</div>
            <div class="stat-icon">
              <i class="bi bi-folder-check"></i>
            </div>
          </div>
          <div class="stat-card" data-aos="fade-up" data-aos-delay="300">
            <div class="stat-number">8+</div>
            <div class="stat-label">{{ t('about.technologiesMastered') }}</div>
            <div class="stat-icon">
              <i class="bi bi-cpu"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Bento Grid -->
      <div class="bento-grid">
        <!-- Specialization Card -->
        <div class="bento-card specialization" data-aos="fade-up" data-aos-delay="200">
          <div class="card-header">
            <h3 class="card-title">{{ t('about.specialization.title') }}</h3>
            <p class="card-subtitle">{{ t('about.specialization.subtitle') }}</p>
          </div>
          <div class="card-content">
            <div class="specialization-content">
              <div class="spec-item vue-spec">
                <div class="spec-icon">
                  <i class="bi bi-code-square"></i>
                </div>
                <div class="spec-info">
                  <h4>{{ t('about.specialization.vue') }}</h4>
                  <p>{{ t('about.specialization.vueDesc') }}</p>
                </div>
              </div>
              <div class="spec-item laravel-spec">
                <div class="spec-icon">
                  <i class="bi bi-server"></i>
                </div>
                <div class="spec-info">
                  <h4>{{ t('about.specialization.laravel') }}</h4>
                  <p>{{ t('about.specialization.laravelDesc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tech Stack Card -->
        <div class="bento-card tech-stack" data-aos="fade-up" data-aos-delay="100">
          <div class="card-header">
            <h3 class="card-title">{{ t('about.techStack.title') }}</h3>
            <p class="card-subtitle">{{ t('about.techStack.subtitle') }}</p>
          </div>
          <div class="card-content">
            <div class="tech-categories">
              <div class="tech-category">
                <h4>{{ t('about.techStack.frontend') }}</h4>
                <div class="tech-items">
                  <span class="tech-badge">Vue.js</span>
                  <span class="tech-badge">JavaScript</span>
                  <span class="tech-badge">HTML5</span>
                  <span class="tech-badge">CSS3</span>
                  <span class="tech-badge">Bootstrap</span>
                  <span class="tech-badge">Tailwind</span>
                </div>
              </div>
              <div class="tech-category">
                <h4>{{ t('about.techStack.backend') }}</h4>
                <div class="tech-items">
                  <span class="tech-badge">PHP</span>
                  <span class="tech-badge">Laravel</span>
                  <span class="tech-badge">Node.js</span>
                  <span class="tech-badge">APIs RESTful</span>
                  <span class="tech-badge">MySQL</span>
                  <span class="tech-badge">Firebase</span>
                  <span class="tech-badge">AWS</span>
                </div>
              </div>
              <div class="tech-category">
                <h4>{{ t('about.techStack.tools') }}</h4>
                <div class="tech-items">
                  <span class="tech-badge">Git & GitHub</span>
                  <span class="tech-badge">Docker</span>
                  <span class="tech-badge">WordPress</span>
                  <span class="tech-badge">PrestaShop</span>
                  <span class="tech-badge">Figma</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievements Card -->
        <div class="bento-card achievements collapsible-card" data-aos="fade-up" data-aos-delay="300">
          <div class="card-header" @click="toggleCard('achievements')">
            <h3 class="card-title">
              {{ t('about.achievements.title') }}
              <i class="bi bi-chevron-down toggle-icon" :class="{ 'rotated': expandedCards.achievements }"></i>
            </h3>
            <p class="card-subtitle">{{ t('about.achievements.subtitle') }}</p>
          </div>
          <div class="card-content" :class="{ 'expanded': expandedCards.achievements }">
            <div class="achievements-list">
              <div class="achievement-item">
                <div class="achievement-icon">
                  <i class="bi bi-lightning"></i>
                </div>
                <div class="achievement-info">
                  <h4>{{ t('about.achievements.project1') }}</h4>
                  <p>{{ t('about.achievements.project1Desc') }}</p>
                </div>
              </div>
              <div class="achievement-item">
                <div class="achievement-icon">
                  <i class="bi bi-diagram-3"></i>
                </div>
                <div class="achievement-info">
                  <h4>{{ t('about.achievements.project2') }}</h4>
                  <p>{{ t('about.achievements.project2Desc') }}</p>
                </div>
              </div>
              <div class="achievement-item">
                <div class="achievement-icon">
                  <i class="bi bi-kanban"></i>
                </div>
                <div class="achievement-info">
                  <h4>{{ t('about.achievements.project3') }}</h4>
                  <p>{{ t('about.achievements.project3Desc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Currently Learning Card -->
        <div class="bento-card learning collapsible-card" data-aos="fade-up" data-aos-delay="100">
          <div class="card-header" @click="toggleCard('learning')">
            <h3 class="card-title">
              {{ t('about.currentlyLearning.title') }}
              <i class="bi bi-chevron-down toggle-icon" :class="{ 'rotated': expandedCards.learning }"></i>
            </h3>
            <p class="card-subtitle">{{ t('about.currentlyLearning.subtitle') }}</p>
          </div>
          <div class="card-content" :class="{ 'expanded': expandedCards.learning }">
            <div class="learning-items">
              <div class="learning-item">
                <div class="learning-progress">
                  <div class="progress-bar" style="width: 70%"></div>
                </div>
                <span class="learning-name">{{ t('about.currentlyLearning.nuxt') }}</span>
              </div>
              <div class="learning-item">
                <div class="learning-progress">
                  <div class="progress-bar" style="width: 85%"></div>
                </div>
                <span class="learning-name">{{ t('about.currentlyLearning.vue3') }}</span>
              </div>
              <div class="learning-item">
                <div class="learning-progress">
                  <div class="progress-bar" style="width: 60%"></div>
                </div>
                <span class="learning-name">{{ t('about.currentlyLearning.testing') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Philosophy Card -->
        <div class="bento-card philosophy collapsible-card" data-aos="fade-up" data-aos-delay="200">
          <div class="card-header" @click="toggleCard('philosophy')">
            <h3 class="card-title">
              {{ t('about.philosophy.title') }}
              <i class="bi bi-chevron-down toggle-icon" :class="{ 'rotated': expandedCards.philosophy }"></i>
            </h3>
            <p class="card-subtitle">{{ t('about.philosophy.subtitle') }}</p>
          </div>
          <div class="card-content" :class="{ 'expanded': expandedCards.philosophy }">
            <div class="philosophy-principles">
              <div class="principle">
                <div class="principle-icon">
                  <i class="bi bi-code-slash"></i>
                </div>
                <div class="principle-info">
                  <h4>{{ t('about.philosophy.clean') }}</h4>
                  <p>{{ t('about.philosophy.cleanDesc') }}</p>
                </div>
              </div>
              <div class="principle">
                <div class="principle-icon">
                  <i class="bi bi-speedometer2"></i>
                </div>
                <div class="principle-info">
                  <h4>{{ t('about.philosophy.performance') }}</h4>
                  <p>{{ t('about.philosophy.performanceDesc') }}</p>
                </div>
              </div>
              <div class="principle">
                <div class="principle-icon">
                  <i class="bi bi-bullseye"></i>
                </div>
                <div class="principle-info">
                  <h4>{{ t('about.philosophy.results') }}</h4>
                  <p>{{ t('about.philosophy.resultsDesc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Collaboration Card -->
        <div class="bento-card collaboration collapsible-card" data-aos="fade-up" data-aos-delay="300">
          <div class="card-header" @click="toggleCard('collaboration')">
            <h3 class="card-title">
              {{ t('about.collaboration.title') }}
              <i class="bi bi-chevron-down toggle-icon" :class="{ 'rotated': expandedCards.collaboration }"></i>
            </h3>
            <p class="card-subtitle">{{ t('about.collaboration.subtitle') }}</p>
          </div>
          <div class="card-content" :class="{ 'expanded': expandedCards.collaboration }">
            <div class="collaboration-skills">
              <div class="collab-skill">
                <i class="bi bi-arrow-repeat"></i>
                <span>{{ t('about.collaboration.agile') }}</span>
              </div>
              <div class="collab-skill">
                <i class="bi bi-git"></i>
                <span>{{ t('about.collaboration.git') }}</span>
              </div>
              <div class="collab-skill">
                <i class="bi bi-chat-dots"></i>
                <span>{{ t('about.collaboration.communication') }}</span>
              </div>
              <div class="collab-skill">
                <i class="bi bi-people"></i>
                <span>{{ t('about.collaboration.mentoring') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../composables/useI18n.js'
import { getExperienceText } from '../../utils/experienceCalculator.js'

const { t, currentLang } = useI18n()

// Estado para las tarjetas desplegables
const expandedCards = ref({
  achievements: false,
  learning: false,
  philosophy: false,
  collaboration: false
})

// Calcular experiencia automáticamente
const experienceData = computed(() => {
  return getExperienceText(currentLang.value)
})

// Función para alternar el estado de las tarjetas
const toggleCard = (cardName) => {
  console.log('Toggle card:', cardName, 'Current state:', expandedCards.value[cardName])
  expandedCards.value[cardName] = !expandedCards.value[cardName]
}
</script>

<style scoped>
/* About Section */
.about-section {
  padding: 4rem 0;
  background: var(--background-primary);
  position: relative;
  display: flex;
  align-items: stretch;
}

.container-fluid {
  padding-left: 15px;
  padding-right: 15px;
}

.container-xl {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}


.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 30%, rgba(42, 157, 143, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(69, 123, 157, 0.08) 0%, transparent 50%);
  pointer-events: none;
}



/* Header */
.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
}

[data-theme="dark"] .section-title {
  filter: brightness(1.2) contrast(1.2);
}

.section-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

/* Stats Dashboard */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--background-secondary);
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  text-align: center;
  border: 2px solid var(--tiffany-blue);
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(148, 210, 189, 0.1), transparent);
  transition: left 0.5s;
}

.stat-card:hover::before {
  left: 100%;
}

.stat-card:hover {
  border-color: var(--persian-green);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(148, 210, 189, 0.2);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-muted);
  font-weight: 500;
}

.stat-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: var(--tiffany-blue);
  opacity: 0.6;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas base para mayor flexibilidad */
  gap: 1.5rem;
  grid-auto-rows: minmax(180px, auto);
}

/* Tamaños orgánicos variables por fila */
.specialization {
  grid-column: span ; /* Ocupa 2 columnas (más ancha) */
  grid-row: 1; /* Primera fila */
}
.tech-stack {
  grid-column: span 2; /* Ocupa 1 columna (más estrecha) */
  grid-row: 1; /* Primera fila */
}
.achievements {
  grid-column: span 2; /* Ocupa 2 columnas (más ancha) */
  grid-row: 2; /* Segunda fila */
}
.learning {
  grid-column: span 1; /* Ocupa 1 columna (más estrecha) */
  grid-row: 2; /* Segunda fila */
}
.collaboration {
  grid-column: span 2; /* Ocupa 2 columnas (más ancha) */
  grid-row: 3; /* Tercera fila */
}
.philosophy {
  grid-column: span 1; /* Ocupa 1 columna (más estrecha) */
  grid-row: 3; /* Tercera fila */
}

/* Desktop: Control específico de filas y alturas */
@media (min-width: 1025px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr); /* Mantener 3 columnas base */
    grid-auto-rows: minmax(200px, auto);
  }

  .bento-card {
    display: flex;
    flex-direction: column;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}

/* Bento Cards */
.bento-card {
  background: var(--background-secondary);
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  border: 2px solid var(--tiffany-blue);
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 210, 189, 0.2);
}

.bento-card:hover {
  border-color: var(--persian-green);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(148, 210, 189, 0.15);
}

.bento-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--cerulean), var(--persian-green), var(--saffron));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.bento-card:hover::before {
  transform: scaleX(1);
}

/* Card sizes - Layout responsivo estilo Bento */
.tech-stack { 
  background: linear-gradient(135deg, rgba(148, 210, 189, 0.05), rgba(69, 123, 157, 0.05));
}
.specialization { 
  background: linear-gradient(135deg, rgba(69, 123, 157, 0.05), rgba(233, 196, 106, 0.05));
}
.learning { 
  background: linear-gradient(135deg, rgba(42, 157, 143, 0.05), rgba(69, 123, 157, 0.05));
}
.achievements { 
  background: linear-gradient(135deg, rgba(233, 196, 106, 0.05), rgba(148, 210, 189, 0.05));
}
.philosophy { 
  background: linear-gradient(135deg, rgba(233, 196, 106, 0.08), rgba(240, 248, 255, 0.05));
}
.collaboration { 
  background: linear-gradient(135deg, rgba(69, 123, 157, 0.05), rgba(148, 210, 189, 0.05));
}

/* Card Headers */
.card-header {
  margin-bottom: 1.5rem;
  position: relative;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-subtitle {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Toggle Icon for Collapsible Cards */
.toggle-icon {
  font-size: 1.2rem;
  color: var(--text-muted);
  transition: transform 0.3s ease, color 0.3s ease;
  opacity: 0;
  pointer-events: none;
  flex-shrink: 0;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

/* Collapsible Cards */
.collapsible-card .card-content {
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Mobile and Tablet Collapsible Behavior */
@media (max-width: 1024px) {
  .collapsible-card {
    min-height: auto;
  }
  
  .collapsible-card .card-header {
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(148, 210, 189, 0.2);
    margin-bottom: 0;
  }
  
  .collapsible-card .card-header:active {
    transform: scale(0.98);
  }
  
  .collapsible-card .toggle-icon {
    opacity: 1;
    pointer-events: all;
    color: var(--persian-green);
  }
  
  .collapsible-card .card-header:hover .toggle-icon {
    color: var(--cerulean);
  }
  
  .collapsible-card .card-content {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
    padding-top: 0;
    overflow: hidden;
    transition: all 0.4s ease;
  }
  
  .collapsible-card .card-content.expanded {
    max-height: 600px;
    opacity: 1;
    margin-top: 1rem;
    padding-top: 0;
  }
  
  /* Hacer las cards más compactas en móvil */
  .collapsible-card {
    padding: 1.25rem;
    margin-bottom: 0.5rem;
    min-height: unset !important;
    height: auto;
  }
  
  .collapsible-card .card-title {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }
  
  .collapsible-card .card-subtitle {
    font-size: 0.8rem;
    margin-bottom: 0;
  }
}

/* Tech Stack Card */
.tech-categories {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tech-category h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  background: rgba(148, 210, 189, 0.1);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(148, 210, 189, 0.3);
  transition: var(--transition-normal);
}

.tech-badge:hover {
  background: rgba(148, 210, 189, 0.2);
  transform: translateY(-2px);
}

/* Specialization Card */
.specialization-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.spec-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(148, 210, 189, 0.05);
  border-radius: var(--border-radius-lg);
  border-left: 4px solid var(--persian-green);
}

.spec-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--honeydew);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.spec-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.spec-info p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

/* Achievements Card */
.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.achievement-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--saffron), var(--persian-green));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--charcoal);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.achievement-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
}

.achievement-info p {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}

/* Learning Card */
.learning-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.learning-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.learning-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.learning-progress {
  width: 100%;
  height: 8px;
  background: rgba(148, 210, 189, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--cerulean), var(--persian-green));
  border-radius: 4px;
  transition: width 0.3s ease;
  animation: progressAnimation 2s ease-in-out;
}

@keyframes progressAnimation {
  from { width: 0; }
}

/* Philosophy Card */
.philosophy-principles {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.principle {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.principle-icon {
  width: 40px;
  height: 40px;
  background: rgba(233, 196, 106, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--saffron);
  font-size: 1rem;
  flex-shrink: 0;
}

.principle-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
}

.principle-info p {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
  margin: 0;
}

/* Collaboration Card */
.collaboration-skills {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.collab-skill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(69, 123, 157, 0.08);
  border-radius: var(--border-radius-md);
  transition: var(--transition-normal);
}

.collab-skill:hover {
  background: rgba(69, 123, 157, 0.15);
  transform: translateX(5px);
}

.collab-skill i {
  font-size: 1.1rem;
  color: var(--cerulean);
  width: 20px;
  text-align: center;
}

.collab-skill span {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: 1fr; /* Una sola columna en tablets */
    grid-auto-rows: auto;
  }
  
  .bento-card {
    grid-column: 1 !important;
    grid-row: auto !important;
    min-height: auto !important;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 4rem 0 3rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  .bento-grid {
    grid-template-columns: 1fr; /* Una sola columna en móviles */
    gap: 1rem;
    grid-auto-rows: auto;
  }
  
  .bento-card {
    grid-column: 1 !important;
    grid-row: auto !important;
    padding: 1.5rem;
    height: auto !important;
  }
  
  .tech-categories {
    gap: 1rem;
  }
  
  .specialization-content {
    gap: 1rem;
  }
  
  .spec-item {
    padding: 1rem 0.75rem;
  }
}

@media (max-width: 480px) {

    .about-section {
    padding: 4rem 0 ;
  }
  .about-header {
    margin-bottom: 2rem;
  }
  
  .bento-card {
    padding: 1rem;
  }
  
  .card-title {
    font-size: 1.3rem;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
}
</style>
