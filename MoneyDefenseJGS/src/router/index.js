import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomPage.vue'
import ReportPage from '@/pages/ReportPage.vue'

// 상은 파트 - 자산
import AssetTotalPage from '@/pages/AssetTotalPage.vue'
import AssetEditPage from '@/pages/AssetEditPage.vue'
import BudgetTotalPage from '@/pages/BudgetTotalPage.vue'
import BudgetEditPage from '@/pages/BudgetEditPage.vue'

// 상은 파트 - 자산
const routes = [
  // 자산 관련 라우트
  {
    path: '/asset',
    name: 'AssetTotal',
    component: AssetTotalPage,
  },
  {
    path: '/asset/edit',
    name: 'AssetEdit',
    component: AssetEditPage,
  },

  // 예산 관련 라우트
  {
    path: '/budget',
    name: 'BudgetTotal',
    component: BudgetTotalPage,
  },
  {
    path: '/budget/edit',
    name: 'BudgetEdit',
    component: BudgetEditPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path:'/report',
      name:'report',
      component: ReportPage,
    },
  ],
})

export default router
