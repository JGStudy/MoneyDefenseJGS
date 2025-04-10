<template>
  <div class="space-y-6 p-4 max-w-xl mx-auto">
    <div>
      <label class="font-semibold">거래처</label>
      <input
        v-model="store.partner"
        type="text"
        placeholder="입력하세요"
        class="w-full border rounded px-3 py-2"
      />
    </div>

    <TransactionSummary @click="() => alert('요약 클릭됨!')" />
    <EditableTransactionInformation />
    <SaveTransactionButton />
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transaction'
import TransactionSummary from '@/components/TransactionSummary.vue'
import EditableTransactionInformation from '@/components/EditableTransactionInformation.vue'
import SaveTransactionButton from '@/components/SaveTransactionButton.vue'

const store = useTransactionStore()

store.$reset?.()
</script>
