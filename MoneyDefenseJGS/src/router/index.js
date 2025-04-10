import { createRouter, createWebHistory } from 'vue-router'

import OnboardingPage from '@/pages/start/OnboardingPage.vue'
import HomePage from '@/pages/start/HomePage.vue'
import ReportPage from '@/pages/report/ReportPage.vue'
import SettingsPage from '@/pages/setting/SettingsPage.vue'
import UserEditPage from '@/pages/setting/UserEditPage.vue'
import TransactionCreatePage from '@/pages/TransactionCreatePage.vue'
import TransactionPage from '@/pages/TransactionPage.vue'
import TransactionDetailPage from '@/pages/TransactionDetailPage.vue'

// 상은 파트 - 자산
import AssetTotalPage from '@/pages/AssetTotalPage.vue'
import AssetEditPage from '@/pages/AssetEditPage.vue'
import BudgetTotalPage from '@/pages/BudgetTotalPage.vue'
import BudgetEditPage from '@/pages/BudgetEditPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/onboarding', name: 'onboarding', component: OnboardingPage },
    { path: '/', name: 'home', component: HomePage },
    { path: '/report', name: 'report', component: ReportPage },
    { path: '/setting', name: 'setting', component: SettingsPage },
    { path: '/setting/user-edit', name: 'user-edit', component: UserEditPage },

    {
      path: '/transaction/create',
      name: 'TransactionCreate',
      component: TransactionCreatePage,
    },
    {
      path: '/transactiondetail',
      name: 'TransactionDetail',
      component: TransactionDetailPage,
    },

    {
      // 가계부 탭
      path: '/transaction',
      name: 'transaction',
      component: TransactionPage,
    },
    {
      // 자산 탭
      path: '/asset',
      name: 'AssetTotal',
      component: AssetTotalPage,
    },
    {
      // 자산 수정 탭
      path: '/asset/edit',
      name: 'AssetEdit',
      component: AssetEditPage,
    },

    {
      // 예산 탭
      path: '/budget',
      name: 'BudgetTotal',
      component: BudgetTotalPage,
    },
    {
      // 예산 수정 탭
      path: '/budget/edit',
      name: 'BudgetEdit',
      component: BudgetEditPage,
    },
  ],
})
export default router
