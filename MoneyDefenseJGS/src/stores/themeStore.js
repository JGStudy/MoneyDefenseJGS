// src/stores/themeStore.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  }),
  getters: {
    isDark: (state) => state.theme === 'dark',
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', this.theme)
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(this.theme)
    },
    initTheme() {
      const saved = localStorage.getItem('theme')
      this.theme = saved === 'dark' ? 'dark' : 'light'
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(this.theme)
    },
  },
})
