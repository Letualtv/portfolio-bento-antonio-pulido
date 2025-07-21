<template>
  <div class="fixed-controls">
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
import { useTheme } from '../../composables/useTheme.js'
import { useI18n } from '../../composables/useI18n.js'

const { isDark, toggleTheme } = useTheme()
const { currentLang, toggleLanguage, t } = useI18n()
</script>

<style scoped>
.fixed-controls {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  display: flex;
  gap: 8px;
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

/* Mobile Responsive */
@media (max-width: 768px) {
  .fixed-controls {
    top: 10px;
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
    top: 90px;
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
