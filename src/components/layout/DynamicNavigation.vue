<template>
 <nav 
   class="dynamic-island position-fixed" 
   :class="{ 'glow-bottom': isAtBottom }"
   role="navigation" 
   :aria-label="t('accessibility.mainNavigation')"
 >
    <div class="nav-items d-flex justify-content-center">
      <button 
        v-for="item in navigationItems"
        :key="item.id"
        :class="['nav-item btn d-flex align-items-center', { active: activeSection === item.id }]"
        @click="scrollToSection(item.id)"
        :aria-label="`${t('nav.goTo')} ${item.label}`"
        :aria-current="activeSection === item.id ? 'page' : false"
        tabindex="0"
      >
        <i :class="`bi bi-${item.icon}`" aria-hidden="true"></i>
        <span class="nav-label ms-2">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../../composables/useI18n.js'

const props = defineProps({
  activeSection: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['scrollToSection'])

const { t } = useI18n()
const isAtBottom = ref(false)

const navigationItems = computed(() => [
  { id: 'inicio', label: t('nav.home'), icon: 'house' },
  { id: 'about', label: t('nav.about'), icon: 'person' },
  { id: 'experiencia', label: t('nav.experience'), icon: 'briefcase' },
  { id: 'contacto', label: t('nav.contact'), icon: 'envelope' }
])

// Detectar cuando se llega al final de la página
const checkIfAtBottom = () => {
  const threshold = 100 // Umbral de 100px antes del final
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  isAtBottom.value = scrollTop + windowHeight >= documentHeight - threshold
}

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId)
  if (el) {
    // Usar requestAnimationFrame para evitar forced reflow
    requestAnimationFrame(() => {
      const isMobile = window.innerWidth <= 768
      const offset = isMobile ? 100 : 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    })
    emit('scrollToSection', sectionId)
  } else {
    emit('scrollToSection', sectionId)
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkIfAtBottom, { passive: true })
  window.addEventListener('resize', checkIfAtBottom, { passive: true })
  checkIfAtBottom() // Verificar estado inicial
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkIfAtBottom)
  window.removeEventListener('resize', checkIfAtBottom)
})
</script>

<style scoped>
/* Dynamic Island Navigation - Centrado base */
.dynamic-island {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  backdrop-filter: blur(1.25rem);
  background: rgba(38, 70, 83, 0.9);
  border: 0.0625rem solid var(--tiffany-blue);
  border-radius: 3.125rem;
  padding: 0.5rem 1rem;
  box-shadow: var(--shadow-xl);
  transition: var(--transition-normal);
  contain: layout style paint;
  will-change: transform, opacity;
  max-width: 90vw;
  min-width: fit-content;
  width: auto;
}

/* Borde circular progresivo basado en scroll */
.dynamic-island::before {
  content: '';
  position: absolute;
  top: -0.125rem;
  left: -0.125rem;
  right: -0.125rem;
  bottom: -0.125rem;
  border-radius: inherit;
  background: conic-gradient(
    from 0deg,
    var(--persian-green) 0%,
    var(--saffron) 25%,
    var(--cerulean) 50%,
    var(--tiffany-blue) 75%,
    var(--persian-green) 100%
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  z-index: -1;
  padding: 0.125rem;
}

.dynamic-island:hover::before {
  opacity: 0.8;
}

/* Desktop específico - más espacioso */
@media (min-width: 1025px) {
  .dynamic-island {
    padding: 0.625rem 1.25rem;
    border-radius: 2.8125rem;
    top: 1.25rem;
  }
  
  .nav-item {
    padding: 0.875rem 1.375rem;
    font-size: 0.9375rem;
  }
  
  .nav-item i {
    font-size: 1.0625rem;
  }
}

[data-theme="dark"] .dynamic-island {
  background: rgba(29, 53, 87, 0.95);
  border-color: var(--persian-green);
}

.nav-items {
  gap: 0.25rem;
}

.nav-item {
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  color: var(--honeydew);
  border-radius: 3.125rem;
  transition: var(--transition-normal);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  min-width: 2.75rem;
}

.nav-item:hover {
  background: rgba(148, 210, 189, 0.3);
  color: var(--honeydew);
  transform: translateY(-0.0625rem);
}

.nav-item.active {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  color: var(--honeydew);
  box-shadow: 0 0.25rem 0.75rem rgba(69, 123, 157, 0.4);
  transform: translateY(-0.0625rem);
}

.nav-item i {
  font-size: 1rem;
  flex-shrink: 0;
}

/* Tablet Responsive - Navegación abajo centrada con márgenes (mx-5) */
@media (min-width: 769px) and (max-width: 1024px) {
  .dynamic-island {
    top: auto !important;
    bottom: 1rem !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
    padding: 0.625rem 1.125rem !important;
    border-radius: 2.1875rem !important;
    width: calc(100vw - 6rem) !important; /* mx-5 = 3rem cada lado */
    backdrop-filter: blur(1.5625rem) !important;
  }

  /* Brillo solo cuando está al final */
  .dynamic-island.glow-bottom {
    box-shadow: 
      0 0 1.25rem rgba(69, 123, 157, 0.4),
      0 0 2.5rem rgba(148, 210, 189, 0.2),
      0 0.5rem 1.5rem rgba(0, 0, 0, 0.3) !important;
    animation: tabletGlow 2s ease-in-out infinite alternate !important;
  }

  .dynamic-island.glow-bottom::before {
    opacity: 0.9 !important;
    animation: borderGlow 2s ease-in-out infinite alternate !important;
  }
  
  .nav-item {
    padding: 0.875rem 1.125rem !important;
    font-size: 0.9375rem !important;
    gap: 0.625rem !important;
  }
  
  .nav-item i {
    font-size: 1.125rem !important;
  }
  
  .nav-label {
    font-size: 0.875rem !important;
  }
}

/* Mobile Responsive - Navegación abajo centrada con márgenes (mx-2) */
@media (max-width: 768px) {
  .dynamic-island {
    top: auto !important;
    bottom: 1rem !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
    border-radius: 1.5625rem !important;
    padding: 0.625rem !important;
    width: calc(100vw - 1rem) !important; /* mx-2 = 0.5rem cada lado */
    min-width: auto !important;
  }

  /* Brillo solo cuando está al final */
  .dynamic-island.glow-bottom {
    box-shadow: 
      0 0 1rem rgba(69, 123, 157, 0.5),
      0 0 2rem rgba(148, 210, 189, 0.3),
      0 0.25rem 1rem rgba(0, 0, 0, 0.4) !important;
    animation: mobileGlow 2.5s ease-in-out infinite alternate !important;
  }

  .dynamic-island.glow-bottom::before {
    opacity: 1 !important;
    animation: borderGlow 2.5s ease-in-out infinite alternate !important;
  }
  
  .nav-items {
    justify-content: space-around !important;
    gap: 0.25rem !important;
  }
  
  .nav-label {
    display: none !important;
  }
  
  .nav-item {
    padding: 0.75rem !important;
    min-width: 2.5rem !important;
    justify-content: center !important;
    flex: 1 !important;
    border-radius: 1rem !important;
  }
  
  .nav-item i {
    font-size: 1.25rem !important;
  }
}

/* Mobile pequeño - mantener centrado perfecto con mx-2 */
@media (max-width: 480px) {
  .dynamic-island {
    bottom: 0.75rem !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
    width: calc(100vw - 1rem) !important; /* mx-2 = 0.5rem cada lado */
    padding: 0.5rem !important;
    border-radius: 1.25rem !important;
  }
  
  .nav-items {
    gap: 0.1875rem !important;
  }
  
  .nav-item {
    padding: 0.625rem !important;
    min-width: 2.25rem !important;
  }
  
  .nav-item i {
    font-size: 1.125rem !important;
  }
}

/* Mobile muy pequeño - mantener centrado perfecto con mx-2 */
@media (max-width: 320px) {
  .dynamic-island {
    bottom: 0.5rem !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
    width: calc(100vw - 1rem) !important; /* mx-2 = 0.5rem cada lado */
    padding: 0.375rem !important;
    border-radius: 1rem !important;
  }
  
  .nav-items {
    gap: 0.125rem !important;
  }
  
  .nav-item {
    padding: 0.5rem !important;
    min-width: 2rem !important;
    border-radius: 0.75rem !important;
  }
  
  .nav-item i {
    font-size: 1rem !important;
  }
}

/* Animaciones de brillo para móvil y tablet */
@keyframes mobileGlow {
  0% {
    box-shadow: 
      0 0 1rem rgba(69, 123, 157, 0.5),
      0 0 2rem rgba(148, 210, 189, 0.3),
      0 0.25rem 1rem rgba(0, 0, 0, 0.4);
  }
  100% {
    box-shadow: 
      0 0 1.5rem rgba(69, 123, 157, 0.7),
      0 0 3rem rgba(148, 210, 189, 0.5),
      0 0.25rem 1rem rgba(0, 0, 0, 0.4);
  }
}

@keyframes tabletGlow {
  0% {
    box-shadow: 
      0 0 1.25rem rgba(69, 123, 157, 0.4),
      0 0 2.5rem rgba(148, 210, 189, 0.2),
      0 0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  }
  100% {
    box-shadow: 
      0 0 2rem rgba(69, 123, 157, 0.6),
      0 0 4rem rgba(148, 210, 189, 0.4),
      0 0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  }
}

@keyframes borderGlow {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>
