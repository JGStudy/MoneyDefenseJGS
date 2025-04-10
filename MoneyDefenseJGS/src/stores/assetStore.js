import { defineStore } from 'pinia'
import { fetchAsset, updateAsset, fetchTransactions } from '@/api/asset'

export const useAssetStore = defineStore('asset', {
  state: () => ({
    totalAsset: 0, // 현재 자산 금액
    lastModified: '',
    transactions: [],
  }),
  actions: {
    // 로컬 스토리지에서 자산과 예산 정보 불러오기
    loadFromStorage() {
      const storedAsset = localStorage.getItem('totalAsset')
      const storedTransactions = localStorage.getItem('transactions')
      const storedLastModified = localStorage.getItem('lastModified')
      const storedBudget = localStorage.getItem('budget')

      if (storedAsset) {
        this.totalAsset = JSON.parse(storedAsset)
      }
      if (storedTransactions) {
        this.transactions = JSON.parse(storedTransactions)
      }
      if (storedLastModified) {
        this.lastModified = storedLastModified
      }
      if (storedBudget) {
        this.budget = JSON.parse(storedBudget)
      }
    },

    // 자산 정보 로컬 스토리지에 저장
    saveAssetToStorage() {
      localStorage.setItem('totalAsset', JSON.stringify(this.totalAsset))
      localStorage.setItem('transactions', JSON.stringify(this.transactions))
      localStorage.setItem('lastModified', this.lastModified)
    },

    // 자산 조회
    async fetchAsset() {
      try {
        const res = await fetchAsset()
        const data = res.data[0]
        this.totalAsset = data?.totalAsset ?? 0
        this.lastModified = data?.lastModified ?? ''
      } catch (error) {
        console.error('자산 조회 실패:', error)
      }
    },

    // 자산 수정
    async updateAsset(newAmount) {
      try {
        const res = await updateAsset(newAmount)
        this.totalAsset = res.data.totalAsset
        this.lastModified = res.data.lastModified
        this.saveAssetToStorage() // 자산 업데이트 후 로컬 스토리지에 저장
      } catch (error) {
        console.error('자산 수정 실패:', error)
      }
    },

    // 거래내역 불러오기
    async fetchTransactions() {
      try {
        const res = await fetchTransactions()
        this.transactions = res.data
        localStorage.setItem('transactions', JSON.stringify(this.transactions)) // 거래 내역 로컬 스토리지 저장
      } catch (error) {
        console.error('거래내역 불러오기 실패:', error)
      }
    },
  },
})
