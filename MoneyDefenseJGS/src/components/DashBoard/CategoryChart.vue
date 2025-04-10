<script setup>
import { ref, onMounted, computed } from 'vue'
import { categories } from '/src/api/report.js'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController)

const isExpanded = ref(false)
const category = ref([])

// 데이터 불러오기
onMounted(async () => {
  try {
    const res = await categories()
    // 현재 월(예: 2025-04) 데이터만 필터링
    category.value = res.data
  } catch (error) {
    console.error('카테고리 데이터 로드 실패:', error)
  }
})

// 차트 데이터 계산 (computed로 반응형)
const chartData = computed(() => ({
  labels: category.value.map(item => item.category),
  datasets: [
    {
      label: '카테고리별 지출',
      data: category.value.map(item => item.amount),
      backgroundColor: [
        '#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#EF4444', '#3B82F6'
      ]
    }
  ]
}))

// 차트 옵션
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          const amount = context.raw
          return `${context.label}: ${amount.toLocaleString()}원`
        }
      }
    }
  }
}
</script>

<template>
  <div class="bg-gray-100 rounded-xl p-4 shadow space-y-3 mt-6">
    <!-- 제목 -->
    <p class="text-lg font-bold">카테고리별 지출</p>

    <!-- 원 그래프 -->
    <div style="width: 100%; height: 300px;">
      <Pie :data="chartData" :options="chartOptions" />
    </div>

    <!-- 목록 -->
    <div
      v-for="(item, index) in category"
      :key="index"
      class="flex justify-between items-center"
    >
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: chartData.datasets[0].backgroundColor[index % chartData.datasets[0].backgroundColor.length] }"></div>
        <span>{{ item.category }}</span>
      </div>
      <span class="font-semibold">{{ item.amount.toLocaleString() }}원</span>
    </div>

    <!-- 더보기 버튼 -->
    <button @click="isExpanded = !isExpanded" class="text-sm text-blue-600 underline mt-2">
      {{ isExpanded ? '접기 ▲' : '더보기 ▼' }}
    </button>
  </div>
</template>
