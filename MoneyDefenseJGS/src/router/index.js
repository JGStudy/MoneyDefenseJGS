// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import SettingsPage from '@/pages/SettingsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: SettingsPage,
    },
  ],
})

export default router
