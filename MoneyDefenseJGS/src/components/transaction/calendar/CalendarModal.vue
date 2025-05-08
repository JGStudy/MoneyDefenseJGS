<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="show" class="fixed inset-0 bg-black/50 flex justify-center items-end z-[9999]">
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
              :class="{
                'text-status-positive': tx.type === '지출',
                'text-red-500': tx.type === '수입',
                'text-status-caution': tx.type === '이체',
              }"
            >
              {{ formatAmount(tx.amount) }}
            </div>
          </div>

          <!-- 추가 버튼 -->
          <button
            class="mt-4 w-full bg-kb-yellow text-white py-2 rounded-lg"
            @click="router.push('/transaction/create')"
          >
            추가하기
          </button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  show: Boolean,
  transactions: Array,
  formattedDate: String,
})

const router = useRouter()

const formatAmount = (amt) => {
  return Math.abs(amt).toLocaleString() + '원'
}
</script>

<style scoped>
/* 필요한 스타일 작성 가능 */
</style>
