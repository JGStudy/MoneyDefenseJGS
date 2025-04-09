import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/start/HomePage.vue'
import ReportPage from '@/pages/ReportPage.vue'

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
  ],
})

export default router
