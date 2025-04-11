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
    >
      <template #day-content="{ day }">
        <div
          class="w-full h-full min-h-[70px] flex flex-col justify-start items-center py-1 relative cursor-pointer"
          @click="onDayClick(day)"
        >
          <div class="flex items-center justify-center w-5 h-5 mb-1">
            <div
              v-if="isToday(day.date)"
              class="w-5 h-5 rounded-full border border-status-positive bg-status-positive flex items-center justify-center"
            >
              <span class="text-[10px] text-kb-ui-01">{{ day.day }}</span>
            </div>
            <div v-else class="text-[10px] text-kb-ui-03">{{ day.day }}</div>
          </div>

          <div class="flex flex-col gap-0.5 max-h-[40px] overflow-hidden w-full items-center">
            <div
              v-for="tx in getFilteredDailyTransactions(day.date)"
              :key="tx.id"
              class="text-[10px] font-nums break-words text-center truncate max-w-[40px]"
              :class="{
                'text-status-positive': tx.type === '지출',
                'text-red-500': tx.type === '수입',
                'text-status-caution': tx.type === '이체',
              }"
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
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import { format, isToday } from 'date-fns'
import CalendarModal from '@/components/transaction/CalendarModal.vue'

const props = defineProps({
  page: Object,
  transactions: Array, // << 이거 받기만 해!
  selectedTypes: Array, // << 이거도 받기만 해!
})
watch(
  () => props.transactions,
  (val) => {
    console.log('🔥 transactions', val)
  },
  { deep: true },
)

watch(
  () => props.selectedTypes,
  (val) => {
    console.log('🔥 selectedTypes', val)
  },
  { deep: true },
)
const emit = defineEmits(['update:page'])

const showModal = ref(false)
const modalTransactions = ref([])
const modalDateText = ref('')

const formatAmount = (amt) => {
  return Math.abs(amt).toLocaleString() + '원'
}

const onDayClick = (day) => {
  const targetDate = format(day.date, 'yyyy-MM-dd')
  modalTransactions.value = props.transactions.filter((tx) => tx.date === targetDate)
  modalDateText.value = format(day.date, 'M월 d일')
  showModal.value = true
}

const getFilteredDailyTransactions = (date) => {
  const target = format(date, 'yyyy-MM-dd')
  return props.transactions.filter(
    (tx) => tx.date === target && props.selectedTypes.includes(tx.type),
  )
}

const calendarAttributes = computed(() => {
  const typeGroups = { 지출: [], 수입: [], 이체: [] }
  props.transactions.forEach((tx) => {
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
