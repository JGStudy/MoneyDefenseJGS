<template>
  <div class="bg-white p-6 rounded shadow space-y-4 text-center">
    <div class="text-lg font-semibold">한 달 예산</div>
    <!-- 수정 버튼 클릭 시 수정 페이지로 라우팅 -->
    <button @click="goToBudgetEditPage">수정</button>

    <div class="space-y-1">
      <div>{{ formatCurrency(budget) }}원</div>

      <!-- 게이지 바 컴포넌트 -->
      <GaugeBar :percentage="spendingRate" />

      <div class="font-bold">예산이 {{ formatCurrency(remainingBudget) }}원 남았습니다.</div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import GaugeBar from './GaugeBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

// 콘솔로 확인
watch(spendingRate, (newRate) => {
  console.log('예산:', props.budget)
  console.log('지출:', props.expense)
  console.log('퍼센트:', newRate)
})

// 통화 포맷
function formatCurrency(value) {
  return value?.toLocaleString() ?? '0'
}

// 예산 수정 페이지로 이동하는 함수
function goToBudgetEditPage() {
  router.push('/budget/edit') // 라우트 경로에 맞게 수정
}
</script>
