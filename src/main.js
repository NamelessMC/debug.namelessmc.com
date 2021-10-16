import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/tailwind.css'

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
