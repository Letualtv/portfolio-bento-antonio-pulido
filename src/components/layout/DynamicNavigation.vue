<template>
  <nav class="dynamic-island navbar navbar-expand bg-body-tertiary shadow-sm rounded-pill px-2 py-1 position-fixed top-0 start-50 translate-middle-x mt-3" role="navigation" aria-label="Main navigation" style="z-index:1000;backdrop-filter:blur(20px);">
    <div class="nav-items d-flex gap-1 w-100 justify-content-center">
      <button 
        v-for="item in navigationItems"
        :key="item.id"
        :class="['nav-item btn btn-link px-3 py-2 rounded-pill d-flex align-items-center gap-2', { active: activeSection === item.id } ]"
        @click="scrollToSection(item.id)"
        :aria-label="`${t('nav.goTo')} ${item.label}`"
        style="color:var(--honeydew);min-height:44px;white-space:nowrap;"
      >
        <i :class="`bi bi-${item.icon}`" aria-hidden="true"></i>
        <span class="nav-label d-none d-md-inline">{{ item.label }}</span>
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
    // Offset adaptativo: más alto en móvil
    const isMobile = window.innerWidth <= 768
    const offset = isMobile ? 80 : 40
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    emit('scrollToSection', sectionId)
  } else {
    emit('scrollToSection', sectionId)
  }
}
</script>

<style scoped>
.dynamic-island {
  /* Bootstrap ya aplica la mayoría de estilos, solo detalles extra aquí */
  border: 1px solid var(--tiffany-blue);
  background: rgba(38, 70, 83, 0.9);
  /* Blur y sombra ya en inline style */
}
[data-theme="dark"] .dynamic-island {
  background: rgba(29, 53, 87, 0.95);
  border-color: var(--persian-green);
}
.nav-item.active {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  color: var(--honeydew) !important;
  box-shadow: 0 4px 12px rgba(69, 123, 157, 0.4);
}
.nav-item:hover:not(.active) {
  background: rgba(148, 210, 189, 0.3);
  color: var(--honeydew) !important;
  transform: translateY(-1px);
}
.nav-item i {
  font-size: 16px;
}
@media (max-width: 768px) {
  .dynamic-island {
    left: 10px !important;
    right: 10px !important;
    transform: none !important;
    border-radius: 25px !important;
    width: calc(100% - 20px) !important;
  }
  .nav-label {
    display: none !important;
  }
  .nav-item {
    padding: 12px !important;
    min-width: 44px !important;
    justify-content: center !important;
    flex: 1 1 0%;
  }
}
@media (max-width: 480px) {
  .dynamic-island {
    left: 8px !important;
    right: 8px !important;
    width: calc(100% - 16px) !important;
  }
  .nav-item {
    padding: 10px 8px !important;
    min-width: 40px !important;
  }
  .nav-item i {
    font-size: 14px !important;
  }
}
</style>
