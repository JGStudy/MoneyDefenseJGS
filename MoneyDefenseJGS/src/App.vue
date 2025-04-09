<template>
  <div class="w-full max-w-[375px] mx-auto px-4 relative">
    <AppLayout />
    <router-view />
  </div>
</template>
<script setup>
import AppLayout from '@/pages/layout/AppLayoutPage.vue'
</script>
