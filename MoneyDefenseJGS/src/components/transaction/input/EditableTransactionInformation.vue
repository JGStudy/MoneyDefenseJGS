<template>
  <div class="space-y-6 font-sans">
    <!-- 📌 분류 -->
    <div>
      <label class="block text-body03 font-medium mb-2 text-kb-ui-02 dark:text-kb-dark-text"
        >분류</label
      >
      <div class="flex gap-2">
        <button
          v-for="type in types"
          :key="type"
          @click="store.type = type"
          :class="
            store.type === type
              ? 'bg-kb-yellow-positive text-black'
              : 'bg-kb-ui-10 text-kb-ui-02 dark:bg-kb-dark-line dark:text-kb-dark-text'
          "
          class="px-4 py-2 rounded-xl text-body02 font-semibold transition"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <!-- 📂 카테고리 -->
    <div class="relative">
      <label class="text-body03 font-medium mb-2 block text-kb-ui-02 dark:text-kb-dark-text"
        >카테고리</label
      >
      <div
        class="w-full px-4 py-3 rounded-xl bg-kb-ui-11 dark:bg-kb-dark-muted border border-kb-ui-07 cursor-pointer"
        @click="toggleCategory"
      >
        {{ store.category || '선택하세요' }}
      </div>
      <div
        v-if="showCategory"
        class="absolute left-0 right-0 mt-2 bg-white dark:bg-kb-dark-line border border-kb-ui-07 rounded-xl shadow z-20 max-h-60 overflow-y-auto"
      >
        <button
          v-for="cat in currentCategories"
          :key="cat"
          @click="selectCategory(cat)"
          class="w-full text-left px-4 py-3 hover:bg-kb-ui-10 dark:hover:bg-kb-dark-muted text-body02"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- 💳 결제수단 -->
    <div class="relative">
      <label class="text-body03 font-medium mb-2 block text-kb-ui-02 dark:text-kb-dark-text"
        >결제수단</label
      >
      <div
        class="w-full px-4 py-3 rounded-xl bg-kb-ui-11 dark:bg-kb-dark-muted border border-kb-ui-07 cursor-pointer"
        @click="toggleSource"
      >
        {{ store.source || '선택하세요' }}
      </div>
      <div
        v-if="showSource"
        class="absolute left-0 right-0 mt-2 bg-white dark:bg-kb-dark-line border border-kb-ui-07 rounded-xl shadow z-20 max-h-60 overflow-y-auto"
      >
        <button
          v-for="source in paymentSources"
          :key="source"
          @click="selectSource(source)"
          class="w-full text-left px-4 py-3 hover:bg-kb-ui-10 dark:hover:bg-kb-dark-muted text-body02"
        >
          {{ source }}
        </button>
      </div>
    </div>

    <!-- 📅 날짜 -->
    <div>
      <label class="block text-body03 font-medium mb-2 text-kb-ui-02 dark:text-kb-dark-text"
        >날짜</label
      >
      <input
        v-model="store.date"
        type="date"
        class="w-full px-4 py-3 rounded-xl bg-white dark:bg-kb-dark-muted border border-kb-ui-07 text-body02 text-kb-ui-02 dark:text-kb-dark-text focus:outline-none focus:border-kb-yellow-positive transition"
      />
    </div>

    <!-- 📝 메모 -->
    <!-- <div>
      <label class="block text-body03 font-medium mb-2 text-kb-ui-02 dark:text-kb-dark-text"
        >메모</label
      >
      <textarea
        v-model="store.memo"
        rows="3"
        placeholder="메모를 작성하세요"
        class="w-full px-4 py-3 rounded-xl bg-kb-ui-11 dark:bg-kb-dark-muted border border-kb-ui-07 text-body02 text-kb-ui-02 dark:text-kb-dark-text placeholder:text-kb-ui-05 focus:outline-none focus:border-kb-yellow-positive transition"
      ></textarea>
    </div> -->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

const store = useTransactionStore()

const types = ['수입', '지출', '이체']

const incomeCategories = ['월급', '급여', '용돈', '이자수익', '배당금', '기타']
const expenseCategories = ['식비', '교통비', '도서비', '정기구독비', '기타']
const transferCategories = ['계좌이체', '충전', '출금']
const currentCategories = computed(() => {
  if (store.type === '수입') return incomeCategories
  if (store.type === '지출') return expenseCategories
  if (store.type === '이체') return transferCategories
  return []
})

const showCategory = ref(false)
const showSource = ref(false)

const toggleCategory = () => (showCategory.value = !showCategory.value)
const toggleSource = () => (showSource.value = !showSource.value)

const selectCategory = (cat) => {
  store.category = cat
  showCategory.value = false
}

const paymentSources = ['카드', '현금', '모바일페이', '토스', '기타']
const selectSource = (source) => {
  store.source = source
  showSource.value = false
}
</script>
