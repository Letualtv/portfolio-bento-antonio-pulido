<template>
 <nav class="dynamic-island mt-3" role="navigation" :aria-label="t('accessibility.mainNavigation')">
    <div class="nav-items" style="justify-content: center;">
      <button 
        v-for="item in navigationItems"
        :key="item.id"
        :class="['nav-item', { active: activeSection === item.id }]"
        @click="scrollToSection(item.id)"
        :aria-label="`${t('nav.goTo')} ${item.label}`"
        :aria-current="activeSection === item.id ? 'page' : false"
        tabindex="0"
      >
        <i :class="`bi bi-${item.icon}`" aria-hidden="true"></i>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../composables/useI18n.js'

const props = defineProps({
  activeSection: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['scrollToSection'])

const { t } = useI18n()

const navigationItems = computed(() => [
  { id: 'inicio', label: t('nav.home'), icon: 'house' },
  { id: 'about', label: t('nav.about'), icon: 'person' },
  { id: 'experiencia', label: t('nav.experience'), icon: 'briefcase' },
  { id: 'contacto', label: t('nav.contact'), icon: 'envelope' }
])

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
</script>

<style scoped>
/* Dynamic Island Navigation */
.dynamic-island {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  backdrop-filter: blur(20px);
  background: rgba(38, 70, 83, 0.9);
  border: 1px solid var(--tiffany-blue);
  border-radius: 50px;
  padding: 8px;
  box-shadow: var(--shadow-xl);
  transition: var(--transition-normal);
  contain: layout style paint;
  will-change: transform, opacity;
}

[data-theme="dark"] .dynamic-island {
  background: rgba(29, 53, 87, 0.95);
  border-color: var(--persian-green);
}

.nav-items {
  display: flex;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: var(--honeydew);
  border-radius: 50px;
  transition: var(--transition-normal);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.nav-item:hover {
  background: rgba(148, 210, 189, 0.3);
  color: var(--honeydew);
  transform: translateY(-1px);
}

.nav-item.active {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  color: var(--honeydew);
  box-shadow: 0 4px 12px rgba(69, 123, 157, 0.4);
  transform: translateY(-1px);
}

.nav-item i {
  font-size: 16px;
  flex-shrink: 0;
}

/* Tablet Responsive - Breakpoint específico para tablets */
@media (min-width: 769px) and (max-width: 1024px) {
  .dynamic-island {
    padding: 10px 18px;
    border-radius: 35px;
    top: 15px;
    max-width: 85%;
    backdrop-filter: blur(25px);
  }
  
  .nav-item {
    padding: 14px 18px;
    font-size: 15px;
    gap: 10px;
  }
  
  .nav-item i {
    font-size: 18px;
  }
  
  .nav-label {
    font-size: 14px;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .dynamic-island {
    left: 0 !important;
    right: 0 !important;
    width: auto !important;
    margin-left: 8px !important;
    margin-right: 8px !important;
    transform: none !important;
    border-radius: 25px !important;
  }
  
  .nav-items {
    justify-content: space-between;
  }
  
  .nav-label {
    display: none;
  }
  
  .nav-item {
    padding: 12px;
    min-width: 44px;
    justify-content: center;
    flex: 1;
  }
}

@media (max-width: 480px) {

  .dynamic-island {
      top: 0rem;

    border-radius: 25px !important;
    margin-left: 4px !important;
    margin-right: 4px !important;
  }
  
  .nav-item {
    padding: 10px 8px;

  }

}
</style>
