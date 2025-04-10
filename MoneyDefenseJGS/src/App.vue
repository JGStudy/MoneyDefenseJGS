<template>
  <div class="w-full max-w-[375px] mx-auto px-4 relative" :class="{ dark: isDark }">
    <AppLayout />
  </div>
</template>

<script setup>
import AppLayout from '@/pages/layout/AppLayoutPage.vue'
import { useThemeStore } from '@/stores/themeStore'
import { storeToRefs } from 'pinia'
import { watchEffect, onMounted } from 'vue' // 상태 가져오기
const themeStore = useThemeStore()
const { darkMode } = storeToRefs(themeStore)

// body에도 dark 클래스 반영
onMounted(() => {
  document.body.classList.toggle('dark', darkMode.value)
})

watchEffect(() => {
  document.body.classList.toggle('dark', darkMode.value)
})

const isDark = darkMode
</script>
