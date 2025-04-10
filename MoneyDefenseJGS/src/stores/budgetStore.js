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
        const res = await fetch('/db/Asset.json')
        const data = await res.json()

        const budgetItem = data?.budgetmap?.find((item) => item.monthly === month)

        if (budgetItem) {
          this.budgetMap[month] = budgetItem.budget
        } else {
          console.warn(`"${month}"에 해당하는 예산 없음`)
          this.budgetMap[month] = 0
        }
      } catch (error) {
        console.error('예산 데이터를 가져오는 데 실패했습니다:', error)
      }
    },
    // 예산 업데이트
    async updateBudget(month, newAmount) {
      await updateBudget(this.month, newAmount)
      this.budget = newAmount
    },
  },
})
