<template>
  <button @click="save" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
    저장
  </button>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transaction'
import axios from 'axios'

const store = useTransactionStore()

async function save() {
  const missing = []

  if (!store.amount || Number(store.amount) < 1) missing.push('💰 거래 금액 (1원 이상)')
  if (!store.category) missing.push('📂 카테고리')
  if (!store.partner) missing.push('🏢 거래처')
  if (!store.paymentMethods) missing.push('💳 결제수단')
  if (!store.date) missing.push('📅 날짜')

  if (missing.length > 0) {
    alert(`다음 항목을 확인해주세요:\n\n${missing.join('\n')}`)
    return
  }

  try {
    await axios.post('/api/Title', { ...store.$state })
    alert('✅ 거래가 저장되었습니다!')
  } catch (err) {
    alert('❌ 저장 중 오류가 발생했습니다.')
    console.error('거래 저장 실패:', err)
  }
}
</script>
