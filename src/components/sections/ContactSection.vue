<template>
  <section 
    id="contacto" 
    class="contact-section"
    role="region"
    aria-labelledby="contact-title"
  >
    <div class="container">
      <h2 id="contact-title" class="section-title">{{ t('sections.contactTitle') }}</h2>
      <p class="contact-description">{{ t('contact.contactDescription') }}</p>
      <div class="row contact-content justify-content-between d-flex g-4">
        <div class="col-12 col-lg-6 d-flex order-2 order-lg-1">
          <div 
            class="contact-info col-12 p-3 p-md-5"
            role="complementary"
            aria-labelledby="contact-info-heading"
          >
            <h3 id="contact-info-heading" class="visually-hidden">{{ currentLang === 'en' ? 'Contact Information' : 'Información de Contacto' }}</h3>
            <div class="contact-methods" role="list">
              <div 
                v-for="(method, idx) in contactMethods" 
                :key="method.type" 
                class="contact-method p-3" 
                :class="{'location-method d-block': method.type === 'location'}"
                role="listitem"
              >
                <template v-if="method.type !== 'location'">
                  <a 
                    :href="method.url" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="d-flex align-items-center gap-3 w-100 text-decoration-none"
                    :aria-label="`${method.label}: ${method.value} ${currentLang === 'en' ? '(opens in new window)' : '(se abre en nueva ventana)'}`"
                  >
                    <div class="contact-icon flex-shrink-0">
                      <i :class="`bi bi-${method.icon}`" aria-hidden="true"></i>
                    </div>
                    <div class="contact-details d-flex flex-column text-start w-100">
                      <div class="contact-label mb-1">{{ method.label }}</div>
                      <div class="contact-value mb-1">{{ method.value }}</div>
                    </div>
                  </a>
                </template>
                <template v-else>
                  <div class="d-flex align-items-center gap-3 mb-2 w-100">
                    <div class="contact-icon flex-shrink-0">
                      <i :class="`bi bi-${method.icon}`" aria-hidden="true"></i>
                    </div>
                    <div class="contact-details d-flex flex-column text-start w-100">
                      <div class="contact-label mb-1">{{ method.label }}</div>
                      <div class="contact-value mb-1">{{ method.value }}</div>
                    </div>
                  </div>
                  <div class="map-container mt-3">
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-5.6000%2C37.3000%2C-3.8000%2C38.7000&layer=mapnik&marker=37.8882%2C-4.7916"
                      width="100%"
                      height="200"
                      style="border:0;"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                      title="{{ currentLang === 'en' ? 'Interactive map showing Córdoba Province, Spain' : 'Mapa interactivo mostrando la Provincia de Córdoba, España' }}"
                      :aria-label="currentLang === 'en' ? 'Interactive map of Córdoba Province location' : 'Mapa interactivo de la ubicación en Provincia de Córdoba'"
                    ></iframe>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6 d-flex order-1 order-lg-2">
          <div 
            class="contact-form-container col-12 p-4 p-md-5"
            role="form"
            aria-labelledby="contact-form-heading"
          >
            <h3 id="contact-form-heading" class="visually-hidden">{{ currentLang === 'en' ? 'Contact Form' : 'Formulario de Contacto' }}</h3>
            <form 
              @submit.prevent="handleSubmit" 
              class="contact-form"
              novalidate
              :aria-describedby="submitMessage ? 'form-status' : null"
            >
              <div class="form-group">
                <label for="name" class="form-label">{{ t('contact.name') }} <span class="required-asterisk" aria-label="obligatorio">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  class="form-input" 
                  required
                  :aria-describedby="!form.name && submitAttempted ? 'name-error' : null"
                  :aria-invalid="!form.name && submitAttempted ? 'true' : 'false'"
                  autocomplete="name"
                >
                <div id="name-error" class="error-message" v-if="!form.name && submitAttempted">
                  {{ currentLang === 'en' ? 'Name is required' : 'El nombre es obligatorio' }}
                </div>
              </div>
              <div class="form-group">
                <label for="email" class="form-label">Email <span class="required-asterisk" aria-label="obligatorio">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  class="form-input" 
                  required
                  :aria-describedby="!form.email && submitAttempted ? 'email-error' : null"
                  :aria-invalid="!form.email && submitAttempted ? 'true' : 'false'"
                  autocomplete="email"
                >
                <div id="email-error" class="error-message" v-if="!form.email && submitAttempted">
                  {{ currentLang === 'en' ? 'Email is required' : 'El email es obligatorio' }}
                </div>
              </div>
              <div class="form-group">
                <label for="subject" class="form-label">{{ t('contact.subject') }}</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject" 
                  class="form-input" 
                  autocomplete="off"
                >
              </div>
              <div class="form-group">
                <label for="message" class="form-label">{{ t('contact.message') }} <span class="required-asterisk" aria-label="obligatorio">*</span></label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  class="form-textarea" 
                  rows="5" 
                  required
                  :aria-describedby="!form.message && submitAttempted ? 'message-error' : null"
                  :aria-invalid="!form.message && submitAttempted ? 'true' : 'false'"
                  maxlength="1000"
                  :placeholder="currentLang === 'en' ? 'Tell me about your project or question...' : 'Cuéntame sobre tu proyecto o pregunta...'"
                ></textarea>
                <div class="character-count">{{ form.message.length }}/1000</div>
                <div id="message-error" class="error-message" v-if="!form.message && submitAttempted">
                  {{ currentLang === 'en' ? 'Message is required' : 'El mensaje es obligatorio' }}
                </div>
              </div>
              <button 
                type="submit" 
                class="btn btn-primary-custom" 
                :disabled="isSubmitting"
                :aria-describedby="isSubmitting ? 'sending-status' : null"
              >
                <i class="bi bi-send" aria-hidden="true"></i>
                {{ isSubmitting ? t('contact.sending') : t('contact.send') }}
              </button>
              <div id="sending-status" class="visually-hidden" v-if="isSubmitting">
                {{ currentLang === 'en' ? 'Sending message, please wait...' : 'Enviando mensaje, por favor espera...' }}
              </div>
              <div 
                v-if="submitMessage" 
                class="submit-message" 
                :class="submitStatus"
                id="form-status"
                role="status"
                :aria-live="submitStatus === 'error' ? 'assertive' : 'polite'"
                aria-atomic="true"
              >
                <i :class="submitStatus === 'success' ? 'bi bi-check-circle' : 'bi bi-exclamation-triangle'" aria-hidden="true"></i>
                {{ submitMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../../composables/useI18n.js'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../../config/emailjs.js'

const { t, currentLang } = useI18n()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('') // 'success' | 'error' | ''
const submitAttempted = ref(false)

const contactMethods = computed(() => [
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
    label: t('contact.phone'),
    value: '+34 615 961 827',
    url: 'tel:+34615961827'
  },
  {
    type: 'location',
    icon: 'geo-alt',
    label: t('contact.location'),
    value: t('contact.locationValue'),
    url: '#'
  }
])

const handleSubmit = async () => {
  submitAttempted.value = true
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
      submitMessage.value = currentLang.value === 'en' 
        ? 'Message sent successfully! I will reply soon.'
        : '¡Mensaje enviado correctamente! Te responderé pronto.'
      
      // Resetear formulario
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      submitAttempted.value = false
    }
  } catch (error) {
    console.error('Error al enviar:', error)
    submitStatus.value = 'error'
    
    if (error.message.includes('campos obligatorios')) {
      submitMessage.value = error.message
    } else if (error.text) {
      submitMessage.value = `Error al enviar: ${error.text}`
    } else {
      submitMessage.value = currentLang.value === 'en'
        ? 'Error sending message. Please try again or contact directly by email.'
        : 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contacta directamente por email.'
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
  padding: 4rem 0;
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



.contact-subtitle {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.contact-info {
  height: 100%;
  background: var(--background-primary);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);

}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-method {
  display: flex;
  align-items: center;
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
}



.location-method .location-header {
  display: flex;
  flex-direction: column;
}

.location-method:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--persian-green);
}

/* Formulario */
.contact-form-container {
  background: var(--background-primary);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  height: 100%;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: var(--text-primary);
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

/* Accesibilidad */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.required-asterisk {
  color: #ef4444;
  font-weight: bold;
  margin-left: 2px;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.error-message::before {
  content: "⚠";
  font-size: 1rem;
}

.character-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-align: right;
  margin-top: 0.25rem;
}

/* Focus visible mejorado */
.form-input:focus-visible,
.form-textarea:focus-visible,
.btn:focus-visible {
  outline: 3px solid var(--persian-green);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(42, 157, 143, 0.2);
}

/* Estados de error */
.form-input[aria-invalid="true"],
.form-textarea[aria-invalid="true"] {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
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




</style>
