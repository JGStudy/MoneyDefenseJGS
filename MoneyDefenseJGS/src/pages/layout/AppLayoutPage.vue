<template>
  <Header :title="title" />
  <div class="pt-[98px] pb-[80px] relative">
    <slot />
    <!-- <router-view /> -->
  </div>
  <BottomBar v-if="isTabMenu" />
</template>
<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Header from '@/components/common/RealHeader.vue'
import BottomBar from '@/components/common/BottomNavBar.vue'

// props 추가
const props = defineProps({
  title: String,
})

const route = useRoute()
const tabMenuRoutes = ['/', '/transaction', '/transaction/calendar', '/asset', '/report']
const isTabMenu = computed(() => tabMenuRoutes.includes(route.path))
</script>
