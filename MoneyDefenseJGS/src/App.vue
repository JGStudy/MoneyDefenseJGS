<template>
  <div class="w-full max-w-[375px] mx-auto relative" :class="{ dark: isDark }">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

onMounted(() => {
  themeStore.initTheme()
})
</script>
