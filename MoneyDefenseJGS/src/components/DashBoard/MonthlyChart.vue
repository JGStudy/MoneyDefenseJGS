<script setup>
import {ref} from 'vue'

const selectedTab =ref('수입')
</script>


<template>
  <div class="MonthlyChart space-y-2">
    <!-- 그래프 박스 -->
     <div class="bg-gray-200 rounded-2xl shadow-inner p-4 mt-6">
    <!-- 수입 지출 탭 -->
    <div class="flex justify-center space-x-2">
    <button :class="selectedTab==='수입' ? 'bg-blue-500 text white': 'bg-gray-200 text-black'"
        class="px-4 py-2 rounded-full font-semibold"
        @click="selectedTab = '수입'">수입</button>
    <button
        :class="selectedTab === '지출' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'"
        class="px-4 py-2 rounded-full font-semibold"
        @click="selectedTab = '지출'">지출</button>
    </div>
    <div class="h-40 flex items-center justify-center">
    <p class="text-gray-500">여기에 {{ selectedTab }} 그래프가 들어갈 예정입니다.</p>
    </div>
    </div>
</div>
</template>

<style scoped>
  .MonthlyChart {
    font-weight: bold;
  }
</style>