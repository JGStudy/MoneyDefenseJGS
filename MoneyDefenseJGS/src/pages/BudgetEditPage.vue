<script setup>
import { ref } from 'vue'
import assetData from '@/db/Asset.json'
import AmountEditForm from '@/components/common/AmountEditForm.vue'

// 예시: 수정할 대상 월 (차후 드롭다운으로 변경 가능)
const targetMonth = 'April'

// 해당 월 데이터 불러오기
const monthItem = assetData.month.find((item) => item.monthly === targetMonth)

// 예산 초기값 세팅
const budget = ref(monthItem?.budget ?? 0)
const saved = ref(false)

const handleSave = (newAmount) => {
  budget.value = newAmount
  saved.value = true
  // 실제 앱에서는 여기서 DB 저장 로직 or 상태 저장 로직 추가
  console.log(`저장된 ${targetMonth} 예산: ₩${newAmount.toLocaleString()}`)
}

const handleCancel = () => {
  budget.value = monthItem?.budget ?? 0
  saved.value = false
}
</script>

<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold text-center mb-4">예산 수정</h1>

    <AmountEditForm
      label="예산"
      :initialAmount="budget"
      @save="handleSave"
      @cancel="handleCancel"
    />

    <p v-if="saved" class="text-green-600 text-center mt-4">
      예산이 성공적으로 저장되었습니다: ₩{{ budget.toLocaleString() }}
    </p>
  </div>
</template>
