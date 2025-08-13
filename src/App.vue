<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
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

const showGithubStar = ref(false)
const STAR_DISMISSED_KEY = 'githubStarDismissed'

const setActiveSection = (section) => {
  // console.log('🎯 Cambiando activeSection de', activeSection.value, 'a', section)
  activeSection.value = section
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    // Usar requestAnimationFrame para evitar forced reflow
    requestAnimationFrame(() => {
      const offset = window.innerWidth <= 768 ? 120 : 100
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    })
  }
  // Actualizar inmediatamente la sección activa
  setActiveSection(sectionId)
}

onMounted(() => {
  initLanguage()
  
  // Configuración del GitHub Star Toast
  if (sessionStorage.getItem(STAR_DISMISSED_KEY) === '1') {
    showGithubStar.value = false
  } else {
    let hasShown = false
    const handleGithubStarScroll = () => {
      if (sessionStorage.getItem(STAR_DISMISSED_KEY) === '1') {
        showGithubStar.value = false
        return
      }
      const scrollY = window.scrollY || window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (!hasShown && docHeight > 0 && scrollY > docHeight * 0.45) {
        showGithubStar.value = true
        hasShown = true
      }
    }
    window.addEventListener('scroll', handleGithubStarScroll)
    handleGithubStarScroll()
  }
  
  // Sistema de detección de sección activa simplificado
  const sections = ['inicio', 'about', 'experiencia', 'contacto']
  let scrollTimeout = null
  
  // Función principal para detectar la sección activa
  const detectActiveSection = () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const offset = 200 // Offset más alto para detección temprana
    
    let newActiveSection = 'inicio'
    
    // Revisar cada sección para encontrar la que está más visible
    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionId = sections[i]
      const element = document.getElementById(sectionId)
      
      if (element) {
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top
        
        // Si la parte superior de la sección está en el viewport o por encima
        if (elementTop <= offset) {
          newActiveSection = sectionId
          break
        }
      }
    }
    
    // Solo actualizar si hay un cambio
    if (newActiveSection !== activeSection.value) {
      setActiveSection(newActiveSection)
    }
  }
  
  // Manejador de scroll con debounce
  const handleScroll = () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(detectActiveSection, 50)
  }
  
  // Inicializar sistema de navegación
  setTimeout(() => {
    // Configurar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Detección inicial
    detectActiveSection()
  }, 100)
  
  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
      scrollTimeout = null
    }
  })
})

function dismissGithubStar() {
  sessionStorage.setItem(STAR_DISMISSED_KEY, '1')
  showGithubStar.value = false
}
</script>

<template>
   <div class="portfolio-container">
    <!-- Botón flotante para dar estrella en GitHub, abajo derecha y cerrable -->
   <div v-if="showGithubStar" class="github-star-toast">
      <div class="toast-content" style="justify-content: center; align-items: center;">
        <a
          href="https://github.com/Letualtv/portfolio-bento-antonio-pulido"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Star"
          class="star-btn-link d-inline-flex align-items-center"
        >
          <span class="star-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--primary-color)" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z" />
            </svg>
          </span>
          <span class="star-btn-text">{{ t('githubStar.button') }}</span>
        </a>
        <button class="close-star-btn" @click="dismissGithubStar" aria-label="Cerrar">
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div> 
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
    <AboutSection @scroll-to-section="scrollToSection" />
    <ExperienceSection @scroll-to-section="scrollToSection" />
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
  transition: background-color var(--transition-normal);
}

/* Botón GitHub Star - Más pequeño y encima de la navegación */
.github-star-toast {
  position: fixed;
  right: 1.5rem;
  bottom: 8rem; /* Encima de la navegación */
  z-index: 1100; /* Menor que la navegación */
  background: var(--background-primary);
  color: var(--primary-color);
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(69,123,157,0.15);
  padding: 0.5rem 0.875rem;
  max-width: 16rem;
  backdrop-filter: blur(0.5rem);
  display: flex;
  align-items: center;
  animation: fadeInUp 0.6s ease-out;
}

.toast-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.star-btn-link {
  color: var(--honeydew) !important;
  border: 0.0625rem solid var(--persian-green) !important;
  background: linear-gradient(135deg, var(--cerulean) 60%, var(--persian-green) 100%) !important;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border-radius: 1.25rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  box-shadow: 0 0.0625rem 0.25rem rgba(69,123,157,0.08);
  transition: all 0.2s ease;
}

.star-btn-link:hover {
  background: linear-gradient(135deg, var(--saffron), var(--persian-green)) !important;
  color: var(--charcoal) !important;
  box-shadow: 0 0.1875rem 0.75rem rgba(42,157,143,0.18), 0 0.0625rem 0.25rem rgba(233,196,106,0.12);
}

.star-btn-link:hover .star-icon svg {
  fill: var(--charcoal) !important;
}

.star-icon svg {
  transition: fill 0.2s;
  filter: drop-shadow(0 0.0625rem 0.125rem rgba(69,123,157,0.12));
  fill: var(--honeydew);
  width: 1rem;
  height: 1rem;
}

.star-btn-text {
  color: inherit;
  transition: color 0.2s;
  font-size: 0.75rem;
}

.close-star-btn {
  background: transparent;
  border: none;
  color: var(--primary-color);
  font-size: 1.25rem;
  margin-left: 0.25rem;
  cursor: pointer;
  padding: 0 0.125rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-star-btn:hover {
  background: rgba(255, 215, 0, 0.13);
}

/* Responsive para GitHub Star Toast */
@media (max-width: 768px) {
  .github-star-toast {
    right: 1rem;
    bottom: 6.5rem; /* Encima de la navegación móvil */
    padding: 0.5rem 0.625rem;
    font-size: 0.875rem;
    max-width: calc(100vw - 2rem);
    border-radius: 0.875rem;
  }
  
  .toast-content {
    gap: 0.375rem;
  }
  
  .star-btn-link {
    padding: 0.1875rem 0.5rem;
    font-size: 0.75rem;
    gap: 0.25rem;
  }
  
  .star-btn-text {
    font-size: 0.6875rem;
  }
  
  .star-icon svg {
    width: 0.875rem;
    height: 0.875rem;
  }
  
  .close-star-btn {
    font-size: 1.125rem;
    margin-left: 0.1875rem;
  }
}

@media (max-width: 480px) {
  .github-star-toast {
    right: 0.75rem;
    bottom: 6rem;
    max-width: calc(100vw - 1.5rem);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(1.875rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Skip link para accesibilidad */
.skip-link {
  position: absolute;
  top: -2.5rem;
  left: 0.375rem;
  background: var(--primary-color);
  color: var(--honeydew);
  padding: 0.5rem;
  border-radius: 0.25rem;
  text-decoration: none;
  z-index: 10000;
  font-weight: 600;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0.375rem;
  color: var(--honeydew);
}

/* Variables del tema para el toast */
:root {
  --toast-bg: rgba(248, 249, 250, 0.95);
  --toast-text: #222;
  --toast-accent: #FFD700;
}

[data-theme="dark"] {
  --toast-bg: rgba(35, 39, 47, 0.95);
  --toast-text: #fff;
  --toast-accent: #FFD700;
}

.github-star-toast {
  background: var(--toast-bg);
  color: var(--toast-text);
  box-shadow: 0 0.5rem 2rem rgba(0,0,0,0.2);
}

.star-btn-link {
  color: var(--toast-text) !important;
  border: 0.125rem solid var(--toast-accent) !important;
  background: rgba(40,40,48,0.85) !important;
}

.star-btn-link:hover {
  background: var(--toast-accent) !important;
  color: #23272f !important;
  border-color: var(--toast-accent) !important;
}

.close-star-btn {
  color: var(--toast-text);
}

.close-star-btn:hover {
  background: rgba(255, 215, 0, 0.13);
  color: var(--toast-accent);
}
</style>
