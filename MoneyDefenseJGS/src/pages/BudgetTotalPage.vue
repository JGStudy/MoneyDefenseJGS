<template>
  <AppLayoutPage title="예산" :popupMessage="''">
    <div class="p-4 space-y-6">
      <!-- 자산/예산 탭 전환 -->
      <TabSwitch v-model:activeTab="currentTab" />

      <!-- 예산 탭 내용 (현재 currentTab이 'budget'일 때만 표시) -->
      <div v-if="currentTab === 'budget'">
        <!-- 월 선택 컴포넌트 -->
        <MonthSelector v-model="selectedMonth" />

        <!-- 예산 정보 표시 -->
        <BudgetDisplay :budget="budget" :expense="monthlyExpense" />
      </div>
    </div>
  </AppLayoutPage>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
// import { getTransactions } from '@/api/transaction'
import { getBudget } from '@/api/budget'

// 레이아웃 가져오기
import AppLayoutPage from '@/pages/layout/AppLayoutPage.vue'

// 컴포넌트
import TabSwitch from '@/components/common/TabSwitch.vue'
import MonthSelector from '@/components/common/MonthSelector.vue'
import BudgetDisplay from '@/components/budgetTotal/BudgetDisplay.vue'

// Pinia 스토어
// import { useTransactionStore } from '@/stores/transactionStore'
import { useBudgetStore } from '@/stores/budgetStore'

// 거래 내역을 로컬 상태로 저장
const transactions = ref([])

// const transactionStore = useTransactionStore()
const budgetStore = useBudgetStore()

// 현재 월 선택 (예: 2025-04)
const selectedMonth = ref(new Date().toISOString().slice(0, 7))

// 선택한 월의 예산 불러오기
const budget = computed(() => budgetStore.budgetMap[selectedMonth.value] ?? 0)

// 거래내역 불러오는 함수 (asset.json에서 가져오기)
const fetchTransactions = async () => {
  try {
    const res = await fetch('db/Asset.json')
    const data = await res.json()
    transactions.value = data.transactions
  } catch (err) {
    console.error('거래내역 가져오기 실패:', err)
  }
}
onMounted(async () => {
  await fetchTransactions()
  await budgetStore.fetchBudgetByMonth(selectedMonth.value)
})

// 선택한 월의 지출 계산
const monthlyExpense = computed(() => {
  return transactions.value
    .filter((t) => t.type === '지출' && t.date.startsWith(selectedMonth.value))
    .reduce((sum, t) => sum + t.amount, 0)
})

// 월 변경 시 예산 데이터 새로 가져오기
watch(selectedMonth, async (newMonth) => {
  await budgetStore.fetchBudgetByMonth(newMonth)
})

// 자산/예산 탭을 전환할 때 사용할 변수
const currentTab = ref('budget')
</script>
