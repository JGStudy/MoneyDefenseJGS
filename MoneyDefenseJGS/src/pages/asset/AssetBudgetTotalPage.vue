<template>
  <AppLayoutPage title="자산" close="취소">
    <div class="space-y-6">
      <!-- 자산/예산 탭 전환 -->
      <TabSwitch v-model:activeTab="currentTab" />

      <!-- 자산 탭 내용 -->
      <div v-if="currentTab === 'asset'">
        <!-- 자산 정보 표시 -->
        <AssetDisplay
          :total-asset="calculatedTotalAsset"
          :last-modified="assetStore.lastModified"
        />

        <!-- 자산 추이 차트 -->
        <AssetTrendChart :trend-data="assetStore.assetTrend" />
      </div>

      <!-- 예산 탭 내용 -->
      <div v-if="currentTab === 'budget'">
        <!-- 월 선택 -->
        <MonthSelector v-model="selectedMonth" class="mb-2" />

        <!-- 예산 정보 표시 -->
        <BudgetDisplay :budget="budget" :expense="monthlyExpense" />
      </div>
    </div>
  </AppLayoutPage>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import AppLayoutPage from '@/pages/layout/AppLayoutPage.vue'

// 스토어
import { useAssetStore } from '@/stores/assetStore'
import { useBudgetStore } from '@/stores/budgetStore'

// 컴포넌트
import TabSwitch from '@/components/common/TabSwitch.vue'
import AssetDisplay from '@/components/asset/asset/AssetDisplay.vue'
import BudgetDisplay from '@/components/asset/budget/BudgetDisplay.vue'
import MonthSelector from '@/components/common/MonthSelector.vue'
import AssetTrendChart from '@/components/asset/asset/AssetTrendChart.vue'

// Pinia 인스턴스
const assetStore = useAssetStore()
const budgetStore = useBudgetStore()

// 사용자 ID (localStorage에서 가져오기)
const userId = localStorage.getItem('userId') || 'defaultUser'

// 현재 탭
const currentTab = ref('asset')

// 자산 계산
const totalIncome = computed(() =>
  assetStore.transactions
    .filter(
      (t) =>
        t.type === '수입' &&
        new Date(t.date).getTime() > new Date(assetStore.lastModified || '2000-01-01').getTime(),
    )
    .reduce((sum, t) => sum + t.amount, 0),
)

const totalExpense = computed(() =>
  assetStore.transactions
    .filter(
      (t) =>
        t.type === '지출' &&
        new Date(t.date).getTime() > new Date(assetStore.lastModified || '2000-01-01').getTime(),
    )
    .reduce((sum, t) => sum + t.amount, 0),
)

const calculatedTotalAsset = computed(() => {
  const base = assetStore.totalAsset || 0
  const lastModified = new Date(assetStore.lastModified || '2000-01-01').getTime()

  const netChange = assetStore.transactions
    .filter((t) => new Date(t.date).getTime() > lastModified)
    .reduce((sum, t) => sum + (t.type === '수입' ? t.amount : -t.amount), 0)

  return base + netChange
})

// 예산 관련
const selectedMonth = ref(new Date().toISOString().slice(0, 7))

// 월별 예산
const budget = computed(() => budgetStore.budget[selectedMonth.value] ?? 0)

// 월별 지출
const monthlyExpense = computed(() => {
  if (!assetStore.transactions || assetStore.transactions.length === 0) return 0

  return assetStore.transactions
    .filter((t) => t.type === '지출' && t.date.startsWith(selectedMonth.value))
    .reduce((sum, t) => sum + t.amount, 0)
})

// 거래내역 JSON 파일에서 불러오기
const fetchTransactions = async () => {
  try {
    const res = await fetch('db/db.json')
    const data = await res.json()
    assetStore.transactions = data.transactions || []
  } catch (err) {
    console.error('거래내역 가져오기 실패:', err)
  }
}

// onMounted 시 초기 설정
onMounted(async () => {
  assetStore.userId = userId
  budgetStore.userId = userId

  assetStore.loadFromStorage()
  await fetchTransactions()

  // assetStore와 budgetStore 모두 데이터를 로드한 후 화면을 갱신하도록 합니다.
  await assetStore.fetchAsset()
  await assetStore.fetchTransactions()

  // 예산을 불러옵니다
  await budgetStore.fetchBudgetByMonth(selectedMonth.value, userId)

  // 데이터를 로드한 후 확인
  console.log('자산:', assetStore.totalAsset)
  console.log('예산:', budget.value)
})
</script>
