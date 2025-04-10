<template>
  <div class="flex justify-between items-center bg-kb-bg-01 px-4 py-3">
    <!-- 수입/지출 -->
    <div>
      <p class="text-body03 text-kb-text-01">
        수입
        <span class="text-kb-semantic-red font-semibold">{{ income.toLocaleString() }} 원</span>
      </p>
      <p class="text-body03 text-kb-text-01">
        지출
        <span class="text-kb-semantic-blue font-semibold">{{ expense.toLocaleString() }} 원</span>
      </p>
    </div>

    <!-- 카테고리 선택 -->
    <div>
      <select
        v-model="selectedCategory"
        class="text-body03 border border-kb-ui-04 rounded px-2 py-1 text-kb-text-02"
      >
        <option disabled value="">카테고리 선택</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  income: { type: Number, required: true },
  expense: { type: Number, required: true },
  categories: { type: Array, default: () => [] },
})

const selectedCategory = ref('')
</script>

<style scoped>
select {
  appearance: none;
  background: url('@/assets/icon-arrow-down.svg') no-repeat right 0.5rem center;
  background-size: 1rem;
}
</style>
