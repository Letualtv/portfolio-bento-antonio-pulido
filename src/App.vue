<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from './composables/useTheme.js'
import { useI18n } from './composables/useI18n.js'

// Importar componentes
import DynamicNavigation from './components/layout/DynamicNavigation.vue'
import ThemeControls from './components/layout/ThemeControls.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import AppFooter from './components/layout/AppFooter.vue'

const activeSection = ref('inicio')
const { isDark, toggleTheme } = useTheme()
const { currentLang, toggleLanguage, t, initLanguage } = useI18n()

const setActiveSection = (section) => {
  activeSection.value = section
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  setActiveSection(sectionId)
}

onMounted(() => {
  initLanguage()
  
  // Observer para detectar la sección activa al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id)
      }
    })
  }, { 
    threshold: 0.5,
    rootMargin: '-100px 0px -100px 0px'
  })

  // Observar todas las secciones después de que se monten
  setTimeout(() => {
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section)
    })
  }, 100)

  // Cleanup
  return () => {
    document.querySelectorAll('section[id]').forEach(section => {
      observer.unobserve(section)
    })
  }
})
</script>

<template>
  <div class="portfolio-container">
    <!-- Skip link para accesibilidad -->
    <a href="#inicio" class="skip-link">{{ t('accessibility.skipToMain') }}</a>
    
    <!-- Controles de tema e idioma -->
    <ThemeControls />
    
    <!-- Navegación Dynamic Island -->
    <DynamicNavigation 
      :activeSection="activeSection" 
      @scroll-to-section="scrollToSection" 
    />

    <!-- Secciones del portfolio -->
    <HeroSection @scroll-to-section="scrollToSection" />
    <AboutSection />
    <ExperienceSection />
    <ContactSection />
    
    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
/* Contenedor principal */
.portfolio-container {
  min-height: 100vh;
  background: var(--background-primary);
  position: relative;
  transition: background-color var(--transition-normal);
}

/* Skip link para accesibilidad */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: var(--honeydew);
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  z-index: 10000;
  font-weight: 600;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
  color: var(--honeydew);
}
</style>
