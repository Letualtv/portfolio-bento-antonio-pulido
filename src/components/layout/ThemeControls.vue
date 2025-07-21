<template>
  <div class="fixed-controls d-flex gap-2 position-fixed align-items-center" style="z-index:1001;top:20px;right:20px;backdrop-filter:blur(10px);">
    <button 
      @click="toggleTheme" 
      class="control-btn theme-toggle btn btn-light rounded-circle d-flex align-items-center justify-content-center shadow border"
      :title="t('accessibility.toggleTheme')"
      :aria-label="t('accessibility.toggleTheme')"
      type="button"
    >
      <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'" aria-hidden="true"></i>
    </button>
    <button 
      @click="toggleLanguage" 
      class="control-btn lang-toggle btn btn-light rounded-circle d-flex align-items-center justify-content-center shadow border"
      :title="t('accessibility.toggleLanguage')"
      :aria-label="t('accessibility.toggleLanguage')"
      type="button"
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
  /* Bootstrap utilities para layout y blur, solo detalles extra aquí */
}
.control-btn {
  width: 48px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  transition: var(--transition-normal);
}
.control-btn:hover {
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  color: var(--honeydew) !important;
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
@media (max-width: 768px) {
  .fixed-controls {
    top: 10px !important;
    right: 10px !important;
    left: auto !important;
    gap: 6px !important;
  }
  .control-btn {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }
  .theme-toggle i {
    font-size: 16px;
  }
}
@media (max-width: 480px) {
  .fixed-controls {
    top: 90px !important;
    right: 8px !important;
    left: auto !important;
    gap: 4px !important;
  }
  .control-btn {
    width: 40px;
    height: 40px;
    font-size: 12px;
  }
  .theme-toggle i {
    font-size: 14px;
  }
}
</style>
