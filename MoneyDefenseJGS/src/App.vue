<template>
  <div class="w-full max-w-[375px] mx-auto px-4 relative" :class="{ dark: isDark }">
    <!-- <AppLayout /> -->
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
