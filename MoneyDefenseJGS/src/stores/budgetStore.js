import { defineStore } from 'pinia'
import { fetchBudgetByMonth, updateBudget } from '@/api/budgetApi'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    userId: null,
    budget: { amount: 0 }, // { '2025-05': 300000 } 형식
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

    async fetchBudgetByMonth(month) {
      try {
        if (!this.userId) {
          console.error('User ID가 설정되지 않았습니다.')
          return
        }

        console.log('API 호출 파라미터 userId:', this.userId) // userId 확인
        console.log('API 호출 파라미터 month:', month) // month 확인

        const res = await fetchBudgetByMonth(this.userId, month)

        // 응답 데이터 확인
        console.log('API 응답 데이터:', res.data)

        const data = res.data
        if (Array.isArray(data) && data.length > 0) {
          const latest = data
            .filter((item) => item.lastModified)
            .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))[0]
          this.budget[month] = latest.amount
        } else {
          console.log('예산 데이터 없음, 0으로 설정')
          this.budget[month] = 0
        }

        this.saveBudgetToStorage()
      } catch (error) {
        console.error('예산 데이터를 가져오는 데 실패했습니다:', error)
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
