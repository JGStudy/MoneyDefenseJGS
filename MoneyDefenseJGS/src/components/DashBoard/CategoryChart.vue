<script setup>
import {ref} from 'vue'

const isExpanded =ref(false)

const categories = [
    { name: '식비/외식', amount: 172900, percent: 16, color: '#a855f7' },
    { name: '교통/자동차', amount: 166900, percent: 13, color: '#6366f1' },
]
</script>

<template>

    <div class="bg-gray-100 rounded-xl p-4 shadow space-y-3 mt-6">
    <!-- 제목 -->
    <p class="text-lg font-bold">카테고리별 지출</p>

    <!-- 그래프 -->
    <p>그래프 들어갈 자리</p>
    <!-- 계속 보여질 항목 -->
    <div
      v-for="(category, index) in categories.slice(0, 2)"
      :key="category.name"
      class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: category.color }"></div>
        <span>{{ category.name }} ({{ category.percent }}%)</span>
      </div>
      <span class="font-semibold">{{ category.amount.toLocaleString() }}원</span>
    </div>


   <!-- 버튼 -->
   <button
      @click="isExpanded = !isExpanded"
      class="text-sm text-blue-600 underline mt-2"
    >
      {{ isExpanded ? '접기 ▲' : '더보기 ▼' }}
    </button>
  </div>
</template>

<style scoped>
  .CategoryChart {
    font-weight: bold;
  }
</style>