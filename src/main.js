import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Importar solo los estilos necesarios de PrimeVue
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Importar Bootstrap CSS (optimizado)
import 'bootstrap/dist/css/bootstrap.min.css'
// Importar Bootstrap Icons (optimizado con font-display: swap en style.css)
import 'bootstrap-icons/font/bootstrap-icons.css'

// Importar Bootstrap JS de manera más eficiente
// Solo importar cuando sea necesario para interacciones
const loadBootstrapJS = () => {
  import('bootstrap/dist/js/bootstrap.bundle.min.js')
}

// Lazy load Bootstrap JS after app initialization
setTimeout(loadBootstrapJS, 100)

createApp(App).mount('#app')
