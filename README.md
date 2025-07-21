# Portfolio Bento

Portfolio Bento es un portfolio personal moderno desarrollado con Vite + Vue 3. Incluye animaciones, diseño responsive, soporte multilenguaje y una integración sencilla con EmailJS para el formulario de contacto.

## Características principales

- **Frontend:** Vue 3 + Vite
- **Diseño:** Responsive, estilo "bento" y paleta pastel personalizada
- **Animaciones:** CSS y transiciones Vue
- **Multilenguaje:** Español/Inglés (fácil de ampliar)
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

```
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
- `npm run build` — genera la build de producción

## Despliegue en Vercel

1. Sube el proyecto a GitHub (sin el `.env`).
2. En Vercel, importa el repositorio.
3. Configura las variables de entorno en Settings > Environment Variables.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Despliega y ¡listo!

## Notas

- El componente `HelloWorld.vue` ha sido eliminado porque no es necesario para el portfolio.
- Los proyectos destacados están en construcción y se mostrarán próximamente.
- El diseño y los colores están inspirados en la paleta pastel de Coolors.

## Licencia

Uso permitido con atribución. No se permite uso comercial. Consulta el footer para más detalles.
