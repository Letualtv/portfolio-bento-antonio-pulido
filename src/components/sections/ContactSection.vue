<template>
  <section id="contacto" class="section contact-section">
    <div class="container">
      <h2 class="section-title">{{ t('sections.contactTitle') }}</h2>
      <p class="contact-description">
        Estoy siempre abierto a nuevas oportunidades y proyectos interesantes.
      </p>
      
      <div class="contact-content">
        <div class="contact-info">
          
          <div class="contact-methods">
            <a 
              v-for="method in contactMethods.slice(0, 2)"
              :key="method.type"
              :href="method.url"
              class="contact-method"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="contact-icon">
                <i :class="`bi bi-${method.icon}`" aria-hidden="true"></i>
              </div>
              <div class="contact-details">
                <div class="contact-label">{{ method.label }}</div>
                <div class="contact-value">{{ method.value }}</div>
              </div>
            </a>
            
            <!-- Ubicación con mapa integrado -->
            <div class="contact-method location-method">
              <div class="contact-icon">
                <i class="bi bi-geo-alt" aria-hidden="true"></i>
              </div>
              <div class="contact-details">
                <div class="location-header">
                  <div class="contact-label">{{ contactMethods[2].label }}</div>
                  <div class="contact-value">{{ contactMethods[2].value }}</div>
                </div>
                
                <!-- Mapa elegante con OpenStreetMap - Provincia de Córdoba -->
                <div class="map-container">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-5.6000%2C37.3000%2C-3.8000%2C38.7000&layer=mapnik&marker=37.8882%2C-4.7916"
                    width="100%"
                    height="200"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Provincia de Córdoba, España"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form-container">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name" class="form-label">Nombre</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name"
                class="form-input"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                class="form-input"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="subject" class="form-label">Asunto</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject"
                class="form-input"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="message" class="form-label">Mensaje</label>
              <textarea 
                id="message" 
                v-model="form.message"
                class="form-textarea"
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary-custom" :disabled="isSubmitting">
              <i class="bi bi-send" aria-hidden="true"></i>
              {{ isSubmitting ? 'Enviando...' : 'Enviar mensaje' }}
            </button>
            
            <!-- Mensaje de estado -->
            <div v-if="submitMessage" class="submit-message" :class="submitStatus">
              <i :class="submitStatus === 'success' ? 'bi bi-check-circle' : 'bi bi-exclamation-triangle'" aria-hidden="true"></i>
              {{ submitMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../../composables/useI18n.js'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../../config/emailjs.js'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' | 'error' | ''

const contactMethods = [
  {
    type: 'email',
    icon: 'envelope',
    label: 'Email',
    value: 'antonio.pulido.1996@gmail.com',
    url: 'mailto:antonio.pulido.1996@gmail.com'
  },
  {
    type: 'phone',
    icon: 'telephone',
    label: 'Teléfono',
    value: '+34 615 961 827',
    url: 'tel:+34615961827'
  },
  {
    type: 'location',
    icon: 'geo-alt',
    label: 'Ubicación',
    value: 'Desde Córdoba con amor ❤️',
    url: '#'
  }
]

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''
  submitStatus.value = ''
  
  try {
    // Validación básica
    if (!form.value.name || !form.value.email || !form.value.message) {
      throw new Error('Por favor, completa todos los campos obligatorios.')
    }

    // Preparar los datos para EmailJS
    const templateParams = {
      from_name: form.value.name,
      from_email: form.value.email,
      subject: form.value.subject || 'Mensaje desde el portfolio',
      message: form.value.message,
      to_name: 'Antonio Pulido', // Tu nombre
      reply_to: form.value.email
    }

    // Enviar email usando EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    )

    if (response.status === 200) {
      submitStatus.value = 'success'
      submitMessage.value = '¡Mensaje enviado correctamente! Te responderé pronto.'
      
      // Resetear formulario
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  } catch (error) {
    console.error('Error al enviar:', error)
    submitStatus.value = 'error'
    
    if (error.message.includes('campos obligatorios')) {
      submitMessage.value = error.message
    } else if (error.text) {
      submitMessage.value = `Error al enviar: ${error.text}`
    } else {
      submitMessage.value = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contacta directamente por email.'
    }
  } finally {
    isSubmitting.value = false
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      submitMessage.value = ''
      submitStatus.value = ''
    }, 5000)
  }
}
</script>

<style scoped>
.contact-section {
  padding: 100px 0;
  background: var(--background-secondary);
  transition: background-color var(--transition-normal);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
}

[data-theme="dark"] .section-title {
  filter: brightness(1.2) contrast(1.2);
}

.contact-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-muted);
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: stretch;
}

.contact-subtitle {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--background-primary);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  padding: 2rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--background-secondary);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  transition: var(--transition-normal);
  border: 1px solid var(--border-color);
}

.contact-method:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--persian-green);
}

.contact-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.contact-label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.contact-value {
  color: var(--text-muted);
  font-size: 1rem;
}

/* Mapa moderno y elegante */
.map-container {
  margin: 1rem 0;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 2px solid var(--border-color);
  background: var(--background-secondary);
  position: relative;
}

.map-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 49%, rgba(42, 157, 143, 0.1) 50%, transparent 51%);
  pointer-events: none;
  z-index: 1;
}

.map-container iframe {
  width: 100%;
  height: 200px;
  border: none;
  border-radius: var(--border-radius-lg);
  filter: saturate(1.2) contrast(1.1) brightness(1.05);
  transition: var(--transition-normal);
}

.map-container:hover iframe {
  filter: saturate(1.4) contrast(1.2) brightness(1.1);
  transform: scale(1.02);
}

.location-method {
  align-items: flex-start;
  padding: 1.5rem;
}

.location-method .contact-details {
  width: 100%;
}

.location-method .location-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.location-method:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--persian-green);
}

/* Formulario */
.contact-form-container {
  background: var(--background-primary);
  padding: 2rem;
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.form-input,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-md);
  background: var(--background-secondary);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition-normal);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--persian-green);
  box-shadow: 0 0 0 3px rgba(42, 157, 143, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.btn {
  padding: 14px 28px;
  border-radius: var(--border-radius-xl);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: var(--transition-normal);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  min-height: 44px;
}

.btn-primary-custom {
  background: linear-gradient(135deg, var(--cerulean), var(--persian-green));
  color: var(--honeydew);
  box-shadow: 0 4px 12px rgba(69, 123, 157, 0.3);
}

.btn-primary-custom:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(42, 157, 143, 0.4);
  background: linear-gradient(135deg, var(--persian-green), var(--saffron));
}

.btn-primary-custom:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Mensaje de estado del formulario */
.submit-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  font-size: 0.9rem;
  animation: fadeIn 0.3s ease-in-out;
}

.submit-message.success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.submit-message.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-section {
    padding: 80px 0;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-form-container {
    padding: 1.5rem;
  }
  
  .contact-method {
    padding: 0.75rem;
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .contact-section {
    padding: 60px 0;
  }
  
  .container {
    padding: 0 0.75rem;
  }
  
  .contact-form-container {
    padding: 1rem;
  }
  
  .contact-methods {
    gap: 0.75rem;
  }
  
  .contact-method {
    padding: 0.5rem;
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .form-input,
  .form-textarea {
    padding: 0.6rem 0.8rem;
  }
}
</style>
