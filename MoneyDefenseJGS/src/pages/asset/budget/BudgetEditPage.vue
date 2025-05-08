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
const assetStore = useAssetStore() // 자산 스토어 인스턴스
const router = useRouter()

// 쿠키에서 userId 추출하는 함수
function getUserIdFromCookie() {
  const match = document.cookie.match(/(?:^|; )userId=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

// 쿠키에서 userId 가져오기
const userId = getUserIdFromCookie()

// userId가 없을 경우 경고 로그
if (!userId) {
  console.warn('쿠키에서 userId를 찾을 수 없습니다.')
}

// 선택된 월 상태 변수
const selectedMonth = ref(new Date().toISOString().slice(0, 7)) // 현재 월

// 예산 페이지가 마운트될 때, userId를 설정하고 예산 정보를 가져옴
onMounted(async () => {
  if (userId) {
    budgetStore.userId = userId
    await budgetStore.fetchBudgetByMonth(selectedMonth.value, userId)
  }
})

// 월 변경 시 예산 새로 불러오기
watch(selectedMonth, async (newMonth) => {
  if (userId) {
    await budgetStore.fetchBudgetByMonth(newMonth, userId)
  }
})

// 저장 누르면 예산 저장 + 페이지 이동
const handleSave = async (newAmount) => {
  const currentMonth = selectedMonth.value // selectedMonth 사용
  await budgetStore.updateBudget(currentMonth, newAmount)
  router.push('/asset')
}
</script>
