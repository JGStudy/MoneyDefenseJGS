// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 실제 페이지들
import SettingsPage from '@/pages/SettingsPage.vue'
import UserEditPage from '@/pages/UserEditPage.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: SettingsPage,
    },
    {
      path: '/user-edit',
      name: 'user-edit',
      component: UserEditPage,
    },
  ],
})
