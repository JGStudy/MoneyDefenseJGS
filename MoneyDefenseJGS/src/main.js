import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'
import App from './App.vue'
import router from './router'
import '@/assets/reset.css'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VCalendar, {})

app.mount('#app')
