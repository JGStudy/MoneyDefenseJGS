import { defineStore } from 'pinia'
import { fetchBudgetByMonth, updateBudget } from '@/api/budgetApi'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    userId: null,
    budget: {}, // 초기값은 빈 객체
  }),
  actions: {
    setUserId(id) {
      this.userId = id
    },

    loadBudgetFromStorage() {
      const stored = localStorage.getItem('budget')
      if (stored) {
        try {
          this.budget = JSON.parse(stored)
        } catch (error) {
          console.error('예산 데이터를 로드하는 데 실패했습니다:', error)
          this.budget = {}
        }
      } else {
        this.budget = {}
      }
    },

    saveBudgetToStorage() {
      localStorage.setItem('budget', JSON.stringify(this.budget))
    },

    async fetchBudgetByMonth(month, userId) {
      try {
        console.log('API 호출 파라미터 userId:', userId)
        console.log('API 호출 파라미터 month:', month)

        const budgetItem = await fetchBudgetByMonth(userId, month)
        console.log('받은 예산 데이터:', budgetItem)

        if (budgetItem) {
          this.budget[month] = budgetItem.amount
        } else {
          console.warn('예산 데이터 없음, 0으로 설정')
          this.budget[month] = 0
        }
      } catch (error) {
        console.error('예산 불러오기 실패:', error)
        this.budget[month] = 0
      }
    },

    async updateBudget(month, newAmount) {
      try {
        if (!this.userId) {
          console.error('User ID가 설정되지 않았습니다.')
          return
        }

        await updateBudget(this.userId, month, newAmount)
        this.budget[month] = newAmount
        this.saveBudgetToStorage()
      } catch (error) {
        console.error('예산 수정 실패:', error)
      }
    },
  },
})
