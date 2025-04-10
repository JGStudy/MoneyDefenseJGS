import { defineStore } from 'pinia'
import { fetchAsset, updateAsset, fetchTransactions } from '@/api/asset'

export const useAssetStore = defineStore('asset', {
  state: () => ({
    totalAsset: 0, // 현재 자산 금액
    lastModified: '',
    transactions: [],
  }),
  actions: {
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
      } catch (error) {
        console.error('자산 수정 실패:', error)
      }
    },

    // 거래내역 불러오기
    async fetchTransactions() {
      try {
        const res = await fetchTransactions()
        this.transactions = res.data
      } catch (error) {
        console.error('거래내역 불러오기 실패:', error)
      }
    },
  },
})
