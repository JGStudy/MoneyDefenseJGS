<!-- 자산 수정 컴포넌트 -->
<template>
  <div class="bg-gray-100 p-6 rounded space-y-4 text-center max-w-md mx-auto">
    <!-- 설명 문구 -->
    <div class="text-sm font-semibold">자산을 입력해주세요.</div>

    <!-- 자산 입력 필드 (숫자 입력) -->
    <!-- 양방향 바인딩, 숫자로 변환 -->
    <input
      v-model.number="amount"
      type="number"
      class="w-full text-2xl font-bold text-center bg-white py-2 rounded border"
    />
    <!-- 입력한 자산 금액을 통화 형식으로 표시 -->
    <div class="text-xl font-bold">₩{{ formatCurrency(amount) }}</div>

    <!-- 저장/취소 버튼 -->
    <div class="flex justify-center space-x-4">
      <button @click="submit" class="bg-white px-4 py-2 rounded border">저장</button>
      <button @click="$emit('cancel')" class="bg-white px-4 py-2 rounded border">취소</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// props: 부모 컴포넌트인 AssetEditPage에서 전달받는 초기 자산 금액 받기
const props = defineProps({
  initialAmount: {
    type: Number,
    default: 0,
  },
})

// amount: 사용자 입력 값인 자산 금액을 저장하는 반응형 변수
// 초기값은 props.initialAmount로 설정
const amount = ref(props.initialAmount)

// 사용자가 음수 입력했을 때 하단에 표시할 에러 메시지
const errorMessage = ref('')

// emit: 부모 컴포넌트로 이벤트 전달
const emit = defineEmits(['submit', 'cancel'])

// 저장 버튼 클릭 시 실행되는 함수
// 금액이 0 이상일 경우에만 이벤트가 발생한다.
function submit() {
  if (amount.value >= 0) {
    emit('submit', amount.value)
  } else {
    alert('0원 이상의 값을 입력해주세요.')
  }
}

// 숫자를 통화 형식으로 변환하는 함수
function formatCurrency(value) {
  return value?.toLocaleString() ?? '0'
}
</script>
