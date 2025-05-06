<template>
  <div>
    <template v-for="(items, date) in groupedTransactions" :key="date">
      <div class="text-kb-ui-03 text-label-lg font-semibold mt-6 mb-2 pl-4">
        {{ formatDateLabel(date) }}
      </div>
      <div class="h-px bg-kb-ui-07 mx-4"></div>
      <ul>
        <TransactionListItem v-for="item in items" :key="item.id" :transaction="item" />
      </ul>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TransactionListItem from './TransactionListItem.vue'

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
})

// 날짜 기준으로 그룹핑
const groupedTransactions = computed(() => {
  const map = {}
  for (const tx of props.transactions) {
    if (!tx.date) continue
    const date = tx.date // "2025-04-05"
    if (!map[date]) {
      map[date] = []
    }
    map[date].push(tx)
  }

  // 날짜 최신순
  return Object.fromEntries(Object.entries(map).sort((a, b) => new Date(b[0]) - new Date(a[0])))
})

// 날짜 라벨 출력
function formatDateLabel(dateStr) {
  const today = new Date()
  const target = new Date(dateStr)

  const isToday = today.toISOString().split('T')[0] === target.toISOString().split('T')[0]

  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토']
  const weekday = dayOfWeek[target.getDay()]
  const month = target.getMonth() + 1
  const day = target.getDate()

  return isToday ? `${day}일 오늘` : `${day}일 ${weekday}요일`
}
</script>
