<template>
  <AppLayout />
  <div :class="{ dark: isDark }">
    <router-view />
  </div>
</template>
<script setup>
import { useThemeStore } from '@/stores/themeStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const themeStore = useThemeStore()
const { darkMode } = storeToRefs(themeStore) // ✅ 이거 하나만 있으면 충분!

watch(
  darkMode,
  (isDark) => {
    document.body.classList.toggle('dark', isDark)
  },
  { immediate: true },
)
</script>
