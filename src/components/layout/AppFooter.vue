<template>
  <footer class="footer-portfolio border-top pt-2 pb-2" role="contentinfo">
    <div class="container">
      <div class="row align-items-center justify-content-between gy-2">
        <div class="col-12 col-md-auto order-1 order-md-2 order-lg-2">
          <div class="d-flex justify-content-center justify-content-md-end align-items-center gap-2">
            <a 
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.url"
              class="footer-social-link border-0 p-0 d-flex align-items-center justify-content-center bg-transparent"
              :title="social.platform"
              :aria-label="'Enlace a ' + social.platform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i :class="`bi bi-${social.icon} `" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div class="col-12 col-md text-center text-md-start order-2 order-md-1 order-lg-1">
          <small class="footer-copyright">
            © {{ currentYear }} Antonio Pulido.
            <span v-if="t('footer.licence') && t('footer.licence').trim()"></span>
            <span class="footer-cc-block">
              <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.es" target="_blank" rel="license noopener" class="footer-cc-link" aria-label="Licencia Creative Commons BY-NC 4.0">
                <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="Creative Commons" class="footer-cc-icon" loading="lazy" width="16" height="16">
                <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="Reconocimiento (BY)" class="footer-cc-icon" loading="lazy" width="16" height="16">
                <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="No Comercial (NC)" class="footer-cc-icon" loading="lazy" width="16" height="16">
                CC BY-NC 4.0
              </a>
            </span>
          </small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../../composables/useI18n.js'
import { socialLinksData } from '../../data/socialLinks.js'

const { t } = useI18n()

const currentYear = computed(() => new Date().getFullYear())

// Filtrar redes sociales relevantes para el footer (sin email ni IESA)
const socialLinks = socialLinksData.filter(social => 
  !['Email', 'IESA-CSIC'].includes(social.platform)
)
</script>

<style scoped>
.footer-portfolio {
  background: var(--background-primary);
  border-top: 1px solid var(--border-color);
  transition: background-color var(--transition-normal);
}

/* Más espacio en footer para móviles y tablets (navegación inferior) */
@media (max-width: 1024px) {
  .footer-portfolio {
    padding-bottom: 6rem !important; /* Espacio para navegación inferior */
  }
}

.footer-social-link {
  aspect-ratio: 1/1;
  min-width: 2.5em;
  min-height: 2.5em;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  overflow: visible;
}
.footer-social-link:hover {
  background: transparent;
  transform: translateY(-2px) scale(1.08);
}
.footer-social-link i {
  color: var(--persian-green);
  font-size: clamp(1.3rem, 2vw, 1.7rem);
  transition: color 0.18s, background 0.18s, transform 0.18s;
  z-index: 2;
}
@media (max-width: 1024px) {
  .footer-social-link i {
    font-size: 2.2rem;
  }
  .footer-social-link {
    min-width: 3em;
    min-height: 3em;
  }
}
.footer-social-link:hover i {
  color: linear-gradient(135deg, var(--persian-green), var(--saffron)) !important;
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
[data-theme="dark"] .footer-social-link {
  color: var(--charcoal);
}

[data-theme="dark"] .footer-social-link i {
  color: var(--tiffany-blue) !important;
}
[data-theme="dark"] .footer-social-link:hover i {
    background: linear-gradient(135deg, var(--persian-green), var(--saffron));

  color: linear-gradient(135deg, var(--persian-green), var(--saffron)) !important;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-copyright {
  color: #5a6c7d; /* Mejorado contraste: 4.6:1 ratio */
  font-size: 0.89rem;
  letter-spacing: 0.01em;
}
.footer-cc-block {
  display: inline-block;
  margin-left: 0.5em;
}
.footer-cc-link {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: #4a5568; /* Mejorado contraste: 4.9:1 ratio */
  font-size: 0.95em;
  font-weight: 500;
}
.footer-cc-icon {
  height: 0.9em;
  width: auto;
  vertical-align: middle;
  opacity: 0.8; /* Aumentado para mejor contraste */
}

[data-theme="dark"] .footer-portfolio {
  border-top: 1px solid var(--persian-green);
}
[data-theme="dark"] .footer-copyright {
  color: #d1dce6; /* Mejorado contraste tema oscuro: 7.1:1 ratio */
}
[data-theme="dark"] .footer-cc-link {
  color: #cbd5e0; /* Mejorado contraste para enlaces en tema oscuro */
}
</style>