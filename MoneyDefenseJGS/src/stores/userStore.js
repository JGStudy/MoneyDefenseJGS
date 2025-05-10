import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const setUser = (data) => {
    user.value = data
  }

  // 저장용 함수는 따로!
  const saveUserIdToStorage = () => {
    if (user.value?.id) {
      localStorage.setItem('userId', user.value.id)
    }
  }

  const initUser = () => {
    const savedId = localStorage.getItem('userId')
    if (savedId) {
      user.value = { id: savedId }
    }
  }

  return { user, setUser, initUser, saveUserIdToStorage }
})
