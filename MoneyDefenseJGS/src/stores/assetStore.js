import { defineStore } from 'pinia'
import { fetchAsset, updateAssetById, fetchTransactions } from '@/api/assetApi'

export const useAssetStore = defineStore('asset', {
  state: () => ({
    userId: null,
    assetId: null,
    totalAsset: 0,
    lastModified: '',
    transactions: [],
    budget: 0,
    assetTrend: [],
  }),
  actions: {
    setUserId(id) {
      if (id && id !== this.userId) {
        // userId가 변경될 때만 설정
        this.userId = id
        this.fetchAsset() // userId가 설정되었을 때만 fetchAsset 호출
      }
    },

    loadFromStorage() {
      const storedAsset = localStorage.getItem('totalAsset')
      const storedTransactions = localStorage.getItem('transactions')
      const storedLastModified = localStorage.getItem('lastModified')
      const storedBudget = localStorage.getItem('budget')

      if (storedAsset) this.totalAsset = JSON.parse(storedAsset)
      if (storedTransactions) this.transactions = JSON.parse(storedTransactions)
      if (storedLastModified) this.lastModified = storedLastModified
      if (storedBudget) this.budget = JSON.parse(storedBudget)
    },

    saveAssetToStorage() {
      localStorage.setItem('totalAsset', JSON.stringify(this.totalAsset))
      localStorage.setItem('transactions', JSON.stringify(this.transactions))
      localStorage.setItem('lastModified', this.lastModified)
      localStorage.setItem('budget', JSON.stringify(this.budget))
    },

    async fetchAsset() {
      if (!this.userId) {
        console.error('userId가 설정되지 않았습니다.')
        return
      }

      try {
        const res = await fetchAsset(this.userId)

        // 여러 개가 있을 경우 최신 날짜 기준으로 정렬해서 가장 최신 항목 선택
        const sorted = res.data.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
        const data = sorted[0]

        if (data && data.totalAsset !== undefined) {
          this.assetId = data.id ?? null
          this.totalAsset = data.totalAsset ?? 0
          this.lastModified = data.lastModified ?? ''
          console.log('자산 데이터 (최신):', data)
        }
      } catch (error) {
        console.error('자산 조회 실패:', error)
      }
    },

    async updateAsset(newAmount) {
      try {
        const userId = this.userId
        const res = await updateAssetById(userId, newAmount)

        this.totalAsset = res.data.totalAsset
        this.lastModified = res.data.lastModified || new Date().toISOString().split('T')[0]
        this.saveAssetToStorage()
        console.log('자산 업데이트 완료:', this.totalAsset) // 업데이트된 자산 확인
      } catch (error) {
        console.error('자산 저장 실패:', error)
      }
    },

    async fetchTransactions() {
      try {
        const res = await fetchTransactions()
        this.transactions = res.data
        localStorage.setItem('transactions', JSON.stringify(this.transactions))
      } catch (error) {
        console.error('거래내역 불러오기 실패:', error)
      }
    },
  },
})
