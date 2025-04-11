<!-- TransactionSummary.vue -->
<template>
  <div class="text-right text-title02 font-bold text-kb-ui-02 dark:text-kb-dark-text">
    {{ formatted }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const store = useTransactionStore()

const formatted = computed(() => {
  const amount = Number(store.amount || 0)
  return amount ? amount.toLocaleString() + '원' : '0원'
})
</script>
