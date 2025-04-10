<template>
  <div
    class="flex justify-between items-center bg-kb-ui-11 px-4 py-[18px] border-y border-kb-ui-09"
  >
    <!-- 수입 / 지출 -->
    <div class="space-y-[2px]">
      <p class="body03 text-kb-ui-03">
        수입
        <span class="number-md text-kb-semantic-blue font-semibold">
          {{ income.toLocaleString() }} 원
        </span>
      </p>
      <p class="body03 text-kb-ui-03">
        지출
        <span class="number-md text-kb-semantic-red font-semibold">
          {{ expense.toLocaleString() }} 원
        </span>
      </p>
    </div>

    <!-- 카테고리 선택 -->
    <div class="flex items-center gap-[6px] body03 text-kb-ui-01 font-semibold">
      <span>카테고리 선택</span>
      <svg
        class="w-[16px] h-[16px] text-kb-ui-05"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  income: { type: Number, required: true },
  expense: { type: Number, required: true },
})
</script>
