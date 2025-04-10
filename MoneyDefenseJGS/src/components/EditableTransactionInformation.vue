<template>
  <div class="space-y-4 w-full min-w-0">
    <!-- 분류 -->
    <div class="flex items-center gap-2 whitespace-nowrap overflow-x-auto">
      <label class="font-semibold">분류</label>
      <button
        v-for="type in types"
        :key="type"
        @click="store.type = type"
        :class="store.type === type ? 'bg-blue-500 text-white' : 'bg-gray-200'"
        class="px-3 py-1 rounded whitespace-nowrap"
      >
        {{ type }}
      </button>
    </div>

    <!-- 카테고리 -->
    <div class="relative w-full">
      <div class="flex items-center gap-2 cursor-pointer" @click="toggleCategory">
        <label class="font-semibold whitespace-nowrap">카테고리:</label>
        <span class="text-gray-600">
          {{ store.category || '카테고리를 선택하세요' }}
        </span>
      </div>
      <div
        v-if="showCategory"
        class="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-20 max-h-60 overflow-auto"
      >
        <button
          v-for="cat in currentCategories"
          :key="cat"
          @click="selectCategory(cat)"
          class="w-full text-left px-4 py-2 hover:bg-blue-100"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- 결제수단 (수입일 경우 숨김) -->
    <div class="relative w-full" v-if="store.type !== '수입'">
      <div class="flex items-center gap-2 cursor-pointer" @click="toggleMethod">
        <label class="font-semibold whitespace-nowrap">결제수단:</label>
        <span class="text-gray-600">
          {{ store.paymentMethods || '결제수단을 선택하세요' }}
        </span>
      </div>
      <div
        v-if="showMethod"
        class="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-20"
      >
        <button
          v-for="method in paymentMethods"
          :key="method"
          @click="selectMethod(method)"
          class="w-full text-left px-4 py-2 hover:bg-blue-100"
        >
          {{ method }}
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
    <div>
      <label class="font-semibold">메모</label>
      <input
        v-model="store.memo"
        type="text"
        placeholder="입력하세요"
        class="w-full border rounded px-3 py-2"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const store = useTransactionStore()

const showCategory = ref(false)
const showMethod = ref(false)

const types = ['수입', '지출', '이체']

const incomeCategories = ['월급', '급여', '용돈', '이자수익', '배당금', '기타']
const expenseCategories = ['식비', '교통비', '도서비', '정기구독비', '기타']

const paymentMethods = ['카드', '현금', '모바일페이', '토스', '기타']

// ✅ 분류에 따라 카테고리 리스트 변경
const currentCategories = computed(() => {
  return store.type === '수입' ? incomeCategories : expenseCategories
})

const toggleCategory = () => {
  showCategory.value = !showCategory.value
}

const selectCategory = (cat) => {
  store.category = cat
  showCategory.value = false
}

const paymentMethodss = ['카드', '현금', '모바일페이', '토스', '기타']
const selectMethod = (method) => {
  store.paymentMethods = method
  showMethod.value = false
}
</script>
