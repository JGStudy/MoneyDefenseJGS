<template>
  <button @click="save" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
    저장
  </button>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transaction'

const store = useTransactionStore()

function save() {
  const missing = []

  if (!store.amount || Number(store.amount) < 1) {
    missing.push('💰 거래 금액 (1원 이상)')
  }
  if (!store.category) {
    missing.push('📂 카테고리')
  }
  if (!store.partner) {
    missing.push('🏢 거래처')
  }
  if (!store.paymentMethod) {
    missing.push('💳 결제수단')
  }
  if (!store.date) {
    missing.push('📅 날짜')
  }

  if (missing.length > 0) {
    alert(`다음 항목을 확인해주세요:\n\n${missing.join('\n')}`)
    return
  }

  // 저장 로직
  console.log('저장된 거래:', { ...store.$state })
  alert('✅ 거래가 저장되었습니다!')
}
</script>
