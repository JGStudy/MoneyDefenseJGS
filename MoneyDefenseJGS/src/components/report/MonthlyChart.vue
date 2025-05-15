<script setup>
import { ref, onMounted, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { categories } from '/src/api/reportApi.js'
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const savings = ref([])
const expense = ref([])
const months = ref([])
const monthlyIncome = ref([])
const monthlyExpense = ref([])

const showIncome = ref(true)
const showExpense = ref(false)

onMounted(async () => {
  try {
    const res = await categories()
    const transactions = res.data

    const userId = localStorage.getItem('userId')
    if (!userId) {
      console.error('userId가 없습니다. 로그인 상태를 확인하세요.')
      return
    }

    // ✅ 해당 유저 데이터만 필터링
    const userTransactions = transactions.filter(item => String(item.userid) === userId)

    // ✅ 필터링 후 수입/지출 분리
    savings.value = userTransactions.filter(item => item.type === '수입')
    expense.value = userTransactions.filter(item => item.type === '지출')

    const incomeByMonth = calculateMonthlyTotal(savings.value)
    const expenseByMonth = calculateMonthlyTotal(expense.value)

    months.value = Array.from(new Set([
      ...incomeByMonth.map(item => item.month),
      ...expenseByMonth.map(item => item.month)
    ]))

    monthlyIncome.value = months.value.map(month => {
      const income = incomeByMonth.find(item => item.month === month)
      return income ? income.total : 0
    })

    monthlyExpense.value = months.value.map(month => {
      const exp = expenseByMonth.find(item => item.month === month)
      return exp ? exp.total : 0
    })

  } catch (err) {
    console.error('카테고리 데이터 로드 실패:', err)
  }
})

function calculateMonthlyTotal(data) {
  return data.reduce((acc, item) => {
    const month = item.date.substring(0, 7)
    const existing = acc.find(i => i.month === month)
    if (existing) {
      existing.total += item.amount
    } else {
      acc.push({ month, total: item.amount })
    }
    return acc
  }, [])
}

const chartData = computed(() => {
  const datasets = []

  if (showIncome.value) {
    datasets.push({
      label: '월별 총 수입',
      data: monthlyIncome.value,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    })
  }

  if (showExpense.value) {
    datasets.push({
      label: '월별 총 지출',
      data: monthlyExpense.value,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    })
  }

  return {
    labels: months.value,
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
    x: { stacked: true },
    y: { stacked: true, beginAtZero: true }
  }
}

function toggleIncome() {
  showIncome.value = true
  showExpense.value = false
}

function toggleExpense() {
  showIncome.value = false
  showExpense.value = true
}
</script>

<template>
  <BaseBox>
    <div style="width: 90%; height: 200px; margin: 0 auto;">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 20px;">
      <button 
        @click="toggleIncome" 
        style="background-color: #1E90FF; color: white; padding: 10px 20px; border: none; border-radius: 5px;">
        수입
      </button>
      <button 
        @click="toggleExpense" 
        style="background-color: #FF69B4; color: white; padding: 10px 20px; border: none; border-radius: 5px;">
        지출
      </button>
    </div>
  </BaseBox>
</template>
