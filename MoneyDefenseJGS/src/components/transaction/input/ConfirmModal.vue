<template>
  <div>
    <!-- 저장 버튼 -->
    <button
      @click="handleSave"
      class="w-full py-3 rounded-xl bg-kb-yellow-positive text-black font-semibold text-body02 hover:brightness-105 transition"
    >
      저장하기
    </button>

    <!-- 입력 누락 경고 모달 -->
    <ConfirmPopup
      :visible="showAlert"
      title="입력 오류"
      message="금액, 분류, 카테고리, 결제수단, 날짜를 모두 입력해주세요."
      @confirm="() => (showAlert.value = false)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ConfirmPopup from '@/components/common/ConfirmPopup.vue'
import { useTransactionStore } from '@/stores/transactionStore'

const store = useTransactionStore()
const showAlert = ref(false)

function handleSave() {
  const rawAmount = store.amount
  const type = (store.type ?? '').toString().trim()
  const category = (store.category ?? '').toString().trim()
  const paymentMethod = (store.source ?? '').toString().trim() // source = 결제수단
  const date = (store.date ?? '').toString().trim()

  const isAmountValid =
    rawAmount !== undefined &&
    rawAmount !== null &&
    rawAmount !== '' &&
    !isNaN(Number(rawAmount)) &&
    Number(rawAmount) >= 1

  const isValid =
    isAmountValid &&
    type !== '' &&
    category !== '' &&
    paymentMethod !== '' &&
    date !== ''

  if (!isValid) {
    showAlert.value = true
    console.log('유효하지 않음')
    return
  } else {
  }

  console.log('저장 성공:', {
    amount: Number(rawAmount),
    type,
    category,
    paymentMethod,
    date,
    memo: store.memo ?? '',
  })

  // 여기서 저장 API 요청 or 상태 처리 등 실행
}
</script>
