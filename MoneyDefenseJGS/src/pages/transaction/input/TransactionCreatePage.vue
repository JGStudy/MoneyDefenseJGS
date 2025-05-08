<template>
  <AppLayout :title="isEditMode ? '거래 수정' : '거래 등록'">
    <div
      class="flex flex-col min-h-screen font-sans bg-white dark:bg-kb-dark-line text-kb-ui-02 dark:text-kb-dark-text"
    >
      <!-- 스크롤 콘텐츠 -->
      <div class="flex-1 overflow-y-auto px-6 pt-6 pb-24 space-y-6 max-w-xl mx-auto">
        <TransactionSummary />
        <AmountInput />

        <!-- 메모 -->
        <div>
          <label class="text-body03 font-semibold mb-2 block text-kb-ui-02 dark:text-kb-dark-text"
            >메모</label
          >
          <input
            v-model="store.memo"
            placeholder="입력하세요"
            class="w-full px-4 py-3 rounded-xl bg-white dark:bg-kb-dark-muted border border-kb-ui-07 text-body02 text-kb-ui-02 dark:text-kb-dark-text placeholder:text-kb-ui-05 focus:outline-none focus:border-kb-yellow-positive transition"
          />
        </div>

        <EditableTransactionInformation />
      </div>

      <!-- 하단 버튼 -->
      <div
        class="fixed bottom-0 left-0 right-0 bg-white dark:bg-kb-dark-card border-t border-kb-ui-08 dark:border-kb-dark-line z-50 px-6 py-4 space-y-2 max-w-xl mx-auto w-full"
      >
        <button
          @click="handleSubmit"
          class="w-full py-3 rounded-xl bg-kb-yellow-positive text-black font-semibold text-body02 hover:brightness-105 transition"
        >
          {{ isEditMode ? '수정' : '저장' }}
        </button>

        <button
          v-if="isEditMode"
          @click="openConfirmModal"
          class="w-full py-3 rounded-xl bg-status-error text-white font-semibold text-body02 hover:brightness-90 transition"
        >
          삭제
        </button>
      </div>

      <!-- ✅ 알림 모달 -->
      <ConfirmPopup
        :visible="showAlert"
        :message="modalMessage"
        confirmText="확인"
        @cancel="router.back()"
        @confirm="router.back()"
      />

      <!-- ✅ 확인 모달 (삭제용) -->
      <ConfirmPopup
        :visible="showConfirm"
        message="정말 삭제하시겠습니까?"
        cancelText="취소"
        confirmText="삭제"
        @cancel="showConfirm = false"
        @confirm="handleDelete"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import AppLayout from '@/pages/layout/AppLayoutPage.vue'
import TransactionSummary from '@/components/transaction/input/TransactionSummary.vue'
import AmountInput from '@/components/transaction/input/AmountInput.vue'
import EditableTransactionInformation from '@/components/transaction/input/EditableTransactionInformation.vue'

import ConfirmPopup from '@/components/common/ConfirmPopup.vue'
import { useTransactionStore } from '@/stores/transactionStore'

import {
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '@/api/transactionApi'

const store = useTransactionStore()
const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => !!route.params.id)

// 모달 관련 상태
const showAlert = ref(false)
const showConfirm = ref(false)
const modalMessage = ref('')

const openAlert = (message) => {
  modalMessage.value = message
  showAlert.value = true
}

const openConfirmModal = () => {
  showConfirm.value = true
}

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const { data } = await getTransactionById(route.params.id)
      Object.assign(store, data)
    } catch (err) {
      console.error('거래 정보 불러오기 실패:', err)
      router.back()
    }
  } else {
    store.resetTransaction()
  }
})

async function handleSubmit() {
  const now = new Date().toISOString().slice(0, 16)
  const payload = {
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
      await updateTransaction(route.params.id, payload)
      openAlert('거래가 수정되었습니다.')
    } else {
      await createTransaction(payload)
      openAlert('거래가 등록되었습니다.')
    }
  } catch (err) {
    console.error('저장 실패:', err)
    router.back()
  }
}

async function handleDelete() {
  showConfirm.value = false
  try {
    await deleteTransaction(route.params.id)
    openAlert('거래가 삭제되었습니다.')
    router.back()
  } catch (err) {
    console.error('삭제 실패:', err)
    router.back()
  }
}
</script>
