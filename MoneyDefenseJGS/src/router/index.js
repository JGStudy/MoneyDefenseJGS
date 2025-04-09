// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import SettingsPage from '@/pages/SettingsPage.vue'

import HomePage from '@/pages/start/HomePage.vue'
import ReportPage from '@/pages/ReportPage.vue'
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
      path: '/settings',
      name: 'settings',
      component: SettingsPage,
    },
    { path: '/user-edit', name: 'user-edit', component: UserEditPage },
    {
      path: '/report',
      name: 'report',
      component: ReportPage,
    },
    {
      path: '/transaction/create',
      name: 'TransactionCreate',
      component: TransactionCreatePage,
    },
    {
      path: '/transaction/create',
      name: 'TransactionCreate',
      component: TransactionCreatePage,
    },
  ],
})
export default router
