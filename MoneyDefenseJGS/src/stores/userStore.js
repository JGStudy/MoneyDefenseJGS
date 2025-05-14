import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserById } from '@/api/userApi'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const setUser = (data) => {
    user.value = data
    localStorage.setItem('userId', data.id)
  }

  const loadUser = async () => {
    const id = localStorage.getItem('userId')
    if (!id) return
    try {
      const res = await getUserById(id)
      setUser(res.data)
    } catch (error) {}
  }

  const switchUser = async (id) => {
    try {
      const res = await getUserById(id)
      setUser(res.data)
    } catch (error) {}
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('userId')
  }

  return { user, setUser, loadUser, switchUser, logout }
})
