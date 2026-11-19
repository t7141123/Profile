import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { setupRouterProgress } from './router/progress'
import directives from './directives'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Custom CSS
import './assets/css/main.css'

// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
app.use(router)
app.use(i18n)

// Setup page loading progress bar
setupRouterProgress(router)

// Register custom directives (spotlight, ripple, tilt)
for (const [name, directive] of Object.entries(directives)) {
  app.directive(name, directive)
}

// Mount only after the first route (and its lazy chunk + locale) is ready, so the
// prerendered HTML is replaced in one step instead of flashing empty (CLS)
router.isReady().then(() => app.mount('#app'))

