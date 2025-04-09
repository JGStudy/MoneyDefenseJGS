import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/start/HomePage.vue'
import ReportPage from '@/pages/report/ReportPage.vue'
import SettingsPage from '@/pages/setting/UserEditPage.vue'
import UserEditPage from '@/pages/setting/UserEditPage.vue'
import TransactionCreatePage from '@/pages/TransactionCreatePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/report', name: 'report', component: ReportPage },
    { path: '/setting', name: 'setting', component: SettingsPage },
    { path: '/setting/user-edit', name: 'user-edit', component: UserEditPage },

    {
      path: '/transaction/create',
      name: 'TransactionCreate',
      component: TransactionCreatePage,
    },
  ],
})
export default router
