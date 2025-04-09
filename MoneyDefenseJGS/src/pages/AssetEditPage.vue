<template>
  <div class="p-4">
    <!-- 공통 금액 입력 폼 컴포넌트 사용 -->
    <AmountEditForm
      label="자산"
      :initial-amount="assetStore.totalAsset"
      @save="handleSave"
      @cancel="goBack"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAssetStore } from '@/stores/assetStore'
import AmountEditForm from '@/components/common/AmountEditForm.vue'

const assetStore = useAssetStore()
const router = useRouter()

// 저장 버튼 눌렀을 때 실행될 함수
const handleSave = async (newAmount) => {
  await assetStore.updateAsset(newAmount)
  router.push('/asset') // 저장 후 자산 페이지로 이동
}

// 취소 버튼 눌렀을 때 이전 페이지로
const goBack = () => {
  router.back()
}
</script>
