<template>
  <div class="bg-kb-ui-11 min-h-screen flex flex-col pb-24">
    <RealHeader title="가계부" />

    <div class="pt-[98px] px-4 flex flex-col gap-4">
      <MonthSelector v-model="yearMonth" />

      <div class="flex justify-center gap-4">
        <button :class="tab === 'list' ? 'font-bold' : 'text-gray-400'" @click="tab = 'list'">
          내역
        </button>
        <button
          :class="tab === 'calendar' ? 'font-bold' : 'text-gray-400'"
          @click="tab = 'calendar'"
        >
          달력
        </button>
      </div>

      <div class="flex flex-col gap-2 mb-2">
        <CategoryFilter :income="income" :expense="expense" />
        <div class="flex justify-center">
          <CalendarFilter :selected-types="selectedTypes" @toggle-type="toggleType" />
        </div>
      </div>
    </div>

    <div class="flex-grow overflow-y-auto px-4">
      <TransactionList v-if="tab === 'list'" :transactions="transactions" />

      <div v-else class="flex justify-center items-start">
        <Calendar
          :page="page"
          :transactions="transactions"
          :selectedTypes="selectedTypes"
          @update:page="(val) => (page = val)"
        />
      </div>
    </div>

    <BottomNavBar />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import RealHeader from '@/components/layout/RealHeader.vue'
import BottomNavBar from '@/components/layout/BottomNavBar.vue'
import MonthSelector from '@/components/common/MonthSelector.vue'
import CategoryFilter from '@/components/transaction/calendar/CategoryFilter.vue'
import CalendarFilter from '@/components/transaction/calendar/CalendarFilter.vue'
import TransactionList from '@/components/transaction/list/TransactionList.vue'
import Calendar from '@/components/transaction/calendar/Calendar.vue'

import { getTransactions } from '@/api/transactionApi'

const transactions = ref([])
const page = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
})
const selectedTypes = ref(['지출', '수입', '이체'])
const tab = ref('list')

const income = computed(() =>
  transactions.value.filter((i) => i.type === 'income').reduce((sum, i) => sum + i.amount, 0),
)
const expense = computed(() =>
  transactions.value.filter((i) => i.type === 'expense').reduce((sum, i) => sum + i.amount, 0),
)

onMounted(async () => {
  const res = await getTransactions()
  console.log('🔥 불러온 데이터', res.data)

  transactions.value = res.data.map((tx) => ({
    ...tx,
    type: tx.type === 'expense' ? '지출' : tx.type === 'income' ? '수입' : '이체',
  }))
})

// 현재 날짜 추출 -> "YYYY-MM" 형식으로 변환
const yearMonth = ref(`${page.value.year}-${String(page.value.month).padStart(2, '0')}`)

watch(yearMonth, (val) => {
  const [year, month] = val.split('-').map(Number)
  page.value.year = year
  page.value.month = month
})

const toggleType = (type) => {
  selectedTypes.value.includes(type)
    ? (selectedTypes.value = selectedTypes.value.filter((t) => t !== type))
    : selectedTypes.value.push(type)
}
</script>
