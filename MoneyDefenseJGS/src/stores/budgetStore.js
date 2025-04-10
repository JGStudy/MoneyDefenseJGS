import { defineStore } from 'pinia'
import { fetchBudgetByMonth, updateBudget } from '@/api/budget'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budgetMap: {},
  }),
  actions: {
    // 예산 특정 월에 맞게 가져오기
    async fetchBudgetByMonth(month) {
      try {
        const data = await fetchBudgetByMonth(month)
        if (data.length > 0) {
          const latest = data[data.length - 1] // 또는 정렬된 최신 값
          this.budgetMap[month] = latest.amount
        } else {
          this.budgetMap[month] = 0
        }
      } catch (error) {
        console.error('예산 데이터를 가져오는 데 실패했습니다:', error)
      }
    },
    // 예산 업데이트
    async updateBudget(month, newAmount) {
      await updateBudget(month, newAmount)
      this.budgetMap[month] = newAmount
    },
  },
})
