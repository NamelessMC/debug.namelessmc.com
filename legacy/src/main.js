import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/style.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import i18n from './i18n'
import utils from './utils'

createApp(App)
    .use(i18n)
    .mixin({
        methods: {
            ...utils
        },
    })
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
