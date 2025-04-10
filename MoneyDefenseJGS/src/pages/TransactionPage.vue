<template>
  <CategoryFilter :income="income" :expense="expense" />
  <TransactionList :transactions="transactions" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import TransactionList from '@/components/transaction/TransactionList.vue'
import CategoryFilter from '@/components/transaction/CategoryFilter.vue'
import { getTransactions } from '@/api/transactionApi'

const transactions = ref([])

const income = computed(() => {
  return transactions.value
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0)
})

const expense = computed(() => {
  return transactions.value
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0)
})

onMounted(async () => {
  try {
    const response = await getTransactions()
    transactions.value = response.data
  } catch (error) {
    console.error('TransactionPage 랜더링 중 에러:', error)
  }
})
</script>
