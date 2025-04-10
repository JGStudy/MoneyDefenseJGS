import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/reset.css'
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VCalendar, {
  componentPrefix: 'v', // <v-calendar />, <v-date-picker> 이런식 사용 가능
})

app.mount('#app')
