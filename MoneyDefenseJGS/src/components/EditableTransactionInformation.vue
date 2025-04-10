<!-- EditableTransactionInformation.vue -->
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
      <div class="flex items-center gap-2" @click="toggleCategory">
        <label class="font-semibold whitespace-nowrap">
          카테고리 {{ store.category || '카테고리를 선택하세요' }}
        </label>
      </div>
      <div
        v-if="showCategory"
        class="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-20 max-h-60 overflow-auto"
      >
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectCategory(cat)"
          class="w-full text-left px-4 py-2 hover:bg-blue-100"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- 결제수단 -->
    <div class="relative w-full">
      <div class="flex items-center gap-2" @click="toggleMethod">
        <label class="font-semibold whitespace-nowrap">
          결제수단 {{ store.paymentMethodss || '결제수단을 선택하세요' }}
        </label>
      </div>
      <div
        v-if="showMethod"
        class="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-20"
      >
        <button
          v-for="method in paymentMethodss"
          :key="method"
          @click="selectMethod(method)"
          class="w-full text-left px-4 py-2 hover:bg-blue-100"
        >
          {{ method }}
        </button>
      </div>
    </div>

    <!-- 날짜 선택 -->
    <div>
      <label class="font-semibold">날짜</label>
      <input v-model="store.date" type="date" class="w-full border rounded px-3 py-2" />
    </div>

    <!-- 메모 -->
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
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const store = useTransactionStore()
const showCategory = ref(false)
const showMethod = ref(false)

const types = ['수입', '지출', '이체']
const categories = ['식비', '교통비', '도서비', '정기구독비', '기타']
const paymentMethodss = ['카드', '현금', '모바일페이', '토스', '기타']

const toggleCategory = () => {
  showCategory.value = !showCategory.value
}

const selectCategory = (cat) => {
  store.category = cat
  showCategory.value = false
}

const toggleMethod = () => {
  showMethod.value = !showMethod.value
}

const selectMethod = (method) => {
  store.paymentMethods = method
  showMethod.value = false
}
</script>
