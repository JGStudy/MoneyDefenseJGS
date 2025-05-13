<template>
  <div class="p-4">
    <AppLayoutPage title="자산" close="취소">
      <!-- 공통 금액 입력 폼 컴포넌트 사용 -->
      <AmountEditForm label="자산" :initial-amount="assetStore.totalAsset" @save="handleSave" />
    </AppLayoutPage>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAssetStore } from '@/stores/assetStore'
import AmountEditForm from '@/components/common/AmountEditForm.vue'
import AppLayoutPage from '@/pages/layout/AppLayoutPage.vue'

const assetStore = useAssetStore()
const router = useRouter()

// 자산 정보 가져오기
onMounted(() => {
  const userId = localStorage.getItem('userId')
  if (userId) {
    assetStore.userId = userId
    assetStore.fetchAsset()
  } else {
    console.warn('localStorage에서 userId를 찾을 수 없습니다.')
  }
})

// 자산 업데이트 처리
const handleSave = async (newAmount) => {
  try {
    await assetStore.updateAsset(newAmount)

    console.log('자산 업데이트 완료:', assetStore.totalAsset)
    router.push('/asset')
  } catch (error) {
    console.error('자산 업데이트 실패:', error)
  }
}
</script>
