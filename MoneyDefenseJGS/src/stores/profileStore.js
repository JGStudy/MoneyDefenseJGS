import { defineStore } from 'pinia'
import apiClient from '@/api/apiClient'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    id: '',
    name: '',
  }),
  getters: {
    displayName: (state) => state.name,
  },
  actions: {
    async fetchProfile(id) {
      try {
        const { data } = await apiClient.get(`/Profile/${id}`)
        this.id = data.id
        this.name = data.name
      } catch (err) {
        console.error('프로필 불러오기 실패:', err)
      }
    },
    async updateProfile() {
      try {
        await apiClient.put(`/Profile/${this.id}`, {
          id: this.id,
          name: this.name,
        })
      } catch (err) {
        console.error('프로필 저장 실패:', err)
      }
    },
    setUserData(payload) {
      this.id = payload.id
      this.name = payload.name
    },
  },
})
