<template>
  <div class="fixed-controls" :class="{ 'scrolled': isScrolled }">
    <button 
      @click="toggleTheme" 
      class="control-btn theme-toggle"
      :title="t('accessibility.toggleTheme')"
      :aria-label="t('accessibility.toggleTheme')"
    >
      <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'" aria-hidden="true"></i>
    </button>
    <button 
      @click="toggleLanguage" 
      class="control-btn lang-toggle"
      :title="t('accessibility.toggleLanguage')"
      :aria-label="t('accessibility.toggleLanguage')"
    >
      {{ currentLang.toUpperCase() }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme.js'
import { useI18n } from '../../composables/useI18n.js'

const { isDark, toggleTheme } = useTheme()
const { currentLang, toggleLanguage, t } = useI18n()

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fixed-controls {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1001;
  display: flex;
  gap: 0.5rem;
  transition: opacity 0.3s ease;
}

.fixed-controls.scrolled {
  opacity: 0.7;
}

.fixed-controls:hover {
  opacity: 1 !important;
}

.control-btn {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: none;
  background: var(--background-secondary);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-normal);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(0.625rem);
  font-weight: 600;
  font-size: 0.875rem;
  border: 0.0625rem solid var(--border-color);
}

.control-btn:hover {
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--honeydew);
  transform: translateY(-0.125rem);
  box-shadow: var(--shadow-lg);
}

.control-btn:focus {
  outline: 0.125rem solid var(--secondary-color);
  outline-offset: 0.125rem;
}

.theme-toggle i {
  font-size: 1.125rem;
}

/* Mantener siempre arriba a la derecha - botones más pequeños en móvil */
@media (max-width: 768px) {
  .fixed-controls {
    /* Mantener misma posición que desktop */
    top: 1.25rem;
    right: 1.25rem;
    gap: 0.375rem;
  }
  
  .control-btn {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 0.75rem;
  }
  
  .theme-toggle i {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .fixed-controls {
    /* Mantener misma posición, más pequeño en pantallas muy pequeñas */
    top: 1rem;
    right: 1rem;
    gap: 0.25rem;
  }
  
  .control-btn {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 0.6875rem;
  }
  
  .theme-toggle i {
    font-size: 0.875rem;
  }
}

@media (max-width: 320px) {
  .fixed-controls {
    top: 0.75rem;
    right: 0.75rem;
    gap: 0.1875rem;
  }
  
  .control-btn {
    width: 2rem;
    height: 2rem;
    font-size: 0.625rem;
  }
  
  .theme-toggle i {
    font-size: 0.75rem;
  }
}
</style>
