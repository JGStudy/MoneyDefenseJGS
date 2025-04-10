<template>
  <li class="flex items-center justify-between gap-4 p-4 border-b border-kb-ui-07">
    <!-- 회색 원 안에 + -->
    <div
      class="relative w-10 h-10 flex-none rounded-[22px] bg-kb-ui-09 flex items-center justify-center"
    >
      <span class="text-kb-ui-05 text-number-sm font-nums opacity-50">+</span>
    </div>

    <div class="flex-1 min-w-0">
      <!-- 거래처 -->
      <p class="text-kb-ui-01 text-body02 font-medium truncate">김*지</p>
      <!-- 결제수단, 결제수단 상세 -->
      <p class="text-kb-ui-05 text-body03 mt-0.5">결제수단 | 결제수단상세</p>
    </div>

    <!-- 금액 -->
    <div class="text-right whitespace-nowrap">
      <p class="text-kb-ui-01 text-body01 font-semibold">+ 70,000원</p>
    </div>
  </li>
</template>

<script setup>
// defineProps({
//   name: String,
//   method: String,
//   detail: String,
//   amount: Number,
//   hasAlert: Boolean,
// })
</script>

<style scoped></style>
