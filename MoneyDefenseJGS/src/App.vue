<template>
  <AppLayout />
  <div :class="{ dark: isDark }">
    <router-view />
  </div>
</template>

<script setup>
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
import AppLayout from '@/pages/layout/AppLayoutPage.vue'
</script>
