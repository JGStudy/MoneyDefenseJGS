<template>
  <div class="space-y-2">
    <label class="block font-semibold text-body02 text-kb-ui-02 dark:text-kb-dark-text">
      금액
    </label>

    <input
      ref="amountInputRef"
      :value="formattedAmount"
      @input="onAmountInput"
      @keypress="preventInvalidInput"
      @focus="moveCursorToEnd"
      placeholder="금액을 입력하세요"
      class="w-full px-4 py-3 rounded-xl bg-kb-ui-11 dark:bg-kb-dark-muted border border-kb-ui-07 text-body02 text-kb-ui-02 dark:text-kb-dark-text placeholder:text-kb-ui-05 focus:outline-none focus:border-kb-yellow-positive transition"
      inputmode="numeric"
      pattern="[0-9]*"
    />

    <!-- 유효성 메시지 -->
    <div v-show="showValidationError && !isValidAmount" class="text-body03 text-status-error">
      1원 이상 입력하세요
    </div>
    <div v-if="nonNumericError" class="text-body03 text-status-error">
      숫자만 입력할 수 있습니다
    </div>

    <!-- 초기화 / 확인 버튼 -->
    <div class="flex gap-3 mt-2">
      <button
        @click="clearAmount"
        class="flex-1 py-3 rounded-xl bg-kb-ui-10 text-kb-ui-02 font-semibold text-body02 hover:bg-kb-ui-09 transition"
      >
        금액 초기화
      </button>
      <button
        @click="confirmAmount"
        class="flex-1 py-3 rounded-xl bg-kb-yellow-positive text-black font-semibold text-body02 hover:brightness-105 transition"
      >
        확인
      </button>
    </div>

    <!-- 모달 팝업 -->
    <ConfirmPopup
      :visible="showModal"
      :message="`${formattedAmount} 저장할까요?`"
      :cancelText="'취소'"
      :confirmText="'확인'"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
import ConfirmPopup from '@/components/common/ConfirmPopup.vue'

const store = useTransactionStore()

const formattedAmount = ref('')
const showValidationError = ref(false)
const nonNumericError = ref(false)
const amountInputRef = ref(null)
const showModal = ref(false)

const isValidAmount = computed(() => {
  const raw = unformatAmount(formattedAmount.value)
  return raw >= 1
})

function unformatAmount(val) {
  return Number(val.replace(/[^\d]/g, '')) || 0
}

function formatWithComma(num) {
  return Number(num).toLocaleString() + '원'
}

function onAmountInput(e) {
  const raw = unformatAmount(e.target.value)
  store.amount = raw
  formattedAmount.value = raw ? formatWithComma(raw) : ''
  nextTick(() => moveCursorToEnd())
}

function moveCursorToEnd() {
  const el = amountInputRef.value
  if (el) {
    const pos = el.value.indexOf('원')
    el.setSelectionRange(pos > -1 ? pos : el.value.length, el.value.length)
  }
}

function preventInvalidInput(e) {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault()
    nonNumericError.value = true
    setTimeout(() => {
      nonNumericError.value = false
    }, 2000)
  }
}

function clearAmount() {
  store.amount = ''
  formattedAmount.value = ''
  showValidationError.value = false
  nonNumericError.value = false
}

function confirmAmount() {
  showValidationError.value = true
  if (!isValidAmount.value) return
  showModal.value = true
}

function handleConfirm() {
  showModal.value = false
  console.log(`저장된 금액: ${formattedAmount.value}`)
  // 실제 저장 로직을 여기에 추가 가능
}

function handleCancel() {
  showModal.value = false
}
</script>
