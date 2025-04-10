<template>
  <div class="w-full max-w-[375px] mx-auto px-4 relative">
    <!-- <AppLayout /> -->
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// import { useThemeStore } from '@/stores/themeStore'
import { storeToRefs } from 'pinia'

// const themeStore = useThemeStore()
// const { isDark } = storeToRefs(themeStore)

// onMounted(() => {
//   themeStore.initTheme()
</script>
<!-- 테마 토글 다 삭제 -->
<!-- <style>
body {
  font-family: 'Pretendard', sans-serif;
  background-color: #f7f7f8; /* kb-ui-10 */
  color: #26282c; /* kb-ui-02 */
}

html.dark body {
  background-color: #1c1f24; /* kb-dark-bg */
  color: #f2f4f8; /* kb-dark-text */
}
</style> -->
