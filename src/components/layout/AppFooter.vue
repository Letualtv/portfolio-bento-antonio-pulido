<template>
  <footer id="contact" class="footer">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="footer-main pt-4">
        <div class="row justify-content-center gx-5 gy-3">
          <div class="col-md-6 col-12 ">
            <div class="footer-section text-center text-md-start d-flex flex-column gap-3">
              <h4 class="footer-title d-none d-lg-block">{{ t('footer.contact') }}</h4>
              <div class="footer-contact d-flex flex-column gap-2 align-items-md-start align-items-center">
                <a href="mailto:antonio.pulido.1996@gmail.com" class="footer-contact-item d-flex align-items-center gap-2">
                  <i class="bi bi-envelope" aria-hidden="true"></i>
                  <span>antonio.pulido.1996@gmail.com</span>
                </a>
                <a href="tel:+34615961827" class="footer-contact-item d-flex align-items-center gap-2">
                  <i class="bi bi-telephone" aria-hidden="true"></i>
                  <span>+34 615 961 827</span>
                </a>
                <div class="footer-contact-item d-flex align-items-center gap-2">
                  <i class="bi bi-geo-alt" aria-hidden="true"></i>
                  <span>Córdoba, España</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="footer-section text-center text-md-start d-flex flex-column gap-3">
              <h4 class="footer-title d-none d-lg-block">{{ t('footer.followMe') }}</h4>
<div class="footer-social w-100">
  <!-- Solo iconos en móvil y tablet -->
  <div class="d-flex flex-row justify-content-center align-items-center gap-3 d-md-flex d-lg-none ">
    <a 
      v-for="social in socialLinks"
      :key="social.platform"
      :href="social.url"
      class="footer-social-link"
      :title="social.platform"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i :class="`bi bi-${social.icon} fs-1`" aria-hidden="true"></i>
    </a>
  </div>
  <!-- Iconos + texto solo en desktop -->
  <div class="d-none d-lg-flex flex-column gap-2 align-items-lg-start align-items-center">
    <a 
      v-for="social in socialLinks"
      :key="social.platform"
      :href="social.url"
      class="footer-social-link d-flex align-items-center gap-2"
      :title="social.platform"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i :class="`bi bi-${social.icon}`" aria-hidden="true"></i>
      <span>{{ social.platform }}</span>
    </a>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer Bottom -->
      <div class="footer-bottom border-top py-3">
        <div class="row align-items-center justify-content-between gx-3 gy-2">
          <div class="col-12 col-md-auto text-center text-md-start mb-2 mb-md-0">
            <div class="footer-copyright">
              <p class="mb-0">
                © {{ currentYear }} Antonio Pulido. <span v-html="t('footer.licence')"></span>
              </p>
            </div>
          </div>
          <div class="col-12 col-md-auto text-center text-md-end">
            <div class="footer-tech d-flex align-items-center justify-content-center justify-content-md-end gap-2">
              <span>{{ t('footer.madeWith') }}</span>
              <div class="tech-stack d-flex align-items-center gap-2">
                <span class="tech-item">Vue.js</span>
                <span class="tech-divider">•</span>
                <span class="tech-item">Vite</span>
                <span class="tech-divider">•</span>
                <span class="tech-item">EmailJS</span>
              </div>
            </div>
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
.footer {
  background: var(--background-primary);
  border-top: 1px solid var(--border-color);
  transition: background-color var(--transition-normal);
}



/* Main Footer Content */
.footer-main {
  padding: 4rem 0 2rem;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Footer Sections */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition-normal);
  font-size: 0.9rem;
  padding: 0.25rem 0;
}

.footer-link:hover {
  color: var(--persian-green);
  transform: translateX(4px);
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: var(--transition-normal);
}

.footer-contact-item:hover {
  color: var(--persian-green);
}

.footer-contact-item i {
  font-size: 1rem;
  width: 16px;
  flex-shrink: 0;
}

.footer-social {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: var(--transition-normal);
  padding: 0.25rem 0;
}

/* Iconos sociales: solo iconos en móvil/tablet, icono grande */
.footer-social-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition-normal);
  padding: 0.25rem;
}
.footer-social-link:hover {
  color: var(--persian-green);
  transform: scale(1.2);
}
.footer-social-link i {
  width: 32px;
  flex-shrink: 0;
}


.footer-copyright {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 0;
}

.footer-tech {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.tech-stack {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tech-item {
  color: var(--persian-green);
  font-weight: 500;
}

.tech-divider {
  color: var(--text-muted);
  opacity: 0.5;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-main {
    padding: 3rem 0 1.5rem;
    gap: 2rem;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .brand-logo {
    justify-content: center;
  }
  
  .footer-section {
    text-align: center;
  }
  
  .footer-nav,
  .footer-contact,
  .footer-social {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .footer-main {
    padding: 2rem 0 1rem;
  }

  .brand-logo {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .brand-description {
    max-width: 100%;
    text-align: center;
  }
  
  .footer-copyright,
  .footer-tech {
    font-size: 0.8rem;
  }
}
</style>
