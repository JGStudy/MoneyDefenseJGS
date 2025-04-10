<template>
  <!-- 총 자산 표시 컴포넌트 -->
  <div class="px-4 mt-6">
    <!-- 총 자산, 수정 버튼 -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-gray-600 text-sm">오늘의 총 자산</span>
      <!-- 수정 버튼 클릭 시 수정 페이지로 라우팅 -->
      <button @click="goToAssetEditPage" class="text-sm text-gray-400 hover:text-gray-600">
        수정
      </button>
    </div>

    <!-- 중앙: 총 자산 금액 -->
    <div class="text-3xl font-bold text-gray-900">{{ formatCurrency(totalAsset) }}원</div>

    <!-- 하단: 오늘 날짜 표시 -->
    <div class="mt-4 text-sm text-gray-600 text-left flex items-center gap-1">
      <span class="text-blue-500">📅</span>
      <span>{{ currentDate }}</span>
    </div>
  </div>
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

// 오늘 날짜를 "YYYY.MM.DD" 형식으로 포맷팅
const currentDate = new Date().toLocaleDateString('ko-KR').replaceAll('.', '.')
</script>

<style scoped>
/* 전체 컨테이너 */
.asset-display-container {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 헤더 영역 (총 자산 + 수정 버튼) */
.asset-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  font-weight: bold;
  font-size: 18px;
  color: #333;
}

.edit-button {
  padding: 8px 16px;
  background-color: #ffd700; /* 수정 버튼 색상 */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #e6b800; /* 수정 버튼 hover 색상 */
}

.edit-button:focus {
  outline: none;
}

/* 총 자산 금액 */
.total-asset {
  font-size: 36px; /* 큰 글씨 크기 */
  font-weight: bold;
  color: #2d2d2d;
  text-align: center;
  margin-bottom: 16px;
}

/* 오늘 날짜 */
.current-date {
  font-size: 14px;
  color: #777;
  text-align: center;
}
</style>
