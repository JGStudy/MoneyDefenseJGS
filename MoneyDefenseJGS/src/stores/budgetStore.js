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

        // month가 같은 것 중에서 id 기준으로 최신 항목 찾기
        const filtered = data.filter((b) => b.month === month)
        const latest = filtered.sort((a, b) => b.id - a.id)[0]

        this.budgetMap[month] = latest?.amount ?? 0
      } catch (error) {
        console.error('예산 데이터를 가져오는 데 실패했습니다:', error)
        this.budgetMap[month] = 0
      }
    },
    // 예산 업데이트
    async updateBudget(month, newAmount) {
      await updateBudget(month, newAmount)
      this.budgetMap[month] = newAmount
    },
  },
})
