<template>
  <div class="flex justify-center items-end mt-6">
    <v-calendar
      is-expanded
      :page="page"
      @update:page="$emit('update:page', $event)"
      :locale="'ko'"
      :show-six-weeks="true"
      :attributes="calendarAttributes"
      class="w-full max-w-[360px] min-w-[280px] h-[600px]"
      content-class="calendar-grid"
    >
      <template #day-content="{ day }">
        <div
          class="min-w-[48px] max-w-[48px] h-full flex flex-col justify-between items-center py-1 relative cursor-pointer"
          @click="onDayClick(day)"
          style="border: 1px solid #ddd"
        >
          <div class="flex items-center justify-center w-5 h-5 mb-1">
            <div
              v-if="isToday(day.date)"
              class="w-5 h-5 rounded-full border border-status-positive bg-status-positive flex items-center justify-center"
            >
              <span style="font-size: 12px; color: black">{{ day.day }}</span>
            </div>
            <div v-else style="font-size: 12px; color: gray">
              {{ day.day }}
            </div>
          </div>

          <div
            class="flex flex-col gap-0.5 w-full items-center px-1 max-h-[40px] overflow-hidden"
            style="min-height: 40px"
          >
            <div
              v-for="tx in getFilteredDailyTransactions(day.date)"
              :key="tx.id"
              :style="getStyleByType(tx.type)"
              class="text-[10px] px-2 py-0.5 rounded font-nums text-center truncate w-full whitespace-nowrap"
            >
              {{ formatAmount(tx.amount) }}
            </div>
          </div>
        </div>
      </template>
    </v-calendar>

    <CalendarModal
      :show="showModal"
      :transactions="modalTransactions"
      :formattedDate="modalDateText"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, watch } from 'vue'
import { format, isToday } from 'date-fns'
import CalendarModal from '@/components/transaction/calendar/CalendarModal.vue'
import { getTransactions } from '@/api/transactionApi'

const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
  selectedTypes: {
    type: Array,
    default: () => ['지출', '수입', '이체'],
  },
})

const transactions = ref([])

const fetchTransactions = async () => {
  try {
    const res = await getTransactions()
    transactions.value = res.data
  } catch (e) {
    console.error('📛 거래 데이터 불러오기 실패:', e)
  }
}

onMounted(fetchTransactions)

watch(
  () => props.page,
  () => {
    fetchTransactions()
  },
  { deep: true },
)

const showModal = ref(false)
const modalTransactions = ref([])
const modalDateText = ref('')

const formatAmount = (amt) => Math.abs(amt).toLocaleString() + '원'

const onDayClick = (day) => {
  const targetDate = format(day.date, 'yyyy-MM-dd')
  modalTransactions.value = transactions.value.filter((tx) => {
    const txDate = format(new Date(tx.date), 'yyyy-MM-dd')
    return txDate === targetDate
  })
  modalDateText.value = format(day.date, 'M월 d일')
  showModal.value = true
}

const getFilteredDailyTransactions = (date) => {
  const target = format(date, 'yyyy-MM-dd')
  return transactions.value.filter((tx) => {
    const txDate = format(new Date(tx.date), 'yyyy-MM-dd')
    return txDate === target && props.selectedTypes.includes(tx.type)
  })
}

const getStyleByType = (type) => {
  switch (type) {
    case '수입':
      return {
        backgroundColor: '#ffe5e5',
        color: '#000',
      }
    case '지출':
      return {
        backgroundColor: '#e0f0ff',
        color: '#000',
      }
    case '이체':
      return {
        backgroundColor: '#fff6cc',
        color: '#000',
      }
    default:
      return {}
  }
}

const calendarAttributes = computed(() => {
  const typeGroups = { 지출: [], 수입: [], 이체: [] }
  transactions.value.forEach((tx) => {
    if (props.selectedTypes.includes(tx.type)) {
      typeGroups[tx.type].push(new Date(tx.date))
    }
  })

  return [
    { key: 'expense', dates: typeGroups['지출'], highlight: { color: 'kb-yellow', fillMode: '' } },
    {
      key: 'income',
      dates: typeGroups['수입'],
      highlight: { color: 'status-positive', fillMode: '' },
    },
    {
      key: 'transfer',
      dates: typeGroups['이체'],
      highlight: { color: 'status-caution', fillMode: '' },
    },
  ]
})
</script>

<style>
.calendar-grid .vc-day-content {
  width: 100% !important;
  max-width: 100% !important;
}
</style>
