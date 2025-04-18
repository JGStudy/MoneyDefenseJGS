<template>
  <div class="bg-kb-ui-11 min-h-screen flex flex-col pb-24">
    <RealHeader title="가계부" />

    <div class="pt-[98px] px-4 flex flex-col gap-4">
      <MonthNavigation :month="page.month" @change-month="changeMonth" />

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
import { ref, computed, onMounted } from 'vue'

import RealHeader from '@/components/common/RealHeader.vue'
import BottomNavBar from '@/components/common/BottomNavBar.vue'
import MonthNavigation from '@/components/transaction/MonthNavigation.vue'
import CategoryFilter from '@/components/transaction/CategoryFilter.vue'
import CalendarFilter from '@/components/transaction/CalendarFilter.vue'
import TransactionList from '@/components/transaction/TransactionList.vue'
import Calendar from '@/components/transaction/Calendar.vue'

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

const changeMonth = (delta) => {
  const newDate = new Date(page.value.year, page.value.month - 1 + delta)
  page.value.year = newDate.getFullYear()
  page.value.month = newDate.getMonth() + 1
}

const toggleType = (type) => {
  selectedTypes.value.includes(type)
    ? (selectedTypes.value = selectedTypes.value.filter((t) => t !== type))
    : selectedTypes.value.push(type)
}
</script>
