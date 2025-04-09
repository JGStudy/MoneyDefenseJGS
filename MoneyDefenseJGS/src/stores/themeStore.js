// src/stores/themeStore.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
    },
  },
  persist: true,
})
