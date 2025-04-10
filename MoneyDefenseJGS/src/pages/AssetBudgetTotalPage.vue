<template>
  <AppLayoutPage title="자산" close="취소">
    <div class="p-4 space-y-6">
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
        <!-- 월 선택 컴포넌트 -->
        <MonthSelector v-model="selectedMonth" class="mb-2" />

        <!-- 예산 정보 표시 -->
        <BudgetDisplay :budget="budget" :expense="monthlyExpense" />
      </div>
    </div>
  </AppLayoutPage>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
// 레이아웃 가져오기
import AppLayoutPage from '@/pages/layout/AppLayoutPage.vue'

// 자산 상태 가져오기
import { useAssetStore } from '@/stores/assetStore'
import { useBudgetStore } from '@/stores/budgetStore'

// 컴포넌트 임포트
import TabSwitch from '@/components/common/TabSwitch.vue'
import AssetDisplay from '@/components/assetTotal/AssetDisplay.vue'
import BudgetDisplay from '@/components/budgetTotal/BudgetDisplay.vue'
import MonthSelector from '@/components/common/MonthSelector.vue'
import AssetTrendChart from '@/components/assetTotal/AssetTrendChart.vue'

// Pinia 스토어 인스턴스
const assetStore = useAssetStore()
const budgetStore = useBudgetStore()

// 현재 활성화된 탭
const currentTab = ref('asset') // 기본적으로 자산 탭 활성화

// 자산 계산
const totalIncome = computed(() =>
  assetStore.transactions
    .filter((t) => t.type === '수입' && new Date(t.date) > new Date(assetStore.lastModified))
    .reduce((sum, t) => sum + t.amount, 0),
)

const totalExpense = computed(() =>
  assetStore.transactions
    .filter((t) => t.type === '지출' && new Date(t.date) > new Date(assetStore.lastModified))
    .reduce((sum, t) => sum + t.amount, 0),
)

const calculatedTotalAsset = computed(() => {
  const total = assetStore.transactions
    .filter((t) => new Date(t.date) > new Date(assetStore.lastModified))
    .reduce((acc, t) => acc + (t.type === '수입' ? t.amount : -t.amount), assetStore.totalAsset)
  return total
})

// 예산 관련
const selectedMonth = ref(new Date().toISOString().slice(0, 7))
const budget = computed(() => budgetStore.budgetMap[selectedMonth.value] ?? 0)

// 거래 내역을 로컬 파일에서 가져오는 함수 (asset.json에서 가져오기)
const fetchTransactions = async () => {
  try {
    const res = await fetch('db/Asset.json') // JSON 파일에서 거래 내역 가져오기
    const data = await res.json()
    assetStore.transactions = data.transactions // Pinia store에 거래 내역 저장
  } catch (err) {
    console.error('거래내역 가져오기 실패:', err)
  }
}

// 페이지가 마운트될 때 거래 내역과 예산 정보를 불러옴
onMounted(async () => {
  assetStore.loadFromStorage() // 로컬스토리지에서 자산 불러오기
  await fetchTransactions()
  await budgetStore.fetchBudgetByMonth(selectedMonth.value)
})

// 월별 지출 계산
const monthlyExpense = computed(() => {
  return assetStore.transactions
    .filter((t) => t.type === '지출' && t.date.startsWith(selectedMonth.value))
    .reduce((sum, t) => sum + t.amount, 0)
})

// 월 변경 시 예산 데이터 새로 가져오기
watch(selectedMonth, async (newMonth) => {
  await budgetStore.fetchBudgetByMonth(newMonth)
})
</script>
