<template>
  <div class="p-4 space-y-6">
    <!-- 자산/예산 탭 전환: 현재 예산 탭 활성화 -->
    <TabSwitch active-tab="budget" />

    <!-- 월 선택 컴포넌트 -->
    <MonthSelector v-model="selectedMonth" />

    <!-- 예산 정보 보여주는 컴포넌트 -->
    <!-- 예산/지출/잔여예산 및 게이지 바 시각화 -->
    <BudgetDisplay :budget="budget" :expense="monthlyExpense" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// 컴포넌트
import TabSwitch from '@/components/common/TabSwitch.vue'
import MonthSelector from '@/components/common/MonthSelector.vue'
import BudgetDisplay from '@/components/budgetTotal/BudgetDisplay.vue'

// Pinia 스토어
import { useTransactionStore } from '@/stores/transactionStore'
import { useBudgetStore } from '@/stores/budgetStore'

const transactionStore = useTransactionStore()
const budgetStore = useBudgetStore()

// 현재 월 선택 (예: 2025-04)
const selectedMonth = ref(new Date().toISOString().slice(0, 7))

// 선택한 월의 예산 불러오기
const budget = computed(() => budgetStore.budgetMap[selectedMonth.value] ?? 0)

// 선택한 월의 지출 계산
const monthlyExpense = computed(() => {
  return transactionStore.transactions
    .filter((t) => t.type === 'expense' && t.date.startsWith(selectedMonth.value))
    .reduce((sum, t) => sum + t.amount, 0)
})

// 월 변경 시 예산 데이터 새로 가져오기
watch(selectedMonth, async (newMonth) => {
  await budgetStore.fetchBudgetByMonth(newMonth)
})

// 첫 진입 시 현재 월 예산 로딩
onMounted(async () => {
  await budgetStore.fetchBudgetByMonth(selectedMonth.value)
})
</script>
