import { createApp } from 'vue'
import App from './App.vue'
import VueCountdown from '@chenfengyuan/vue-countdown';
import store from './store'

import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })



const app = createApp(App)
app.component(VueCountdown.name, VueCountdown)
app.use(store)
app.use(vuetify).mount('#app')
