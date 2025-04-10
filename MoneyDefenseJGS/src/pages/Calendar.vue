<template>
  <div class="p-6 bg-kb-ui-11 min-h-screen flex flex-col items-stretch">
    <!-- 상단 컨트롤 영역 -->
    <div class="flex flex-col w-full max-w-[800px] mb-4 items-start">
      <MonthNavigation :month="page.month" @change-month="changeMonth" />
      <CalendarFilter :selected-types="selectedTypes" @toggle-type="toggleType" />
    </div>

    <!-- 달력 -->
    <v-calendar
      is-expanded
      v-model:page="page"
      :locale="'ko'"
      :show-six-weeks="true"
      :attributes="calendarAttributes"
      class="w-full min-w-[800px] max-w-[800px] h-[600px] rounded-lg shadow-list bg-kb-ui-11"
      @dayclick="onDayClick"
    >
      <template #day-content="{ day }">
        <div
          class="w-full h-full min-h-[96px] flex flex-col justify-start items-center py-2 relative"
        >
          <div class="flex items-center justify-center w-7 h-7 mb-1">
            <div
              v-if="isToday(day.date)"
              class="w-7 h-7 rounded-full border border-status-positive bg-status-positive flex items-center justify-center"
            >
              <span class="text-body03 text-kb-ui-01">{{ day.day }}</span>
            </div>
            <div v-else class="text-body03 text-kb-ui-03">
              {{ day.day }}
            </div>
          </div>

          <div class="flex flex-col gap-1 max-h-[70px] overflow-hidden w-full items-center">
            <div
              v-for="tx in getFilteredDailyTransactions(day.date)"
              :key="tx.id"
              class="text-number-sm font-nums break-words text-center truncate max-w-[60px]"
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
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { addMonths, subMonths, format, isToday } from 'date-fns'

import MonthNavigation from '@/components/MonthNavigation.vue'
import CalendarFilter from '@/components/CalendarFilter.vue'

const transactions = ref([])

const selectedTypes = ref(['지출', '수입', '이체'])
const selectedDate = ref(null)
const currentDate = ref(new Date())

const page = ref({
  year: currentDate.value.getFullYear(),
  month: currentDate.value.getMonth() + 1,
})

const fetchTransactions = async () => {
  try {
    const res = await axios.get('http://localhost:3000/Title')
    transactions.value = res.data.map((tx, idx) => ({
      id: idx,
      date: tx.date,
      amount: tx.amount,
      type: tx.type,
    }))
  } catch (error) {
    console.error('데이터 불러오기 실패', error)
  }
}

onMounted(() => {
  fetchTransactions()
})

const changeMonth = (delta) => {
  const newDate = delta > 0 ? addMonths(currentDate.value, 1) : subMonths(currentDate.value, 1)
  currentDate.value = newDate
  page.value = {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
  }
}

const toggleType = (type) => {
  selectedTypes.value.includes(type)
    ? selectedTypes.value.splice(selectedTypes.value.indexOf(type), 1)
    : selectedTypes.value.push(type)
}

const formatAmount = (amt) => {
  const sign = amt < 0 ? '-' : '+'
  return sign + Math.abs(amt).toLocaleString() + '원'
}

const onDayClick = (day) => {
  selectedDate.value = day.date
}

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
::v-deep(.vc-pane),
::v-deep(.vc-container),
::v-deep(.vc-pane-container) {
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
}
</style>
