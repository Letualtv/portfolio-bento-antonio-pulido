<script setup>
import { ref, onMounted, watch } from 'vue'
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

onMounted(() => {
  // Si el usuario lo descartó en esta sesión, no mostrar
  if (sessionStorage.getItem(STAR_DISMISSED_KEY) === '1') {
    showGithubStar.value = false
    return
  }
  let hasShown = false
  const handleScroll = () => {
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
    // Si ya se mostró, no lo ocultes aunque suba
  }
  window.addEventListener('scroll', handleScroll)
  // Por si el usuario ya está abajo al cargar
  handleScroll()
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})

const setActiveSection = (section) => {
  activeSection.value = section
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    // Offset adaptativo para móvil/tablet
    const isMobile = window.innerWidth <= 1024
    const offset = isMobile ? 40 : 30 // Ajusta según la altura de tu nav
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
  setActiveSection(sectionId)
}

onMounted(() => {
  initLanguage()
  
  // Observer para detectar la sección activa al hacer scroll
  const sectionIds = ['inicio', 'about', 'experiencia', 'contacto']
  // Ajuste: threshold bajo y rootMargin dinámico para mejor detección
  function getRootMargin() {
    // En móvil, margen superior más grande para compensar la navegación fija
    const isMobile = window.innerWidth <= 768
    return isMobile ? '-120px 0px -40% 0px' : '-80px 0px -30% 0px'
  }
  let observer = null
  function createObserver() {
    if (observer) {
      document.querySelectorAll('section[id]').forEach(section => {
        observer.unobserve(section)
      })
    }
    observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting)
      if (visible.length > 0) {
        visible.sort((a, b) => {
          const aRect = a.target.getBoundingClientRect()
          const bRect = b.target.getBoundingClientRect()
          const aCenter = aRect.top + aRect.height / 2
          const bCenter = bRect.top + bRect.height / 2
          const winCenter = window.innerHeight / 2
          return Math.abs(aCenter - winCenter) - Math.abs(bCenter - winCenter)
        })
        const newSection = visible[0].target.id
        if (activeSection.value !== newSection) {
          setActiveSection(newSection)
        }
      } else {
        // Fallback: la más cercana al centro
        let found = sectionIds[0]
        let minDist = Infinity
        for (let id of sectionIds) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            const center = rect.top + rect.height / 2
            const dist = Math.abs(center - window.innerHeight / 2)
            if (dist < minDist && dist < window.innerHeight * 0.5) {
              minDist = dist
              found = id
            }
          }
        }
        if (activeSection.value !== found) {
          setActiveSection(found)
        }
      }
    }, {
      threshold: [0.15, 0.3, 0.5], // Detecta antes y con secciones cortas
      rootMargin: getRootMargin()
    })
    setTimeout(() => {
      document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section)
      })
    }, 100)
  }
  createObserver()
  window.addEventListener('resize', createObserver)
  // Cleanup
  return () => {
    window.removeEventListener('resize', createObserver)
    if (observer) {
      document.querySelectorAll('section[id]').forEach(section => {
        observer.unobserve(section)
      })
    }
  }
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
          class="star-btn-link"
        >
          <span class="star-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--primary-color)" viewBox="0 0 24 24">
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
<!--     <AppFooter /> -->
  </div>
</template>

<style scoped>
/* Contenedor principal */
.portfolio-container {
  min-height: 100vh;
  background: var(--background-primary);
  transition: background-color var(--transition-normal);
}

/* Botón flotante GitHub Star abajo derecha y cerrable */
.github-star-toast {
  position: fixed;
  right: 24px;
  bottom: 32px;
  z-index: 1200;
  background: var(--background-primary, #fff);
  color: var(--primary-color, #222);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(69,123,157,0.18);
  padding: 14px 20px;
  max-width: 340px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  animation: fadeInUp 0.6s ease-out;
}
.toast-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}
/* Botón flotante GitHub Star - base */
.star-btn-link {
  color: var(--honeydew, #f1faeeff) !important;
  border: 2px solid var(--persian-green, #2a9d8fff) !important;
  background: linear-gradient(135deg, var(--cerulean, #457b9dff) 60%, var(--persian-green, #2a9d8fff) 100%) !important;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 30px;
  padding: 6px 16px;
  font-size: 1em;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(69,123,157,0.08);
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
[data-theme="dark"] .star-btn-link {
  background: linear-gradient(135deg, var(--cerulean, #457b9dff) 60%, var(--persian-green, #2a9d8fff) 100%) !important;
  color: var(--honeydew, #f1faeeff) !important;
  border: 2px solid var(--persian-green, #2a9d8fff) !important;
}
.star-btn-link:hover {
  background: linear-gradient(135deg, var(--saffron, #e9c46aff) 0%, var(--persian-green, #2a9d8fff) 100%) !important;
  color: var(--charcoal, #222) !important;
  border-color: var(--persian-green, #2a9d8fff) !important;
  box-shadow: 0 4px 18px 0 rgba(42,157,143,0.18), 0 1.5px 6px 0 rgba(233,196,106,0.12);
}
.star-btn-link:hover .star-icon svg {
  fill: var(--charcoal, #222) !important;
}
.star-icon svg {
  transition: fill 0.2s;
  vertical-align: middle;
  filter: drop-shadow(0 1px 2px rgba(69,123,157,0.12));
  fill: var(--honeydew, #f1faeeff);
}
[data-theme="dark"] .star-icon svg {
  fill: var(--honeydew, #f1faeeff);
}
.star-btn-text {
  color: inherit;
  transition: color 0.2s;
  display: inline-block;
  vertical-align: middle;
}
.close-star-btn {
  background: transparent;
  border: none;
  color: var(--primary-color, #222);
  font-size: 1.7rem;
  margin-left: 6px;
  cursor: pointer;
  padding: 0 4px;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;
}
.close-star-btn:hover {
  background: rgba(255, 215, 0, 0.13);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 768px) {
  .github-star-toast {
    right: 10px;
    bottom: 16px;
    padding: 10px 12px;
    font-size: 0.95rem;
    max-width: 95vw;
  }
  .toast-content {
    gap: 8px;
  }
  .star-btn-link {
    padding: 6px 10px;
    font-size: 0.95em;
  }
  .star-btn-link i {
    font-size: 1.1em;
  }
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

:root {
  --toast-bg: #f8f9fa;
  --toast-text: #222;
}
[data-theme="dark"] {
  --toast-bg: #23272f;
  --toast-text: #fff;
  --accent-color: #FFD700;
}
.github-star-toast {
  background: var(--toast-bg);
  color: var(--toast-text);
  box-shadow: 0 8px 32px rgba(0,0,0,0.32);
}
.star-btn-link {
  color: var(--toast-text);
  border: 2px solid var(--accent-color, #FFD700);
  background: rgba(40,40,48,0.85);
}
.star-btn-link:hover {
  background: var(--accent-color, #FFD700);
  color: #23272f;
  border-color: var(--accent-color, #FFD700);
}
.close-star-btn {
  color: var(--toast-text);
}
.close-star-btn:hover {
  background: rgba(255, 215, 0, 0.13);
  color: var(--accent-color, #FFD700);
}
</style>
