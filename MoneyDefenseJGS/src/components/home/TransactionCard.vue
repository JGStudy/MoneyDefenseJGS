<template>
  <Card class="font-sans">
    <div class="mb-4">
      <div class="flex justify-between items-center">
        <h3 class="text-body01">이번 달 지출 내역</h3>
        <span v-if="transactions.length > 0" class="text-body03 text-kb-ui-04 font-nums">
          총 {{ transactions.length }}건
        </span>
      </div>

      <div class="flex items-center text-title03 font-bold gap-1 mt-1">
        <span class="text-number-lg font-nums translate-y-[1px]">
          {{ totalAmount.toLocaleString() }}
        </span>
        <span>원</span>
      </div>

      <div
        v-if="transactions.length > 0"
        class="text-body03 flex items-center gap-1 mt-1 text-kb-ui-04"
      >
        <span>지난 달보다</span>
        <div
          :class="[
            'flex items-center text-[13px]',
            amountDiff > 0 ? 'text-status-error-input' : 'text-status-positive',
          ]"
        >
          <i :class="amountDiff > 0 ? 'xi-caret-up-min' : 'xi-caret-down-min'"></i>
          <span class="font-nums translate-y-[1px]">
            {{ Math.abs(amountDiff).toLocaleString() }}
          </span>
          <span class="font-sans"> 원</span>
        </div>
        <span>{{ amountDiff > 0 ? '올랐습니다' : '내렸습니다' }}</span>
      </div>
    </div>

    <ul class="space-y-2">
      <li v-for="tx in visibleTransactions" :key="tx.id" class="flex justify-between items-center">
        <div class="flex items-center gap-2 max-w-[70%] truncate">
          <span
            class="w-2.5 h-2.5 rounded-full shrink-0"
            :style="{ backgroundColor: getCategoryColor(tx.category) }"
          ></span>
          <span class="text-body03 text-kb-ui-02 truncate">{{ tx.memo }}</span>
        </div>
        <span class="text-body03 font-nums">{{ Number(tx.amount).toLocaleString() }}원</span>
      </li>

      <li v-if="transactions.length === 0" class="text-body03 text-center text-kb-ui-04">
        지출 내역이 없습니다.
      </li>
    </ul>

    <div v-if="transactions.length > 3" class="mt-4 flex justify-center">
      <button @click="handleToggle" class="text-body03 text-kb-ui-03 flex items-center gap-1">
        <i :class="visibleCount >= transactions.length ? 'xi-angle-up' : 'xi-plus'"></i>
        {{ isExpanded && visibleCount >= transactions.length ? '접기' : '더보기' }}
      </button>
    </div>
  </Card>
</template>

<script setup>
import Card from '@/components/common/BaseBox.vue'
import { ref, onMounted, computed } from 'vue'
import { getAllTransactions } from '@/api/transactionApi'
import { isThisMonth, isSameMonth, parseISO, subMonths } from 'date-fns'

const transactions = ref([])
const visibleCount = ref(3) // 3개씩 보여주기
const isExpanded = ref(false)
const lastMonthTotal = ref(0)

const visibleTransactions = computed(() => transactions.value.slice(0, visibleCount.value))

const totalAmount = computed(() =>
  transactions.value.reduce((sum, tx) => sum + Number(tx.amount), 0),
)

const amountDiff = computed(() => totalAmount.value - lastMonthTotal.value)

const getCategoryColor = (category) => {
  const colorMap = {
    식비: '#FF8C94',
    교통: '#FFBE76',
    쇼핑: '#6A89CC',
    생활: '#82CCDD',
    기타: '#95A5A6',
  }
  return colorMap[category] || '#D3D3D3'
}

const handleToggle = () => {
  if (visibleCount.value < transactions.value.length) {
    visibleCount.value += 3
    isExpanded.value = true
  } else {
    visibleCount.value = 3
    isExpanded.value = false
  }
}

onMounted(async () => {
  const allItems = await getAllTransactions()
  const parsed = allItems.map((tx) => ({
    ...tx,
    date: parseISO(tx.date),
  }))

  const thisMonthTx = parsed
    .filter((tx) => tx.type === '지출' && isThisMonth(tx.date))
    .sort((a, b) => b.date - a.date)

  const lastMonth = subMonths(new Date(), 1)
  const lastMonthTx = parsed.filter((tx) => tx.type === '지출' && isSameMonth(tx.date, lastMonth))

  transactions.value = thisMonthTx
  lastMonthTotal.value = lastMonthTx.reduce((sum, tx) => sum + Number(tx.amount), 0)
})
</script>
