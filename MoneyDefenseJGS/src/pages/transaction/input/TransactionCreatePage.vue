<template>
  <AppLayout :title="isEditMode ? '거래 수정' : '거래 등록'">
    <div
      class="flex flex-col min-h-screen font-sans bg-white dark:bg-kb-dark-line text-kb-ui-02 dark:text-kb-dark-text">
      <!-- ✅ 스크롤 가능 콘텐츠 -->
      <div class="flex-1 overflow-y-auto px-6 pt-6 pb-24 space-y-6 max-w-xl mx-auto">
        <!-- 요약 -->
        <TransactionSummary />

        <!-- 금액 입력 -->
        <AmountInput />

        <!-- 메모 (기존 거래처 → memo) -->
        <div>
          <label class="text-body03 font-semibold mb-2 block text-kb-ui-02 dark:text-kb-dark-text">
            메모
          </label>
          <input v-model="store.memo" placeholder="입력하세요"
            class="w-full px-4 py-3 rounded-xl bg-white dark:bg-kb-dark-muted border border-kb-ui-07 text-body02 text-kb-ui-02 dark:text-kb-dark-text placeholder:text-kb-ui-05 focus:outline-none focus:border-kb-yellow-positive transition" />
        </div>

        <!-- 상세 정보 -->
        <EditableTransactionInformation />
      </div>

      <!-- ✅ 하단 고정 버튼 -->
      <div
        class="fixed bottom-0 left-0 right-0 bg-white dark:bg-kb-dark-card border-t border-kb-ui-08 dark:border-kb-dark-line z-50 px-6 py-4 space-y-2 max-w-xl mx-auto w-full">
        <button @click="handleSubmit"
          class="w-full py-3 rounded-xl bg-kb-yellow-positive text-black font-semibold text-body02 hover:brightness-105 transition">
          {{ isEditMode ? '수정' : '저장' }}
        </button>

        <button v-if="isEditMode" @click="handleDelete"
          class="w-full py-3 rounded-xl bg-status-error text-white font-semibold text-body02 hover:brightness-90 transition">
          삭제
        </button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import AppLayout from '@/pages/layout/AppLayoutPage.vue'
import TransactionSummary from '@/components/transaction/input/TransactionSummary.vue'
import AmountInput from '@/components/transaction/input/AmountInput.vue'
import EditableTransactionInformation from '@/components/transaction/input/EditableTransactionInformation.vue'
import { useTransactionStore } from '@/stores/transactionStore'

const store = useTransactionStore()
const route = useRoute()
const isEditMode = computed(() => !!route.params.id)

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const { data } = await axios.get(`/Transaction/${route.params.id}`)
      const t = data

      store.id = t.id
      store.userid = t.userid
      store.date = t.date
      store.type = t.type
      store.category = t.category
      store.amount = t.amount
      store.memo = t.memo
      store.source = t.source
      store.create_date = t.create_date
      store.update_date = t.update_date
    } catch (err) {
      alert('❌ 거래 정보를 불러오지 못했습니다.')
      console.error(err)
    }
  } else {
    store.resetTransaction()
  }
})

async function handleSubmit() {
  const now = new Date().toISOString().slice(0, 16)
  const payload = {
    id: store.id,
    userid: store.userid,
    date: store.date,
    type: store.type,
    category: store.category,
    amount: store.amount,
    memo: store.memo,
    source: store.source,
    create_date: store.create_date || now,
    update_date: now,
  }

  try {
    if (isEditMode.value) {
      await axios.put(`/Transaction/${route.params.id}`, payload)
      alert('거래가 수정되었습니다.')
    } else {
      await axios.post('/Transaction', payload)
      alert('거래가 등록되었습니다.')
    }
  } catch (err) {
    alert('❌ 저장 실패')
    console.error(err)
  }
}

async function handleDelete() {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    await axios.delete(`/Transaction/${route.params.id}`)
    alert('🗑️ 거래가 삭제되었습니다.')
  } catch (err) {
    alert('❌ 삭제 실패')
    console.error(err)
  }
}
</script>
