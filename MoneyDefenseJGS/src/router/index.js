import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/start/HomePage.vue'
import ReportPage from '@/pages/ReportPage.vue'
import TransactionPage from '@/pages/TransactionPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 홈 탭
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
      // 가계부 탭
      path: '/transaction',
      name: 'transaction',
      component: TransactionPage,
    },
  ],
})

export default router
