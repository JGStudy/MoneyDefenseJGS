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
          @click="selectedType = type"
          :class="
            selectedType === type
              ? 'bg-kb-yellow-positive text-black'
              : 'bg-kb-ui-10 text-kb-ui-02 dark:bg-kb-dark-line dark:text-kb-dark-text'
          "
          class="px-4 py-2 rounded-xl text-body02 font-semibold transition"
        >
          {{ type }}
        </button>
      </div>

      <!-- ✅ 수입 항목 세부 리스트 -->
      <div v-if="selectedType === '수입'" class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="item in incomeCategories"
          :key="item"
          @click="category = item"
          class="px-3 py-1 rounded-full border border-kb-ui-07 text-body03 hover:bg-kb-ui-10 dark:hover:bg-kb-dark-muted transition"
        >
          {{ item }}
        </button>
      </div>
    </div>

    <!-- 📂 카테고리 -->
    <div
      class="flex justify-between items-center w-full px-4 py-3 rounded-xl bg-kb-ui-11 dark:bg-kb-dark-muted border border-kb-ui-07 cursor-pointer"
    >
      <label class="text-body03 font-medium text-kb-ui-02 dark:text-kb-dark-text">카테고리</label>
      <span class="text-body02 text-kb-ui-02 dark:text-kb-dark-text">{{
        category || '선택하세요'
      }}</span>
    </div>

    <!-- 🏢 거래처 -->
    <div>
      <label class="block text-body03 font-medium mb-2 text-kb-ui-02 dark:text-kb-dark-text"
        >거래처</label
      >
      <input
        v-model="partner"
        placeholder="거래처를 입력하세요"
        class="w-full px-4 py-3 rounded-xl bg-kb-ui-11 dark:bg-kb-dark-muted border border-kb-ui-07 text-body02 text-kb-ui-02 dark:text-kb-dark-text placeholder:text-kb-ui-05 focus:outline-none focus:border-kb-yellow-positive transition"
      />
    </div>

    <!-- 💳 결제수단 -->
    <div>
      <label class="block text-body03 font-medium mb-2 text-kb-ui-02 dark:text-kb-dark-text"
        >결제수단</label
      >
      <input
        v-model="paymentMethods"
        placeholder="예: 카드, 현금"
        class="w-full px-4 py-3 rounded-xl bg-kb-ui-11 dark:bg-kb-dark-muted border border-kb-ui-07 text-body02 text-kb-ui-02 dark:text-kb-dark-text placeholder:text-kb-ui-05 focus:outline-none focus:border-kb-yellow-positive transition"
      />
    </div>

    <!-- 📅 날짜 -->
    <div>
      <label class="block text-body03 font-medium mb-2 text-kb-ui-02 dark:text-kb-dark-text"
        >날짜</label
      >
      <input
        v-model="date"
        type="date"
        class="w-full px-4 py-3 rounded-xl bg-white dark:bg-kb-dark-muted border border-kb-ui-07 text-body02 text-kb-ui-02 dark:text-kb-dark-text focus:outline-none focus:border-kb-yellow-positive transition"
      />
    </div>

    <!-- 📝 메모 -->
    <div>
      <label class="block text-body03 font-medium mb-2 text-kb-ui-02 dark:text-kb-dark-text"
        >메모</label
      >
      <textarea
        v-model="memo"
        rows="3"
        placeholder="메모를 작성하세요"
        class="w-full px-4 py-3 rounded-xl bg-kb-ui-11 dark:bg-kb-dark-muted border border-kb-ui-07 text-body02 text-kb-ui-02 dark:text-kb-dark-text placeholder:text-kb-ui-05 focus:outline-none focus:border-kb-yellow-positive transition"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const types = ['수입', '지출', '이체']
const selectedType = ref('수입')

const category = ref('')
const partner = ref('')
const paymentMethods = ref('')
const date = ref('')
const memo = ref('')

const incomeCategories = ['월급', '용돈', '이자수입', '배당금']
</script>
