<template>
  <div class="p-4">
    <AppLayoutPage title="예산" title-custom-class="font-light text-body01" close="취소">
      <!-- 공통 금액 입력 폼 컴포넌트 사용 -->
      <AmountEditForm
        label="예산"
        :initial-amount="budgetStore.budget[selectedMonth]"
        @save="handleSave"
      />
    </AppLayoutPage>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppLayoutPage from '@/pages/layout/AppLayoutPage.vue'
import { useBudgetStore } from '@/stores/budgetStore'
import AmountEditForm from '@/components/common/AmountEditForm.vue'
import { useAssetStore } from '@/stores/assetStore'

const budgetStore = useBudgetStore()
const assetStore = useAssetStore()
const router = useRouter()

// localStorage에서 userId 가져오기
const userId = localStorage.getItem('userId')

if (!userId) {
  console.warn('localStorage에서 userId를 찾을 수 없습니다.')
}

// 현재 선택된 월
const selectedMonth = ref(new Date().toISOString().slice(0, 7))

// 마운트 시 예산 정보 로드
onMounted(async () => {
  if (userId) {
    budgetStore.userId = userId
    await budgetStore.fetchBudgetByMonth(selectedMonth.value, userId)
  }
})

// 월 변경 시 예산 다시 불러오기
watch(selectedMonth, async (newMonth) => {
  if (userId) {
    await budgetStore.fetchBudgetByMonth(newMonth, userId)
  }
})

// 예산 저장 후 이동
const handleSave = async (newAmount) => {
  const currentMonth = selectedMonth.value
  await budgetStore.updateBudget(currentMonth, newAmount)
  router.push('/asset')
}
</script>
