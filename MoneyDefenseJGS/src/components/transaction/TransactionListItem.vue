<template>
  <li class="flex items-center justify-between gap-4 p-4 border-b border-kb-ui-07">
    <div
      class="relative w-10 h-10 flex-none rounded-[22px] bg-kb-ui-09 flex items-center justify-center"
    >
      <span class="text-kb-ui-05 text-number-sm font-nums opacity-50">+</span>
    </div>

    <div class="flex-1 min-w-0">
      <p class="text-kb-ui-01 text-body02 font-medium truncate">{{ transaction.name }}</p>
      <p class="text-kb-ui-05 text-body03 mt-0.5">
        {{ transaction.payment_method }} | {{ transaction.details }}
      </p>
    </div>

    <div class="text-right whitespace-nowrap">
      <p class="text-kb-ui-01 text-body01 font-semibold">{{ transaction.amount }} 원</p>
    </div>
  </li>
</template>

<script setup>
defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped></style>
