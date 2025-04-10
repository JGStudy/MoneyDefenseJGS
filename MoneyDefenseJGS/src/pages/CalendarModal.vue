<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black/50 flex justify-center items-end z-50">
      <div class="bg-white rounded-t-xl w-full max-w-[400px] p-4">
        <!-- 헤더 -->
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold">{{ formattedDate }}</span>
          <button @click="$emit('close')">
            <span class="text-xl">✕</span>
          </button>
        </div>

        <!-- 총 건수 -->
        <div class="text-sm text-gray-500 mb-2">총 {{ transactions.length }}건</div>

        <!-- 거래 리스트 -->
        <div v-for="(tx, idx) in transactions" :key="idx" class="flex justify-between mb-2">
          <div>
            <div class="font-semibold">{{ tx.type }}</div>
            <div class="text-xs text-gray-400">{{ tx.memo || '-' }}</div>
          </div>
          <div
            :class="
              tx.type === '지출'
                ? 'text-kb-yellow'
                : tx.type === '수입'
                  ? 'text-status-positive'
                  : 'text-status-caution'
            "
          >
            {{ formatAmount(tx.amount) }}
          </div>
        </div>

        <!-- 버튼 -->
        <button class="mt-4 w-full bg-kb-yellow text-white py-2 rounded-lg">추가하기</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: Boolean,
  transactions: Array,
  formattedDate: String,
})

const emit = defineEmits(['close'])

const formatAmount = (amt) => {
  const sign = amt < 0 ? '-' : '+'
  return sign + Math.abs(amt).toLocaleString() + '원'
}
</script>

<style scoped>
.modal-content {
  width: 100%;
  max-width: 320px; /* 원하는 크기 */
  margin: 0 auto;
}

/* 거래내역 리스트 쪽 폭 제한 */
.transaction-item {
  word-break: break-word;
  max-width: 280px;
}
</style>
