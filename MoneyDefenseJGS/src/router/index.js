import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ReportPage from '@/pages/ReportPage.vue'
import Calendar from '@/pages/Calendar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/report',
      name: 'report',
      component: ReportPage,
    },
    {
      path: '/transaction/calendar',
      name: 'calendar',
      component: Calendar,
    },
  ],
})

export default router
