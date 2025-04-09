<!-- 자산 수정 페이지 -->
<template>
  <div class="p-4">
    <!-- 자산 수정 폼 컴포넌트 -->
    <!-- 기존 자산 값을 초기값으로 전달 -->
    <!-- 저장/취소 이벤트 처리 -->
    <AssetEditForm
      :initial-amount="assetStore.totalAsset"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
// 라우터 페이지 이동 처리
import { useRouter } from 'vue-router'

// 자산 상태 가져오기
import { useAssetStore } from '@/stores/assetStore'

// 자산 수정 폼 컴포넌트 불러오기
import AssetEditForm from '@/components/assetEdit/AssetEditForm.vue'

// 스토어와 라우터 인스턴스
const assetStore = useAssetStore()
const router = useRouter()

// <자산 저장 처리>
// 저장 버튼 클릭 시 실행되는 함수
// 새로운 자산 금액을 저장하고, 수정일을 오늘 날짜로 갱신
// 이후 자산 페이지로 이동
function handleSubmit(newAmount) {
  assetStore.totalAsset = newAmount
  assetStore.lastModified = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  router.push('/asset') // 자산 조회 페이지로 이동
}

// <취소 처리>
// 취소 버튼 클릭 시 자산 페이지로 이동
function handleCancel() {
  router.push('/asset')
}
</script>
