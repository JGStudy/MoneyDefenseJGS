<template>
  <!-- <CategoryFilter
    :income="280000"
    :expense="180000"
    :categories="['전체', '식비', '교통비', '월급', '기타']"
  /> -->

  <TransactionList :transactions="transactions" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TransactionList from '@/components/transaction/TransactionList.vue'
import CategoryFilter from '@/components/transaction/CategoryFilter.vue'
import { getTransactions } from '@/api/transactionApi'

const transactions = ref([])

onMounted(async () => {
  try {
    const response = await getTransactions()
    transactions.value = response.data
  } catch (error) {
    console.error('TransactionPage 랜더링 중 에러:', error)
  }
})
</script>
