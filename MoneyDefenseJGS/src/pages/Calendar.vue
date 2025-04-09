<template>
  <div class="p-6 bg-kb-ui-11 min-h-screen flex flex-col items-center">
    <!-- 월 변경 및 필터 버튼 -->
    <div
      class="flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-[800px] mb-4"
    >
      <!-- 월 이동 -->
      <div class="flex items-center gap-4">
        <button @click="changeMonth(-1)" class="text-body02 text-kb-ui-04 hover:text-kb-ui-02">
          &lt;
        </button>
        <h2 class="text-title02 text-kb-ui-01 font-sans">{{ page.month }}월</h2>
        <button @click="changeMonth(1)" class="text-body02 text-kb-ui-04 hover:text-kb-ui-02">
          &gt;
        </button>
      </div>

      <!-- 필터 버튼 -->
      <div class="flex gap-2">
        <button
          v-for="type in ['지출', '수입', '이체']"
          :key="type"
          @click="toggleType(type)"
          :class="[
            'px-4 py-1 rounded border text-body03 font-medium',
            selectedTypes.includes(type)
              ? 'bg-kb-ui-04 text-white border-kb-ui-04'
              : 'bg-white text-kb-ui-03 border-kb-ui-06 hover:border-kb-ui-04',
          ]"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <!-- 달력 -->
    <v-calendar
      is-expanded
      v-model:page="page"
      :locale="'ko'"
      :show-six-weeks="true"
      :attributes="calendarAttributes"
      class="w-full min-w-[800px] max-w-[800px] h-[600px] rounded-lg border border-kb-ui-07 shadow-list bg-kb-ui-11"
      @dayclick="onDayClick"
    >
      <template #day-content="{ day }">
        <div
          class="w-full h-full min-h-[96px] flex flex-col justify-between items-center py-2 transition cursor-pointer relative"
        >
          <!-- 오늘 날짜 동그라미 -->
          <div
            v-if="isToday(day.date)"
            class="absolute top-2 w-7 h-7 rounded-full border border-status-positive flex items-center justify-center"
          >
            <span class="text-body03 text-kb-ui-01">{{ day.day }}</span>
          </div>
          <div v-else class="text-body03 text-kb-ui-03">{{ day.day }}</div>

          <!-- 필터된 항목 표시 -->
          <div class="flex flex-col gap-1 mt-1">
            <template v-for="tx in getFilteredDailyTransactions(day.date)" :key="tx.id">
              <div
                class="text-number-sm font-nums text-center"
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
            </template>
          </div>
        </div>
      </template>
    </v-calendar>

    <!-- 선택 날짜의 거래 내역 -->
    <div class="mt-8 space-y-2 w-full max-w-[800px]" v-if="filteredTransactions.length > 0">
      <div
        v-for="item in filteredTransactions"
        :key="item.id"
        class="flex justify-between items-center p-4 rounded-lg bg-kb-ui-10 shadow-module"
      >
        <span class="text-body03 text-kb-ui-03">{{ item.merchant }}</span>
        <span
          :class="[
            'text-number-md font-nums',
            item.type === '지출'
              ? 'text-kb-yellow'
              : item.type === '수입'
                ? 'text-status-positive'
                : 'text-status-caution',
          ]"
        >
          {{ formatAmount(item.amount) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { addMonths, subMonths, format, isSameDay, isToday } from 'date-fns'

const transactions = ref([
  {
    id: 'tx1',
    date: '2025-04-08',
    merchant: '스타벅스',
    amount: -4300,
    type: '지출',
  },
  {
    id: 'tx2',
    date: '2025-04-08',
    merchant: '토스송금',
    amount: 50000,
    type: '이체',
  },
  {
    id: 'tx3',
    date: '2025-04-10',
    merchant: '급여',
    amount: 2300000,
    type: '수입',
  },
])

const selectedTypes = ref(['지출', '수입', '이체'])
const currentDate = ref(new Date())
const selectedDate = ref(null)

const page = ref({
  month: currentDate.value.getMonth() + 1,
  year: currentDate.value.getFullYear(),
})

const changeMonth = (delta) => {
  const newDate = delta > 0 ? addMonths(currentDate.value, 1) : subMonths(currentDate.value, 1)
  currentDate.value = newDate
  page.value = {
    month: newDate.getMonth() + 1,
    year: newDate.getFullYear(),
  }
}

const toggleType = (type) => {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter((t) => t !== type)
  } else {
    selectedTypes.value.push(type)
  }
}

const formatAmount = (amt) => {
  const sign = amt < 0 ? '-' : '+'
  return sign + Math.abs(amt).toLocaleString() + '원'
}

const onDayClick = (day) => {
  selectedDate.value = day.date
}

const filteredTransactions = computed(() => {
  if (!selectedDate.value) return []
  return transactions.value.filter(
    (tx) =>
      isSameDay(new Date(tx.date), new Date(selectedDate.value)) &&
      selectedTypes.value.includes(tx.type),
  )
})

const getFilteredDailyTransactions = (date) => {
  const target = format(date, 'yyyy-MM-dd')
  return transactions.value.filter(
    (tx) => tx.date === target && selectedTypes.value.includes(tx.type),
  )
}

const calendarAttributes = computed(() => {
  const groups = {}
  transactions.value.forEach((tx) => {
    if (!selectedTypes.value.includes(tx.type)) return
    const key = tx.date
    groups[key] = (groups[key] || 0) + tx.amount
  })

  return Object.entries(groups).map(([date, total]) => ({
    key: date,
    dates: new Date(date),
    customData: { total },
    highlight: {
      color:
        total < -100000
          ? 'kb-ui-03'
          : total < -50000
            ? 'kb-ui-04'
            : total < -10000
              ? 'kb-ui-06'
              : '',
      fillMode: total < 0 ? 'light' : '',
    },
  }))
})
</script>

<style scoped>
::v-deep(.vc-header) {
  display: none !important;
}
</style>
