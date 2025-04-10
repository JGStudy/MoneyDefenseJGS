<template>
  <div class="p-4">
    <AppLayoutPage title="예산" close="취소">
      <!-- 공통 금액 입력 폼 컴포넌트 사용 -->
      <AmountEditForm label="예산" :initial-amount="budgetStore.budget" @save="handleSave" />
    </AppLayoutPage>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppLayoutPage from '@/pages/layout/AppLayoutPage.vue'
import { useBudgetStore } from '@/stores/budgetStore'
import AmountEditForm from '@/components/common/AmountEditForm.vue'
import { useAssetStore } from '@/stores/assetStore' // 자산 스토어 가져오기

const budgetStore = useBudgetStore()
const assetStore = useAssetStore() // 자산 스토어 인스턴스
const router = useRouter()

// 저장 누르면 예산 저장 + 페이지 이동
const handleSave = async (newAmount) => {
  const currentMonth = new Date().toISOString().slice(0, 7)
  await budgetStore.updateBudget(currentMonth, newAmount)
  router.push('/asset')
}
</script>
