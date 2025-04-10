<template>
  <div class="p-6 space-y-6">
    <!-- 상단: 제목과 수정 버튼 -->
    <div class="flex justify-between items-center">
      <h2 class="text-base font-semibold">한 달 예산</h2>
      <button class="text-sm text-gray-400" @click="goToBudgetEditPage">수정</button>
    </div>

    <!-- 예산 잔액 -->
    <div class="text-2xl font-bold">{{ formatCurrency(remainingBudget) }}원 남음</div>
    <div class="text-sm text-gray-400">하루 예산 {{ formatCurrency(dailyBudget) }}원</div>

    <!-- 게이지 바 -->
    <GaugeBar :percentage="spendingRate" />

    <!-- 지출 금액 -->
    <div class="flex items-center justify-between pt-2">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <span class="w-2 h-2 rounded-full bg-[#a48a79]"></span>
        <span>지출</span>
      </div>
      <div class="text-sm font-medium text-gray-800">{{ formatCurrency(expense) }}원</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import GaugeBar from './GaugeBar.vue'

const props = defineProps({
  budget: Number,
  expense: Number,
})

const router = useRouter()

const remainingBudget = computed(() => props.budget - props.expense)
const spendingRate = computed(() => {
  if (props.budget <= 0) return 0
  return Math.min((props.expense / props.budget) * 100, 100)
})

// 하루 예산 계산
const dailyBudget = computed(() => {
  const days = 30
  return props.budget > 0 ? Math.floor(props.budget / days) : 0
})

function formatCurrency(value) {
  return value?.toLocaleString() ?? '0'
}

function goToBudgetEditPage() {
  router.push('/budget/edit')
}
</script>
