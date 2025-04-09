<template>
  <header
    class="fixed top-0 left-0 z-50 w-full h-[98px] bg-kb-ui-11 px-6 pt-[50px] flex items-center justify-between"
  >
    <!-- Left Fix -->
    <div class="flex items-center">
      <!-- Logo(메인 이외 hidden) -->
      <h1 v-if="isHome" class="w-6 h-6 bg-[#D9D9D9]">
        <!-- 클릭 시 자산 숨기기 기능 on(구현 예정)) -->
        <i>logo</i>
      </h1>
      <!-- 타이틀(메인에서만 hidden) -->
      <div v-else class="font-bold font-sans text-title02 text-kb-ui-02">타이틀</div>
    </div>
    <!-- Right Fix -->
    <div class="w-6 h-6 flex items-center justify-center">
      <i class="xi-cog xi-2x"></i>
    </div>
  </header>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>
