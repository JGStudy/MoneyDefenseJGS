import { defineStore } from 'pinia'
import { fetchAsset, updateAsset } from '@/api/asset'

export const useAssetStore = defineStore('asset', {
  state: () => ({
    totalAsset: 0, // 현재 자산 금액
    lastModified: '', // 마지막 수정일 (YYYY-MM-DD 형식)
  }),

  actions: {
    // 자산 조회 (예: AssetTotalPage 진입 시 사용)
    async fetchAsset() {
      try {
        const res = await fetchAsset()
        const data = res.data[0] // JSON Server의 첫 번째 데이터
        this.totalAsset = data?.totalAsset ?? 0
        this.lastModified = data?.lastModified ?? ''
      } catch (error) {
        console.error('자산 조회 실패:', error)
      }
    },

    // 자산 수정 (예: 수정 페이지에서 PATCH 호출 후 반영)
    async updateAsset(newAmount) {
      try {
        const res = await updateAsset(newAmount)
        this.totalAsset = res.data.totalAsset
        this.lastModified = res.data.lastModified
      } catch (error) {
        console.error('자산 수정 실패:', error)
      }
    },
  },
})
