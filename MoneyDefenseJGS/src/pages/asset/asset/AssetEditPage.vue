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
import { useUserStore } from '@/stores/userStore'
import AmountEditForm from '@/components/common/AmountEditForm.vue'
import AppLayoutPage from '@/pages/layout/AppLayoutPage.vue'
const emit = defineEmits(['save'])

const assetStore = useAssetStore()
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  if (userStore.user?.id) {
    assetStore.userId = userStore.user.id
    assetStore.fetchAsset()
  } else {
    console.warn('userId가 존재하지 않습니다. 로그인 상태 확인 필요!')
  }
})

const handleSave = async (newAmount) => {
  try {
    // 자산 업데이트 시도
    await assetStore.updateAsset(newAmount)
    console.log('자산 업데이트 완료:', assetStore.totalAsset) // 자산이 제대로 업데이트 되었는지 확인
    router.push('/asset') // 저장 후 자산 페이지로 이동
  } catch (error) {
    console.error('자산 업데이트 실패:', error)
  }
}
</script>
