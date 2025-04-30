<script setup>
import { ref, onMounted, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { totalMoney } from '/src/api/report.js'

// Chart.js 등록
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// 서버에서 데이터를 받아올 상태
const savings = ref([])
const expense = ref([])

onMounted(async () => {
  try {
    const res = await totalMoney()
    console.log('서버에서 받은 데이터:', res)

    if (res && res.data) {
      // '수입' 항목 필터링
      savings.value = res.data.filter((item) => item.type === '수입')
      // '지출' 항목 필터링
      expense.value = res.data.filter((item) => item.type === '지출')

      console.log('수입 데이터:', savings.value)
      console.log('지출 데이터:', expense.value)
      console.log('데이터 받아옴:', res)
    }
  } catch (err) {
    console.error('데이터 요청 실패:', err)
  }
})

// 탭 상태
const selectedTab = ref('수입')

const months = computed(() => {
  const source = selectedTab.value === '수입' ? savings.value : expense.value
  const uniqueMonths = [...new Set(source.map((item) => item.month))]
  return uniqueMonths.sort()
})

// 차트 데이터 계산
const chartData = computed(() => {
  const source = selectedTab.value === '수입' ? savings.value : expense.value
  console.log('차트 데이터  출처:', source)

  const data = months.value.map((month) => {
    const found = source.find((entry) => entry.month === month)
    const amount = found?.amount || found?.money || 0
    return typeof amount === 'string' ? parseInt(amount) : amount
  })

  return {
    labels: months.value,
    datasets: [
      {
        label: selectedTab.value,
        data,
        backgroundColor:
          selectedTab.value === '수입' ? 'rgba(54, 162, 235, 0.7)' : 'rgba(255, 99, 132, 0.7)',
      },
    ],
  }
})

// chartoptions
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}
</script>

<template>
  <div class="MonthlyChart space-y-2 font-sans">
    <div class="rounded-2xl shadow-inner p-5 mt-5">
      <p class="text-body01 font-bold mb-5">수입 지출 변화</p>
      <div class="h-64">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
      <div class="flex justify-center space-x-2 mt-5">
        <button
          :class="
            selectedTab === '수입' ? 'bg-status-positive text-white' : 'bg-kb-ui-08 text-kb-ui-06'
          "
          class="px-4 py-2 rounded-full font-bold font-body03"
          @click="selectedTab = '수입'"
        >
          수입
        </button>
        <button
          :class="
            selectedTab === '지출'
              ? 'bg-status-error-input text-white'
              : 'bg-kb-ui-08 text-kb-ui-06'
          "
          class="px-4 py-2 rounded-full font-bold font-body03"
          @click="selectedTab = '지출'"
        >
          지출
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.MonthlyChart {
  font-weight: bold;
}
</style>
