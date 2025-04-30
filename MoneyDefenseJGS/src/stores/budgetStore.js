// stores/budgetStore.js
import { defineStore } from 'pinia'
import { fetchBudgetByMonth, updateBudget } from '@/api/budgetApi'
import { useAssetStore } from '@/stores/assetStore' // 자산 스토어 가져오기

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budgetMap: {}, // 예산 저장
  }),
  actions: {
    // 예산 특정 월에 맞게 가져오기
    async fetchBudgetByMonth(month) {
      try {
        const data = await fetchBudgetByMonth(month)

        if (data.length > 0) {
          // createdAt 기준 최신값으로 정렬
          const latest = data
            .filter((item) => item.createdAt)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]

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
