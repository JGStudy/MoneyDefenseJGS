import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const darkMode = ref(false)
    const themeColor = ref('#2C44C2')

    function toggleDarkMode() {
      darkMode.value = !darkMode.value
    }

    function setThemeColor(color) {
      themeColor.value = color
    }

    return { darkMode, themeColor, toggleDarkMode, setThemeColor }
  },
  { persist: true },
)
