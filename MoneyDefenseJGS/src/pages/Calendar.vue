<template>
  <RealHeader></RealHeader>
  <div class="bg-kb-ui-11 min-h-screen flex flex-col justify-between px-4 pt-2 pb-20">
    <!-- 상단 컨트롤 영역 -->
    <div class="flex flex-col w-full items-center gap-2 mt-2 mt-4">
      <MonthNavigation :month="page.month" @change-month="changeMonth" />
      <CalendarFilter :selected-types="selectedTypes" @toggle-type="toggleType" />
    </div>

    <!-- 달력 -->
    <div class="flex justify-center items-end">
      <v-calendar
        is-expanded
        v-model:page="page"
        :locale="'ko'"
        :show-six-weeks="true"
        :attributes="calendarAttributes"
        class="w-full max-w-[360px] min-w-[280px] h-[420px]"
      >
        <template #day-content="{ day }">
          <div
            class="w-full h-full min-h-[50px] flex flex-col justify-start items-center py-１ relative cursor-pointer"
            @click="onDayClick(day)"
          >
            <!-- 날짜 숫자 -->
            <div class="flex items-center justify-center w-5 h-5 mb-1">
              <div
                v-if="isToday(day.date)"
                class="w-5 h-5 rounded-full border border-status-positive bg-status-positive flex items-center justify-center"
              >
                <span class="text-[10px] text-kb-ui-01">{{ day.day }}</span>
              </div>
              <div v-else class="text-[10px] text-kb-ui-03">
                {{ day.day }}
              </div>
            </div>

            <!-- 거래 금액 -->
            <div class="flex flex-col gap-0.5 max-h-[40px] overflow-hidden w-full items-center">
              <div
                v-for="tx in getFilteredDailyTransactions(day.date)"
                :key="tx.id"
                class="text-[10px] font-nums break-words text-center truncate max-w-[40px]"
                :class="{
                  'text-kb-yellow': tx.type === '지출',
                  'text-status-positive': tx.type === '수입',
                  'text-status-caution': tx.type === '이체',
                }"
              >
                {{ formatAmount(tx.amount) }}
              </div>
            </div>
          </div>
        </template>
      </v-calendar>
    </div>
    <BottomNavBar></BottomNavBar>

    <!-- 모달 -->
    <CalendarModal
      :show="showModal"
      :transactions="modalTransactions"
      :formattedDate="modalDateText"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { addMonths, subMonths, format, isToday } from 'date-fns'
import RealHeader from '@/components/common/RealHeader.vue'
import BottomNavBar from '@/components/common/BottomNavBar.vue'
import MonthNavigation from '@/components/MonthNavigation.vue'
import CalendarFilter from '@/components/CalendarFilter.vue'
import CalendarModal from '@/pages/CalendarModal.vue'

// 상태
const transactions = ref([])
const selectedTypes = ref(['지출', '수입', '이체'])
const currentDate = ref(new Date())
const page = ref({
  year: currentDate.value.getFullYear(),
  month: currentDate.value.getMonth() + 1,
})

// 모달 관련
const showModal = ref(false)
const modalTransactions = ref([])
const modalDateText = ref('')

// API
const fetchTransactions = async () => {
  const res = await axios.get('http://localhost:3000/Title')
  transactions.value = res.data.map((tx, idx) => ({
    id: idx,
    date: tx.date,
    amount: tx.type === '수입' ? tx.amount : -tx.amount,
    type: tx.type,
  }))
}

onMounted(() => {
  fetchTransactions()
})

// 월 변경
const changeMonth = (delta) => {
  const newDate = delta > 0 ? addMonths(currentDate.value, 1) : subMonths(currentDate.value, 1)
  currentDate.value = newDate
  page.value = {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
  }
}

// 타입 필터 토글
const toggleType = (type) => {
  selectedTypes.value.includes(type)
    ? selectedTypes.value.splice(selectedTypes.value.indexOf(type), 1)
    : selectedTypes.value.push(type)
}

// 금액 포맷
const formatAmount = (amt) => {
  const sign = amt < 0 ? '-' : '+'
  return sign + Math.abs(amt).toLocaleString() + '원'
}

// 날짜 클릭 → 모달 열기
const onDayClick = (day) => {
  const targetDate = format(day.date, 'yyyy-MM-dd')
  modalTransactions.value = transactions.value.filter((tx) => tx.date === targetDate)
  modalDateText.value = format(day.date, 'M월 d일')
  showModal.value = true
}

// 특정 날짜의 거래 필터링
const getFilteredDailyTransactions = (date) => {
  const target = format(date, 'yyyy-MM-dd')
  return transactions.value.filter(
    (tx) => tx.date === target && selectedTypes.value.includes(tx.type),
  )
}

// 날짜별 하이라이트
const calendarAttributes = computed(() => {
  const typeGroups = {
    지출: [],
    수입: [],
    이체: [],
  }

  transactions.value.forEach((tx) => {
    if (!selectedTypes.value.includes(tx.type)) return
    typeGroups[tx.type].push(new Date(tx.date))
  })

  return [
    {
      key: 'expense',
      dates: typeGroups['지출'],
      highlight: { color: 'kb-yellow', fillMode: '' },
    },
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

<style scoped>
/* 달력 테두리 제거 */
::v-deep(.vc-pane),
::v-deep(.vc-container),
::v-deep(.vc-pane-container) {
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
}

/* day-content 내부 클릭 가능하게 */
::v-deep(.vc-day-content) {
  pointer-events: auto;
}
</style>
