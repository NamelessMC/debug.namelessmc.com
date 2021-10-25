import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/style.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import i18n from './i18n'

createApp(App)
    .use(i18n)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
