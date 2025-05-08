<template>
  <li class="flex items-center justify-between gap-4 p-4">
    <div
      class="relative w-10 h-10 flex-none rounded-[22px] bg-kb-ui-09 flex items-center justify-center"
    >
      <span class="text-kb-ui-05 text-number-lg font-nums opacity-50">
        <i :class="['xi', isPositive ? 'xi-plus' : 'xi-minus', 'text-xl']"></i>
      </span>
    </div>

    <div class="flex-1 min-w-0">
      <p class="text-kb-ui-01 text-body02 font-medium truncate">{{ transaction.memo }}</p>
      <p class="text-kb-ui-05 text-body03 mt-0.5">
        {{ transaction.category }} | {{ transaction.source }}
      </p>
    </div>

    <div class="text-right whitespace-nowrap">
      <p class="text-kb-ui-01 text-body01 font-semibold">
        {{ isPositive ? '+' : '-' }}{{ formattedAmount }} 원
      </p>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const isPositive = computed(() => props.transaction.type === '수입')

const formattedAmount = computed(() => Number(props.transaction.amount).toLocaleString())
</script>
