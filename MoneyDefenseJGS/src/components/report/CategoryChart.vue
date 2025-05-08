<script setup>
import { ref, onMounted, computed } from 'vue'
import { categories } from '/src/api/reportApi.js'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, PieController } from 'chart.js'
import BaseBox from '@/components/common/BaseBox.vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController)

const isExpanded = ref(false)
const category = ref([])

// 데이터 불러오기
onMounted(async () => {
  try {
    const res = await categories()
    category.value = res.data
  } catch (error) {
    console.error('카테고리 데이터 로드 실패:', error)
  }
})

// 카테고리 제한
const displayedCategories = computed(() => {
  return isExpanded.value ? category.value : category.value.slice(0, 3)
})

// 차트 데이터 계산 (computed로 반응형)
const chartData = computed(() => ({
  labels: category.value.map((item) => item.category),
  datasets: [
    {
      label: '카테고리별 지출',
      data: category.value.map((item) => item.amount),
      backgroundColor: ['#C4B5FD', '#F9A8D4', '#FCD34D', '#6EE7B7', '#F87171', '#60A5FA'],
    },
  ],
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
        },
      },
    },
  },
}
</script>

<template>
  <BaseBox customClass="font-sans">
    <!-- 제목 -->
    <p class="text-body01 font-bold mb-5">카테고리별 지출</p>

    <!-- 원 그래프 -->
    <div style="width: 100%; height: 300px">
      <Pie :data="chartData" :options="chartOptions" />
    </div>

    <!-- 목록 -->
    <div
      v-for="(item, index) in displayedCategories"
      :key="index"
      class="flex justify-between items-center"
    >
      <div class="flex items-center space-x-2">
        <div
          class="w-3 h-3 rounded-full"
          :style="{
            backgroundColor:
              chartData.datasets[0].backgroundColor[
                index % chartData.datasets[0].backgroundColor.length
              ],
          }"
        ></div>
        <span class="mt-2 text-body02">{{ item.category }}</span>
      </div>
      <span class="font-nums font-semibold">{{ item.amount.toLocaleString() }}원</span>
    </div>

    <!-- 더보기 버튼 -->
    <button
      v-if="category.length > 3"
      @click="isExpanded = !isExpanded"
      class="text-body02 text-kb-ui-02"
    >
      {{ isExpanded ? '접기 ▲' : '더보기 ▼' }}
    </button>
  </BaseBox>
</template>
