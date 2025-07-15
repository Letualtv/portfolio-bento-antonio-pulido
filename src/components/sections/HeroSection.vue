<template>
  <section id="inicio" class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="greeting-line">{{ t('hero.greeting') }}</span>
            <span class="name-line text-gradient">{{ t('hero.name') }}</span>
          </h1>
          <h2 class="hero-subtitle-role">{{ t('hero.title') }}</h2>
          <p class="hero-subtitle">
            {{ t('hero.description') }}
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary-custom" @click="handleDownloadCV">
              <i class="bi bi-download" aria-hidden="true"></i>
              {{ t('hero.downloadCV') }}
            </button>
            <button class="btn btn-outline-custom" @click="$emit('scrollToSection', 'experiencia')">
              <i class="bi bi-eye" aria-hidden="true"></i>
              {{ t('hero.viewWork') }}
            </button>
          </div>
        </div>
        
        <div class="hero-image-section">
          <div class="hero-image-container">              <!-- Foto de perfil -->
              <div class="profile-card">
                <div class="profile-image-wrapper">
                  <div class="profile-image">
                    <img 
                      :src="profilePhoto" 
                      :alt="t('accessibility.profileImage')"
                      class="profile-photo"
                    >
                    <div class="profile-overlay">
                      <div class="profile-decoration"></div>
                    </div>
                  </div>
                  <div class="status-indicator">
                    <span class="status-dot" aria-hidden="true"></span>
                    <span class="status-text">{{ t('hero.availableForWork') }}</span>
                  </div>
                </div>
                <div class="profile-info">
                  <h3 class="profile-name">{{ t('hero.name') }}</h3>
                  <p class="profile-position">{{ t('hero.currentPosition') }}</p>
                  <p class="profile-institution">{{ t('hero.institution') }}</p>
                </div>
              </div>
            
            <!-- Redes sociales -->
            <div class="social-links">
              <a 
                v-for="social in socialLinks"
                :key="social.platform"
                :href="social.url" 
                :class="['social-link', social.class]"
                :title="social.platform"
                :aria-label="t('accessibility.socialLink').replace('{platform}', social.platform)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i :class="`bi bi-${social.icon}`" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../../composables/useI18n.js'
import profilePhoto from '../../assets/profile-photo.jpg'
import { socialLinksData } from '../../data/socialLinks.js'

const emit = defineEmits(['scrollToSection'])
const { t } = useI18n()

const socialLinks = socialLinksData

const handleDownloadCV = () => {
  // Crear enlace de descarga para el CV desde assets
  const link = document.createElement('a')
  link.href = '/src/assets/cv-antonio-pulido.pdf'
  link.download = 'CV-Antonio-Pulido-FullStack-Developer.pdf'
  link.target = '_blank'
  
  // Verificar si el archivo existe antes de intentar descargarlo
  fetch(link.href, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        // Si el archivo existe, proceder con la descarga
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // Si no existe, mostrar mensaje informativo
        alert('CV encontrado en assets pero no accesible vía web. Copiando a carpeta public...')
        console.log('CV disponible en: c:\\Users\\IESA\\Desktop\\otros proyectos\\Porfolio\\portfolio-bento\\src\\assets\\cv-antonio-pulido.pdf')
        console.log('Para descarga web, copia también a: c:\\Users\\IESA\\Desktop\\otros proyectos\\Porfolio\\portfolio-bento\\public\\cv-antonio-pulido.pdf')
      }
    })
    .catch(() => {
      // Intentar ruta alternativa en public
      link.href = '/cv-antonio-pulido.pdf'
      fetch(link.href, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } else {
            alert('Para habilitar la descarga, copia tu CV desde assets a la carpeta public/')
            console.log('Copia desde: c:\\Users\\IESA\\Desktop\\otros proyectos\\Porfolio\\portfolio-bento\\src\\assets\\cv-antonio-pulido.pdf')
            console.log('Hacia: c:\\Users\\IESA\\Desktop\\otros proyectos\\Porfolio\\portfolio-bento\\public\\cv-antonio-pulido.pdf')
          }
        })
    })
}
</script>

<style scoped>
/* Sección Hero */
.hero-section {
  padding: 120px 0 80px;
  background: linear-gradient(135deg, var(--background-primary) 0%, var(--background-secondary) 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 70vh;
}

.hero-content {
  position: relative;
  z-index: 2;
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
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
  min-height: 44px; /* Accessibility */
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
.hero-image-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.profile-card {
  position: relative;
  background: var(--background-secondary);
  border-radius: 35px;
  padding: 30px;
  box-shadow: var(--shadow-xl);
  backdrop-filter: blur(20px);
  border: 3px solid var(--tiffany-blue);
  transition: var(--transition-normal);
  max-width: 450px;
  margin: 0 auto;
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
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(2deg) scale(1.02); }
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
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-text {
  font-size: 12px;
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

.social-link.linkedin { background: linear-gradient(135deg, #0077b5, #00a0dc); }
.social-link.github { background: linear-gradient(135deg, #333, #24292e); }
.social-link.instagram { background: linear-gradient(135deg, #E4405F, #C13584); }
.social-link.iesa { background: linear-gradient(135deg, #2c5282, #3182ce); }
.social-link.email { background: linear-gradient(135deg, var(--cerulean), var(--persian-green)); }

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-grid {
    gap: 3rem;
  }
  
  .profile-photo {
    width: 280px;
    height: 280px;
  }
  
  .profile-decoration {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 100px 0 60px;
    text-align: center;
  }
  
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .hero-image-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .social-links {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .profile-photo {
    width: 250px;
    height: 250px;
  }
  
  .profile-decoration {
    width: 270px;
    height: 270px;
  }
  
  .profile-card {
    max-width: 350px;
    padding: 25px;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-content {
    order: 2;
  }
  
  .hero-image-section {
    order: 1;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 80px 0 40px;
  }
  
  .container {
    padding: 0 0.75rem;
  }
  
  .hero-grid {
    gap: 2rem;
  }
  
  .profile-photo {
    width: 220px;
    height: 220px;
  }
  
  .profile-decoration {
    width: 240px;
    height: 240px;
  }
  
  .profile-card {
    padding: 20px;
    max-width: 300px;
  }
  
  .social-link {
    width: 44px;
    height: 44px;
    font-size: 18px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  
  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}
</style>
