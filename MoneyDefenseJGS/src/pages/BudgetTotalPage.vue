<template>
  <div class="p-4 space-y-6">
    <!-- 자산/예산 탭 전환: 현재 예산 탭 활성화 -->
    <TabSwitch active-tab="budget" />

    <!-- 월 선택 컴포넌트 -->
    <MonthSelector v-model="selectedMonth" />

    <!-- 예산 정보 보여주는 컴포넌트 -->
    <!-- 예산/지출/잔여예산 및 게이지 바 시각화 -->
    <BudgetDisplay :budget="monthlyBudget" :expense="monthlyExpense" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 예산 상태 가져오기
import { useBudgetStore } from '@/stores/budgetStore'

// 거래 내역 상태 가져오기
import { useTransactionStore } from '@/stores/transactionStore'

// 컴포넌트 임포트
import TabSwitch from '@/components/common/TabSwitch.vue'
import MonthSelector from '@/components/budget/MonthSelector.vue'
import BudgetDisplay from '@/components/budgetTotal/BudgetDisplay.vue'

// Pinia 스토어 인스턴스
const transactionStore = useTransactionStore()
const budgetStore = useBudgetStore()

// 선택된 월 (YYYY-MM 형식)
const selectedMonth = ref(new Date().toISOString().slice(0, 7))

// 선택한 월의 예산 불러오기
const monthlyBudget = computed(() => budgetStore.getBudgetByMonth(selectedMonth.value))

// 선택한 월의 지출 계산
const monthlyExpense = computed(() => {
  return transactionStore.transactions
    .filter((t) => t.type === 'expense' && t.date.startsWith(selectedMonth.value))
    .reduce((sum, t) => sum + t.amount, 0)
})
// 월 변경 시
function onMonthChange(newMonth) {
  selectedMonth.value = newMonth
}
</script>
