<template>
  <div
    class="flex justify-between items-center bg-kb-ui-11 px-4 py-[18px] border-y border-kb-ui-09 relative"
  >
    <!-- 수입 / 지출 -->
    <div class="space-y-[2px]">
      <p class="body03 text-kb-ui-03">
        수입
        <span
          class="number-md font-semibold"
          :class="income === 0 ? 'text-kb-ui-01' : 'text-kb-semantic-red'"
        >
          {{ income.toLocaleString() }} 원
        </span>
      </p>

      <p class="body03 text-kb-ui-03">
        지출
        <span
          class="number-md font-semibold"
          :class="expense === 0 ? 'text-kb-ui-01' : 'text-kb-semantic-blue'"
        >
          {{ expense.toLocaleString() }} 원
        </span>
      </p>
    </div>

    <!-- 카테고리 선택 -->
    <div class="flex items-center gap-2 cursor-pointer" @click="toggleDropdown">
      <span>{{ selectedCategory || '카테고리 선택' }}</span>
      <svg
        class="w-4 h-4 text-kb-ui-05"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <ul
      v-if="dropdownOpen"
      class="absolute top-full right-0 mt-2 bg-white shadow rounded text-sm z-10 w-[160px] max-h-64 overflow-y-auto"
    >
      <li
        v-for="cat in categories"
        :key="cat.id"
        @click="() => selectCategory(cat.category)"
        class="px-3 py-2 hover:bg-kb-ui-09 cursor-pointer"
      >
        {{ cat.category }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  income: { type: Number, required: true },
  expense: { type: Number, required: true },
  selectedCategory: { type: String, default: '' },
  categories: { type: Array, default: () => [] },
})

const emit = defineEmits(['select-category'])

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectCategory = (category) => {
  emit('select-category', category)
  dropdownOpen.value = false
}
</script>
