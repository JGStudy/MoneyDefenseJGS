<template>
  <div class="space-y-4 p-4">
    <!-- 거래처 표시 -->
    <div class="text-sm text-gray-500">거래처: {{ store.partner || '없음' }}</div>

    <!-- 금액 입력 -->
    <div class="space-y-1">
      <label class="font-semibold text-gray-700">금액</label>
      <input
        ref="amountInputRef"
        :value="formattedAmount"
        @input="onAmountInput"
        @keypress="preventInvalidInput"
        @focus="moveCursorToEnd"
        placeholder="금액을 입력하세요"
        class="w-full border rounded px-3 py-2 text-right text-xl"
        inputmode="numeric"
        pattern="[0-9]*"
      />
      <div v-show="showValidationError && !isValidAmount" class="text-sm text-red-500">
        ⚠️ 1원 이상 입력하세요
      </div>
      <div v-if="nonNumericError" class="text-sm text-red-500">⚠️ 숫자만 입력할 수 있습니다</div>
    </div>

    <!-- 버튼들 -->
    <div class="space-y-2">
      <button
        @click="clearAmount"
        class="w-full bg-red-100 text-red-500 py-2 rounded hover:bg-red-200"
      >
        금액 초기화
      </button>
      <button
        @click="confirmAmount"
        class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        확인
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const store = useTransactionStore()
const formattedAmount = ref('')
const showValidationError = ref(false)
const nonNumericError = ref(false)
const amountInputRef = ref(null)

// 금액 유효성 체크
const isValidAmount = computed(() => {
  const raw = unformatAmount(formattedAmount.value)
  return raw >= 1
})

// 숫자 외 문자 제거
function unformatAmount(val) {
  return Number(val.replace(/[^\d]/g, '')) || 0
}

// 3자리 콤마 + 원 단위
function formatWithComma(num) {
  return Number(num).toLocaleString() + '원'
}

// 입력 시 처리
function onAmountInput(e) {
  const raw = unformatAmount(e.target.value)
  store.amount = String(raw)
  formattedAmount.value = raw ? formatWithComma(raw) : ''

  // 커서 다시 숫자 뒤로 이동
  nextTick(() => moveCursorToEnd())
}

// 커서를 숫자 뒤로 이동
function moveCursorToEnd() {
  const el = amountInputRef.value
  if (el) {
    const pos = el.value.indexOf('원')
    if (pos > -1) {
      el.setSelectionRange(pos, pos)
    } else {
      el.setSelectionRange(el.value.length, el.value.length)
    }
  }
}

// 숫자 외 입력 막고 에러 메시지 띄우기
function preventInvalidInput(e) {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault()
    nonNumericError.value = true
    setTimeout(() => {
      nonNumericError.value = false
    }, 2000)
  }
}

// 금액 초기화
function clearAmount() {
  store.amount = ''
  formattedAmount.value = ''
  showValidationError.value = false
  nonNumericError.value = false
}

// 확인 버튼
function confirmAmount() {
  showValidationError.value = true
  if (!isValidAmount.value) return
  alert(`✅ 저장된 금액: ${formattedAmount.value}`)
}
</script>
