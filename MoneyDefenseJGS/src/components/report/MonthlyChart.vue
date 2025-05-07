<script setup>
import { ref, onMounted, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

import BaseBox from '../common/BaseBox.vue'

// Chart.js 등록
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// 데이터 상태 변수
const savings = ref([])  // 수입 데이터
const expense = ref([])  // 지출 데이터
const months = ref([])   // 월별 데이터
const monthlyIncome = ref([])  // 월별 수입 합계
const monthlyExpense = ref([])  // 월별 지출 합계

// 그래프 상태 변수
const showIncome = ref(true)  // 수입 그래프 표시 여부 (초기값: false)
const showExpense = ref(false)  // 지출 그래프 표시 여부 (초기값: false)

// 데이터 불러오기
onMounted(async () => {
  try {
    const response = await fetch('/db/db.json')
    const data = await response.json()

    if (data && Array.isArray(data.Transaction)) {
      savings.value = data.Transaction.filter(item => item.type === '수입')
      expense.value = data.Transaction.filter(item => item.type === '지출')
      
      // 월별 수입, 지출 계산
      const incomeByMonth = calculateMonthlyTotal(savings.value)
      const expenseByMonth = calculateMonthlyTotal(expense.value)

      months.value = Array.from(new Set([...incomeByMonth.map(item => item.month), ...expenseByMonth.map(item => item.month)]))

      monthlyIncome.value = months.value.map(month => {
        const income = incomeByMonth.find(item => item.month === month)
        return income ? income.total : 0
      })

      monthlyExpense.value = months.value.map(month => {
        const exp = expenseByMonth.find(item => item.month === month)
        return exp ? exp.total : 0
      })
    } else {
      console.error('Transaction 데이터가 없습니다.')
    }
  } catch (err) {
    console.error('데이터 요청 실패:', err)
  }
})

// 월별 총액 계산 함수
function calculateMonthlyTotal(data) {
  return data.reduce((acc, item) => {
    const month = item.date.substring(0, 7)  // 월 계산 (예: '2025-02')
    const existing = acc.find(i => i.month === month)
    if (existing) {
      existing.total += item.amount
    } else {
      acc.push({ month, total: item.amount })
    }
    return acc
  }, [])
}

// Chart.js 데이터 및 옵션 설정
const chartData = computed(() => {
  const datasets = []

  // 수입 데이터가 표시될 경우
  if (showIncome.value) {
    datasets.push({
      label: '월별 총 수입',
      data: monthlyIncome.value,  // 월별 수입
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    })
  }

  // 지출 데이터가 표시될 경우
  if (showExpense.value) {
    datasets.push({
      label: '월별 총 지출',
      data: monthlyExpense.value,  // 월별 지출
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    })
  }

  return {
    labels: months.value,  // 월별 데이터
    datasets: datasets
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '월별 수입과 지출'
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true,
      beginAtZero: true
    }
  }
}

// 버튼 클릭 시 수입, 지출 보이기/숨기기 함수
function toggleIncome() {
  showIncome.value = true  // 수입만 보이도록 설정
  showExpense.value = false // 지출은 숨김
}

function toggleExpense() {
  showIncome.value = false // 수입은 숨김
  showExpense.value = true  // 지출만 보이도록 설정
}
</script>

<template>
  <BaseBox>
      <div style="width: 90%; height: 200px; margin: 0 auto;">
      <Bar :data="chartData" :options="chartOptions"/>
      </div>

       <!-- 버튼을 가로로 배치하고 가운데 정렬 -->
       <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 20px;">
        <!-- 수입 버튼: 핑크 배경 -->
        <button 
          @click="toggleIncome" 
          style="background-color: #1E90FF; color: white; padding: 10px 20px; border: none; border-radius: 5px;">
          수입
        </button>
        <!-- 지출 버튼: 파랑 배경 -->
        <button 
          @click="toggleExpense" 
          style="background-color: #FF69B4 ; color: white; padding: 10px 20px; border: none; border-radius: 5px;">
          지출
        </button>
      </div>
  </BaseBox>
</template>
