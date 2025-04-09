import { defineStore } from 'pinia'
import { fetchMonthlyBudget, updateMonthlyBudget } from '@/api/budget'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budget: 0,
    month: 'April', // 기본값, 혹은 동적으로
  }),
  actions: {
    async fetchBudget() {
      const res = await fetchMonthlyBudget(this.month)
      this.budget = res?.data?.budget ?? 0
    },
    async updateBudget(newAmount) {
      await updateMonthlyBudget(this.month, newAmount)
      this.budget = newAmount
    },
  },
})
