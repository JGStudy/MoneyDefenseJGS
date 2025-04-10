<template>
  <div class="w-full max-w-3xl mx-auto p-4 h-[400px]">
    <div class="h-64 mt-8">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'

Chart.register(...registerables)

const chartRef = ref(null)
let myChart = null

const fetchAssetTrend = async () => {
  const res = await axios.get('/api/assetTrend?userId=304b')
  return res.data.sort((a, b) => new Date(a.date) - new Date(b.date)) // 날짜순 정렬
}

onMounted(async () => {
  const trendData = await fetchAssetTrend()
  const labels = trendData.map((item) => item.date.slice(0, 7)) // 2025-01
  const data = trendData.map((item) => item.totalAsset)

  if (myChart) myChart.destroy()

  myChart = new Chart(chartRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: '총자산 추이',
          data,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#2563eb',
          pointHoverRadius: 5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#111827',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 8,
          cornerRadius: 6,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: '#4b5563',
            font: {
              size: 12,
            },
          },
          title: {
            display: true,
            text: '금액 (원)',
            color: '#6b7280',
            font: {
              weight: 'bold',
              size: 14,
            },
          },
          grid: {
            color: '#e5e7eb',
          },
        },
        x: {
          ticks: {
            color: '#4b5563',
            font: {
              size: 12,
            },
          },
          title: {
            display: true,
            text: '날짜',
            color: '#6b7280',
            font: {
              weight: 'bold',
              size: 14,
            },
          },
          grid: {
            color: '#f3f4f6',
          },
        },
      },
    },
  })
}) // <- ✅ onMounted 닫는 괄호!
</script>
