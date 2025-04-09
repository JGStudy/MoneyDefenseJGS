<template>
  <Header />
  <div class="pt-[98px] pb-[80px] relative">
    <router-view />
  </div>
  <BottomBar v-if="isTabMenu" />
</template>
<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Header from '@/components/common/RealHeader.vue'
import BottomBar from '@/components/common/BottomNavBar.vue'

const route = useRoute()
const tabMenuRoutes = ['/', '/transaction', '/transaction/calendar', '/asset', '/report']
const isTabMenu = computed(() => tabMenuRoutes.includes(route.path))
</script>
