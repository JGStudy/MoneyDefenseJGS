<template>
  <div class="asset-trend-page">
    <h1>자산 추이</h1>
    <div class="asset-trend-chart">
      <canvas id="assetChart"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Chart } from 'chart.js/auto'

export default {
  name: 'AssetTrendPage',
  setup() {
    const assetData = ref([])

    // 🔸 쿠키에서 userId 추출
    const getUserIdFromCookie = () => {
      const match = document.cookie.match(/(?:^|; )userId=([^;]*)/)
      return match ? decodeURIComponent(match[1]) : null
    }

    const fetchAssetData = async () => {
      const userId = getUserIdFromCookie()
      if (!userId) {
        console.error('유저 ID를 쿠키에서 찾을 수 없습니다.')
        return
      }

      try {
        const response = await axios.get('http://localhost:3000/asset')
        // 🔸 userId 필터링 및 날짜 순 정렬
        assetData.value = response.data
          .filter((item) => item.userId === userId)
          .sort((a, b) => new Date(a.lastModified) - new Date(b.lastModified))

        renderChart()
      } catch (error) {
        console.error('자산 데이터 불러오기 실패:', error)
      }
    }

    const renderChart = () => {
      const ctx = document.getElementById('assetChart').getContext('2d')

      const labels = assetData.value.map((item) => item.lastModified)
      const data = assetData.value.map((item) => item.totalAsset)

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: '총 자산',
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: '날짜',
              },
            },
            y: {
              title: {
                display: true,
                text: '총 자산 (원)',
              },
              beginAtZero: true,
            },
          },
        },
      })
    }

    onMounted(() => {
      fetchAssetData()
    })

    return {
      assetData,
    }
  },
}
</script>

<style scoped>
.asset-trend-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.asset-trend-chart {
  position: relative;
  height: 400px;
  width: 100%;
}
</style>
