import { createRouter, createWebHistory } from 'vue-router'

// onboarding
import OnboardingPage from '@/pages/onboarding/OnboardingPage.vue'

// signup
import SignupPage from '@/pages/signup/SignupPage.vue'

// home
import HomePage from '@/pages/home/HomePage.vue'

// transaction
import TransactionPage from '@/pages/transaction/TransactionPage.vue'
import TransactionCreatePage from '@/pages/transaction/input/TransactionCreatePage.vue'

// asset
import AssetBudgetTotalPage from '@/pages/asset/AssetBudgetTotalPage.vue'
import AssetEditPage from '@/pages/asset/asset/AssetEditPage.vue'
import BudgetEditPage from '@/pages/asset/budget/BudgetEditPage.vue'

// report
import ReportPage from '@/pages/report/ReportPage.vue'

// setting
import SettingsPage from '@/pages/setting/SettingsPage.vue'
import UserEditPage from '@/pages/setting/UserEditPage.vue'

// common
import NotFound from '@/pages/common/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // onboarding
    { path: '/onboarding', name: 'onboarding', component: OnboardingPage },

    // signup
    { path: '/signup', name: 'signup', component: SignupPage },

    //home
    { path: '/', name: 'home', component: HomePage },

    // transaction
    { path: '/transaction', name: 'transaction', component: TransactionPage },
    {
      path: '/transaction/create/:id?',
      name: 'transaction-page',
      component: TransactionCreatePage,
    },

    // asset
    { path: '/asset', name: 'AssetTotal', component: AssetBudgetTotalPage },
    { path: '/asset/edit', name: 'AssetEdit', component: AssetEditPage },
    { path: '/budget/edit', name: 'BudgetEdit', component: BudgetEditPage },

    // report
    { path: '/report', name: 'report', component: ReportPage },

    // setting
    { path: '/setting', name: 'setting', component: SettingsPage },
    { path: '/setting/user-edit', name: 'user-edit', component: UserEditPage },

    // common
    { path: '/:paths(.*)*', name: 'NotFound', component: NotFound },
  ],
})
export default router
