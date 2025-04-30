<template>
  <button
    @click="save"
    class="w-full bg-kb-yellow-positive text-black py-3 rounded-xl text-body02 font-semibold hover:brightness-105 transition"
  >
    저장
  </button>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore'
import axios from 'axios'

const store = useTransactionStore()

async function save() {
  const missing = []

  // 거래 금액 확인 (1원 이상)
  if (!store.amount || Number(store.amount) < 1) missing.push('💰 거래 금액 (1원 이상)')

  // 카테고리 필수
  if (!store.category) missing.push('📂 카테고리')

  // 거래처 필수
  if (!store.partner) missing.push('🏢 거래처')

  // 💡 결제수단은 '수입'일 때는 검사하지 않음
  if (store.type !== '수입' && !store.paymentMethods) {
    missing.push('💳 결제수단')
  }

  // 날짜 필수
  if (!store.date) missing.push('📅 날짜')

  // 하나라도 누락된 항목이 있다면 경고 표시
  if (missing.length > 0) {
    alert(`다음 항목을 확인해주세요:\n\n${missing.join('\n')}`)
    return
  }

  // 저장 시도
  try {
    await axios.post('/api/Title', { ...store.$state })
    alert('✅ 거래가 저장되었습니다!')
  } catch (err) {
    alert('❌ 저장 중 오류가 발생했습니다.')
    console.error('거래 저장 실패:', err)
  }
}
</script>
