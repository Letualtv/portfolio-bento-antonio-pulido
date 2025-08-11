<template>
  <section 
    id="inicio" 
    class="hero-section"
    role="banner"
    aria-labelledby="hero-title"
  >
    <div class="container">
      <div class="row hero-grid align-items-center justify-content-between flex-lg-row flex-column-reverse">
        <div class="col-auto hero-content order-lg-1 order-2 mb-5 mb-lg-0">
          <h1 id="hero-title" class="hero-title">
            <span class="greeting-line text-start">{{ t('hero.greeting') }}</span>
            <span class="name-line text-gradient my-2 my-lg-0">{{ t('hero.name') }}</span>
          </h1>
          <h2 class="hero-subtitle-role">{{ t('hero.title') }}</h2>
          <p class="hero-subtitle text-start mx-1 mx-lg-0">
            {{ t('hero.description') }}
          </p>
          <div class="gap-3 d-flex flex-wrap justify-content-center justify-content-lg-start" role="group" aria-label="{{ currentLang === 'en' ? 'Main actions' : 'Acciones principales' }}">
            <a
              class="btn btn-primary-custom"
              href="/cv-antonio-pulido.pdf"
              download="CV-Antonio-Pulido-FullStack-Developer.pdf"
              target="_blank"
              rel="noopener noreferrer author"
              :title="t('hero.downloadCV')"
              :aria-label="t('hero.downloadCV')"
              tabindex="0"
              type="application/pdf"
            >
              <i class="bi bi-download" aria-hidden="true"></i>
              {{ t('hero.downloadCV') }}
            </a>
            <button 
              class="btn btn-outline-custom" 
              @click="$emit('scrollToSection', 'experiencia')"
              :aria-label="`${t('hero.viewWork')} - ${currentLang === 'en' ? 'Navigate to experience section' : 'Navegar a la sección de experiencia'}`"
            >
              <i class="bi bi-eye" aria-hidden="true"></i>
              {{ t('hero.viewWork') }}
            </button>
          </div>
        </div>
        <div class="col-auto order-lg-2 order-1">
          <div class="d-flex flex-lg-row flex-column align-items-center justify-content-center gap-4">
            <!-- Foto de perfil -->
            <div 
              class="profile-card mx-2 mx-md-0"
              role="img"
              :aria-label="`${currentLang === 'en' ? 'Profile card for' : 'Tarjeta de perfil para'} ${t('hero.name')}`"
            >
              <div class="profile-image-wrapper">
                <div class="profile-image">
                  <img 
                    :src="profilePhoto" 
                    :alt="`${t('accessibility.profileImage')} - ${t('hero.name')}, ${t('hero.title')}`" 
                    class="profile-photo"
                    width="312"
                    height="467"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    sizes="(max-width: 480px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 312px, 320px"
                  >
                  <div class="profile-overlay">
                    <div class="profile-decoration"></div>
                  </div>
                </div>
                <div class="status-indicator" role="status" :aria-label="currentLang === 'en' ? 'Available for work' : 'Disponible para trabajar'">
                  <span class="status-dot" aria-hidden="true"></span>
                  <span class="status-text">{{ currentLang === 'en' ? 'Available' : 'Disponible' }}</span>
                </div>
              </div>
              <div class="profile-info">
                <h3 class="profile-name">{{ t('hero.name') }}</h3>
                <p class="profile-position">{{ t('hero.currentPosition') }}</p>
                <p class="profile-institution">{{ t('hero.institution') }}</p>
              </div>
            </div>
            <!-- Redes sociales -->
            <nav 
              class="social-links d-flex flex-lg-column flex-row align-items-center justify-content-center gap-3 mt-lg-0 mt-2"
              role="navigation"
              :aria-label="currentLang === 'en' ? 'Social media links' : 'Enlaces de redes sociales'"
            >
              <a v-for="social in socialLinks" :key="social.platform" :href="social.url"
                :class="['social-link', social.class]" :title="`${social.platform} - ${currentLang === 'en' ? 'Opens in new window' : 'Se abre en nueva ventana'}`"
                :aria-label="`${currentLang === 'en' ? 'Visit my' : 'Visita mi'} ${social.platform} ${currentLang === 'en' ? 'profile (opens in new window)' : 'perfil (se abre en nueva ventana)'}`" 
                target="_blank"
                rel="noopener noreferrer">
                <i :class="`bi bi-${social.icon}`" aria-hidden="true"></i>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { useI18n } from '../../composables/useI18n.js'
import profilePhoto from '../../assets/profile-photo.webp'
import { socialLinksData } from '../../data/socialLinks.js'

const emit = defineEmits(['scrollToSection'])
const { t, currentLang } = useI18n()

const socialLinks = socialLinksData
</script>

<style scoped>
/* Sección Hero */
.hero-section {
  padding: 7rem 0 3rem;
  background: linear-gradient(135deg, var(--background-primary) 0%, var(--background-secondary) 100%);
  position: relative;
  overflow: hidden;
  min-height: 100dvh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(69, 123, 157, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(148, 210, 189, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(233, 196, 106, 0.05) 0%, transparent 70%);
  pointer-events: none;
}





.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.greeting-line {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 500;
  color: var(--text-muted);
}

.name-line {
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 700;
}

.hero-subtitle-role {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
}

.text-gradient {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green), var(--saffron));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.btn {
  padding: 14px 28px;
  border-radius: var(--border-radius-xl);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition-normal);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  min-height: 44px;
  /* Accessibility */
}

.btn-primary-custom {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  color: var(--honeydew);
  box-shadow: 0 4px 12px rgba(69, 123, 157, 0.3);
}

.btn-primary-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(42, 157, 143, 0.4);
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
}

.btn-outline-custom {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 12px 26px;
}

.btn-outline-custom:hover {
  background: var(--primary-color);
  color: var(--honeydew);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(69, 123, 157, 0.3);
}

/* Imagen de perfil y redes sociales */


.profile-card {
  background: var(--background-secondary);
  border-radius: 35px;
  padding: 30px;
  box-shadow: var(--shadow-xl);
  backdrop-filter: blur(20px);
  border: 3px solid var(--tiffany-blue);
  transition: var(--transition-normal);
}

.profile-card:hover {
  border-color: var(--persian-green);
  box-shadow: 0 25px 50px rgba(148, 210, 189, 0.4);
  transform: translateY(-5px);
}

.profile-image-wrapper {
  text-align: center;
  margin-bottom: 25px;
}

.profile-image {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.profile-photo {
  width: 320px;
  height: 320px;
  border-radius: 25px;
  object-fit: cover;
  border: 4px solid var(--tiffany-blue);
  transition: var(--transition-normal);
  box-shadow: 0 12px 32px rgba(148, 210, 189, 0.4);
  position: relative;
  z-index: 2;
}

.profile-photo:hover {
  border-color: var(--persian-green);
  box-shadow: 0 16px 40px rgba(42, 157, 143, 0.5);
  transform: scale(1.02);
}

.profile-overlay {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 30px;
  background: linear-gradient(135deg,
      rgba(69, 123, 157, 0.1) 0%,
      rgba(148, 210, 189, 0.15) 50%,
      rgba(233, 196, 106, 0.1) 100%);
  z-index: 1;
  animation: gradientRotate 6s ease-in-out infinite;
}

@keyframes gradientRotate {

  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(2deg) scale(1.02);
  }
}

.profile-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 340px;
  border: 2px dashed var(--persian-green);
  border-radius: 25px;
  opacity: 0.3;
  animation: spin 20s linear infinite;
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.profile-info {
  text-align: center;
  padding: 0 10px;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.profile-position {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 4px;
}

.profile-institution {
  font-size: 0.95rem;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 0;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 50px;
  padding: 8px 16px;
  margin-top: 10px;
  backdrop-filter: blur(10px);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.status-text {
  font-size: 14px;
  font-weight: 600;
  color: #22c55e;
}

/* Redes sociales */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  font-size: 20px;
  transition: var(--transition-normal);
  box-shadow: var(--shadow-md);
}

.social-link:hover {
  transform: translateY(-3px) scale(1.05);
  color: white;
  box-shadow: var(--shadow-lg);
}

.social-link.linkedin {
  background: linear-gradient(135deg, #0077b5, #00a0dc);
}

.social-link.github {
  background: linear-gradient(135deg, #333, #24292e);
}

.social-link.instagram {
  background: linear-gradient(135deg, #E4405F, #C13584);
}

.social-link.iesa {
  background: linear-gradient(135deg, #2c5282, #3182ce);
}

.social-link.email {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
}



.profile-card:hover .status-dot {
  background: linear-gradient(135deg, #22c55e 80%, #a7f3d0 100%);
  box-shadow: 0 0 24px 6px #22c55e, 0 0 8px 2px #a7f3d0;
  animation: dot-glow 1.2s ease-in-out infinite;
}

@keyframes dot-glow {
  0% { box-shadow: 0 0 24px 3px #22c55e, 0 0 8px 1px #a7f3d0; }
  50% { box-shadow: 0 0 32px 6px #22c55e, 0 0 16px 2px #a7f3d0; }
  100% { box-shadow: 0 0 24px 3px #22c55e, 0 0 8px 1px #a7f3d0; }
}

.profile-card:hover .status-text {
  color: #16a34a;
  text-shadow: 0 0 6px rgba(34,197,94,0.18);
  transition: color 0.0s cubic-bezier(.4,0,.2,1), text-shadow 0.3s cubic-bezier(.4,0,.2,1);
}

.profile-card:hover .status-indicator {
  border-color: var(--persian-green);
  box-shadow: 0 15px 30px rgba(148, 210, 189, 0.4);
  transition: box-shadow 0.3s cubic-bezier(.4,0,.2,1), border-color 0.3s cubic-bezier(.4,0,.2,1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 5rem 0 2rem;
    min-height: auto;
  }
  
  .profile-card {
    margin: 0 1rem; /* Añadir margen horizontal en móvil */
    padding: 20px;
    border-radius: 25px;
  }
  
  .profile-photo {
    width: 280px;
    height: 280px;
  }
  
  .profile-decoration {
    width: 300px;
    height: 300px;
  }
  
  .social-links {
    flex-direction: row;
    justify-content: center;
    gap: 8px;
    margin-top: 1rem;
  }
  
  .social-link {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 4rem 0 1.5rem;
  }
  
  .profile-card {
    margin: 0 0.75rem; /* Margen más pequeño en pantallas muy pequeñas */
    padding: 15px;
    border-radius: 20px;
  }
  
  .profile-photo {
    width: 240px;
    height: 240px;
  }
  
  .profile-decoration {
    width: 260px;
    height: 260px;
  }
  
  .profile-name {
    font-size: 1.3rem;
  }
  
  .profile-position {
    font-size: 1rem;
  }
  
  .profile-institution {
    font-size: 0.9rem;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
}

</style>
