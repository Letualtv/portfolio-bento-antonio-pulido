# Portfolio Bento de Antonio Pulido


Portfolio Bento es mi portfolio desarrollado con Vite + Vue 3. Incluye animaciones, diseño responsive, soporte multilenguaje (ES/EN), UI inspirada en bento grid, y una integración sencilla con EmailJS para el formulario de contacto. El diseño y los colores están cuidadosamente adaptados para máxima consonancia visual y experiencia de usuario, incluyendo:

- Botón flotante de GitHub Star con animación y gradiente pastel
- Tarjetas de proyectos con hover animado, botones contextuales y soporte multilenguaje
- Navegación dinámica y controles de tema/idioma


## Características principales

- **Frontend:** Vue 3 + Vite
- **Diseño:** Responsive, estilo "bento" y paleta pastel personalizada (Coolors)
- **Animaciones:** CSS y transiciones Vue, efectos de hover en tarjetas y botones
- **Multilenguaje:** Español/Inglés (cambia todo el contenido, botones y descripciones)
- **Accesibilidad:** Navegación por teclado y skip link
- **Contacto:** Formulario funcional con EmailJS
- **Despliegue:** Optimizado para Vercel


## Estructura del proyecto

- `src/components/sections/` — Secciones principales del portfolio (Hero, About, Experience, Contact)
- `src/components/layout/` — Componentes de layout (footer, navegación dinámica, controles de tema/idioma)
- `src/composables/` — Composables Vue para i18n, tema, etc.
- `src/config/emailjs.js` — Configuración de EmailJS
- `src/App.vue` — Componente principal


## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

**Importante:**
- No subas el archivo `.env` al repositorio. Añade `.env` a tu `.gitignore`.
- En Vercel, configura estas variables en Settings > Environment Variables.


## Scripts principales

- `npm install` — instala las dependencias
- `npm run dev` — inicia el servidor de desarrollo
- `npm run build` — genera la versión de producción


## Despliegue en Vercel

1. Sube el proyecto a GitHub (sin el `.env`).
2. En Vercel, importa el repositorio.
3. Configura las variables de entorno en Settings > Environment Variables.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Despliega y ¡listo!


## Notas

- El diseño y los colores están inspirados en distintas paletas de [Coolors](https://coolors.co/).
- El botón flotante de GitHub Star y las tarjetas de proyectos usan gradientes y animaciones en consonancia con la paleta.
- Todo el contenido es multilenguaje (ES/EN), incluyendo botones, descripciones y mensajes de UI.


## Licencia

Este proyecto es de uso libre para fines personales o educativos, siempre que se mencione la autoría. No está permitido el uso comercial.
