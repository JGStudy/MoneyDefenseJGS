<template>
  <section class="mt-12">
    <h2 class="text-title03 font-semibold mb-6 text-kb-ui-02 dark:text-kb-dark-text">테마 설정</h2>
    <ul class="space-y-3">
      <li
        class="flex justify-between items-center px-4 py-3 rounded-2xl shadow-list bg-kb-ui-11 dark:bg-kb-dark-card text-kb-ui-02 dark:text-kb-dark-text font-medium cursor-pointer hover:bg-kb-ui-10 dark:hover:bg-kb-dark-line transition-colors"
        @click="themeStore.toggleTheme"
      >
        <span class="text-body02 font-medium">테마</span>
        <span class="text-xl">{{ themeStore.theme === 'dark' ? '🌞' : '🌙' }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { useThemeStore } from '@/stores/themeStore'
const themeStore = useThemeStore()
</script>
