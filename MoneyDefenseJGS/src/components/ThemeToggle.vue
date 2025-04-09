<template>
  <button @click="themeStore.toggleTheme()" class="text-sm underline">
    {{ themeStore.darkMode ? '☀️ Light' : '🌙 Dark' }}
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/themeStore'
const themeStore = useThemeStore()
</script>
