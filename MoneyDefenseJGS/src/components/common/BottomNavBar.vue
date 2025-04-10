<template>
  <!-- Bottom Navigation Bar -->
  <nav class="fixed bottom-0 left-0 w-full mx-auto bg-white border-t border-[#D9D9D9] z-50">
    <ul class="flex justify-between items-center px-6 py-[13px] mb-[30px]">
      <li class="w-8 h-8 rounded flex justify-center" :class="isActive('/')">
        <router-link to="/" aria-label="홈" @click="handleClick('/')">
          <i class="xi-home xi-3x"></i>
        </router-link>
      </li>
      <li
        class="w-8 h-8 rounded flex justify-center items-center"
        :class="isActive('/transaction')"
      >
        <router-link to="/transaction" aria-label="가계부" @click="handleClick('/transaction')">
          <i class="xi-receipt xi-3x"></i>
        </router-link>
      </li>
      <li class="w-8 h-8 rounded flex justify-center items-center" :class="isActive('/asset')">
        <router-link to="/asset" aria-label="자산" @click="handleClick('/asset')">
          <i class="xi-wallet xi-3x"></i>
        </router-link>
      </li>
      <li class="w-8 h-8 rounded flex justify-center items-center" :class="isActive('/report')">
        <router-link to="/report" aria-label="분석" @click="handleClick('/report')">
          <i class="xi-chart-bar xi-3x"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path) => {
  return route.path === path ? 'text-kb-yellow-positive' : 'text-kb-ui-04'
}

// 클릭 이벤트
const handleClick = (path) => {
  console.log(`${path} 클릭됨`)
}
</script>
