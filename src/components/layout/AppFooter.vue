<template>
  <footer id="contact" class="footer-portfolio border-top pt-2 pb-2">
    <div class="container">
      <div class="row align-items-center justify-content-between gy-3">
        <div class="col-12 col-md text-center text-md-start mb-2 mb-md-0">
          <small class="footer-copyright">
            © {{ currentYear }} Antonio Pulido.
            <span v-if="t('footer.licence') && t('footer.licence').trim()"></span>
            <span class="footer-cc-block">
              <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.es" target="_blank" rel="noopener" class="footer-cc-link">
                <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" class="footer-cc-icon">
                <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" class="footer-cc-icon">
                <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="NC" class="footer-cc-icon">
                CC BY-NC 4.0
              </a>
            </span>
          </small>
        </div>
        <div class="col-12 col-md-auto">
          <div class="d-flex justify-content-center justify-content-md-end align-items-center gap-2">
            <a 
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.url"
              class="footer-social-link border-0 p-0 d-flex align-items-center justify-content-center bg-transparent"
              :title="social.platform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i :class="`bi bi-${social.icon}`"></i>
            </a>
          </div>
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

.footer-social-link {
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-xl);
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
  transform: translateY(-2px) scale(1.12);
}
.footer-social-link i {
  color: var(--persian-green);
  font-size: 1.7rem;
  transition: color 0.18s, background 0.18s, transform 0.18s;
  z-index: 2;
}
.footer-social-link:hover i {
  color: var(--honeydew);
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
[data-theme="dark"] .footer-social-link {
  background: linear-gradient(135deg, var(--persian-green), var(--cerulean));
  color: var(--charcoal);
}
[data-theme="dark"] .footer-social-link:hover {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  color: var(--honeydew);
}
[data-theme="dark"] .footer-social-link i {
  color: var(--tiffany-blue);
}
[data-theme="dark"] .footer-social-link:hover i {
  color: var(--saffron);
  background: linear-gradient(135deg, var(--persian-green), var(--cerulean));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.footer-copyright {
  color: #7a8a99;
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
  color: inherit;
  font-size: 0.95em;
}
.footer-cc-icon {
  height: 0.9em;
  vertical-align: middle;
  opacity: 0.6;
}

[data-theme="dark"] .footer-portfolio {
  background: var(--background-primary);
  border-top: 1px solid var(--persian-green);
}
[data-theme="dark"] .footer-copyright {
  color: #b6c6d6;
}
</style>