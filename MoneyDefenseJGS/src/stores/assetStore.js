import { defineStore } from 'pinia'
import { fetchAsset, updateAsset } from '@/api/asset'

export const useAssetStore = defineStore('asset', {
  state: () => ({
    totalAsset: 0,
    lastModified: '',
  }),
  actions: {
    async fetchAsset() {
      const res = await fetchAsset()
      this.totalAsset = res.data[0]?.totalAsset ?? 0
      this.lastModified = res.data[0]?.lastModified ?? ''
    },
    async updateAsset(newAmount) {
      // PATCH 방식으로 첫 번째 자산 수정
      const res = await updateAsset(newAmount)
      this.totalAsset = res.data.totalAsset
      this.lastModified = res.data.lastModified
    },
  },
})
