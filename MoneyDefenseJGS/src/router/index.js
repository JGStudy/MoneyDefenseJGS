import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomPage.vue'
import TransactionCreatePage from '@/pages/TransactionCreatePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/transaction/create',
      name: 'TransactionCreate',
      component: TransactionCreatePage,
    },
  ],
})
export default router
