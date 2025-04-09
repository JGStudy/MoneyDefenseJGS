<template>
  <div class="bg-white p-6 rounded shadow space-y-4 text-center">
    <div class="text-lg font-semibold">예산 요약</div>

    <!-- 예산 요약 수치 -->
    <div class="space-y-1">
      <div>예산: ₩{{ formatCurrency(budget) }}</div>
      <div>지출: ₩{{ formatCurrency(expense) }}</div>
      <div class="font-bold">잔여 예산: ₩{{ formatCurrency(remainingBudget) }}</div>
    </div>

    <!-- 게이지 바 컴포넌트 -->
    <GaugeBar :percentage="spendingRate" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import GaugeBar from './GaugeBar.vue'

const props = defineProps({
  budget: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
})

// 남은 예산 계산
const remainingBudget = computed(() => props.budget - props.expense)

// 퍼센트 = (지출 / 예산) * 100
const spendingRate = computed(() => {
  if (props.budget <= 0) return 0
  return Math.min((props.expense / props.budget) * 100, 100)
})

// 통화 포맷
function formatCurrency(value) {
  return value?.toLocaleString() ?? '0'
}
</script>
