// Configuración de EmailJS
// Reemplaza estos valores con tus credenciales de EmailJS

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_1ilul2p',     // ID del servicio de email (Gmail, Outlook, etc.)
  TEMPLATE_ID: 'template_r7nld1j',   // ID del template que creaste
  PUBLIC_KEY: 'yOtw5nncngbnj5T-r'      // Public Key de tu cuenta EmailJS
}

// Instrucciones para configurar EmailJS:
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta o inicia sesión
// 3. Crea un nuevo servicio de email (Gmail, Outlook, etc.)
// 4. Crea un nuevo template con estas variables:
//    - {{from_name}} - Nombre del remitente
//    - {{from_email}} - Email del remitente
//    - {{subject}} - Asunto del mensaje
//    - {{message}} - Contenido del mensaje
//    - {{to_name}} - Tu nombre (Antonio Pulido)
//    - {{reply_to}} - Email para responder
// 5. Copia las credenciales y reemplaza los valores arriba
