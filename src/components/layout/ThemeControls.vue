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
  top: 20px;
  right: 20px;
  z-index: 1001;
  display: flex;
  gap: 8px;
  transition: opacity 0.3s ease;
}

.fixed-controls.scrolled {
  opacity: 0.7;
}

.fixed-controls:hover {
  opacity: 1 !important;
}

.control-btn {
  width: 48px;
  height: 48px;
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
  backdrop-filter: blur(10px);
  font-weight: 600;
  font-size: 14px;
  border: 1px solid var(--border-color);
}

.control-btn:hover {
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--honeydew);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.control-btn:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

.theme-toggle i {
  font-size: 18px;
}

/* Tablet Responsive - Ajustar posición para el Dynamic Island mejorado */
@media (min-width: 769px) and (max-width: 1024px) {
  .fixed-controls {
    top: 5rem;
    right: 12px;
    gap: 8px;
  }
  
  .control-btn {
    width: 48px;
    height: 48px;
    font-size: 13px;
  }
  
  .theme-toggle i {
    font-size: 17px;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .fixed-controls {
    right: 10px;
    gap: 6px;
  }
  
  .control-btn {
    width: 44px;
    height: 44px;
    font-size: 12px;
  }
  
  .theme-toggle i {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .fixed-controls {
    top: 5rem;
    right: 8px;
    gap: 4px;
  }
  
  .control-btn {
    width: 40px;
    height: 40px;
    font-size: 11px;
  }
  
  .theme-toggle i {
    font-size: 14px;
  }
}
</style>
