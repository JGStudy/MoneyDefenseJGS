<!-- 총 자산 표시 컴포넌트 -->
<template>
  <!-- 총 자산, 수정 버튼 -->
  <div>
    <span>오늘의 총 자산</span>
    <!-- 수정 버튼 클릭 시 수정 페이지로 라우팅 -->
    <button @click="goToAssetEditPage">수정</button>
  </div>

  <!-- 중앙: 총 자산 금액 -->
  <div>{{ formatCurrency(totalAsset) }}원</div>

  <!-- 하단: 마지막 수정일 -->
  <div>{{ lastModified }} 기준</div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Props로 전달받는 값 정의
defineProps({
  totalAsset: Number, // 총 자산 금액
  lastModified: String, // 마지막 수정일 (예: "2025.04.08")
})

// 금액을 1000단위 콤마로 포맷팅하는 함수
function formatCurrency(amount) {
  return amount?.toLocaleString() ?? '0' // 예: 100000 → "100,000"
}

// 자산 수정 페이지로 이동하는 함수
function goToAssetEditPage() {
  router.push('/asset/edit') // 라우트 경로에 맞게 수정
}
</script>
