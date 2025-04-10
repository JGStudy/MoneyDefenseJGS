<template>
  <div class="p-4">
    <!-- 공통 금액 입력 폼 컴포넌트 사용 -->
    <AmountEditForm
      label="예산"
      :initial-amount="budgetStore.budget"
      @save="handleSave"
      @cancel="goBack"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useBudgetStore } from '@/stores/budgetStore'
import AmountEditForm from '@/components/common/AmountEditForm.vue'

const budgetStore = useBudgetStore()
const router = useRouter()

// 저장 누르면 예산 저장 + 페이지 이동
const handleSave = async (newAmount) => {
  const currentMonth = new Date().toISOString().slice(0, 7)
  await budgetStore.updateBudget(currentMonth, newAmount)
  router.push('/budget') // 예산 조회 페이지로 이동
}

// 취소 누르면 이전 페이지로
const goBack = () => {
  router.back()
}
</script>
