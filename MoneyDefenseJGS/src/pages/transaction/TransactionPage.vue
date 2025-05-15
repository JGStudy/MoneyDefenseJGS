<template>
  <div class="bg-kb-ui-11 min-h-screen flex flex-col pb-24">
    <RealHeader title="가계부" />

    <div class="pt-[98px] px-4 flex flex-col gap-4">
      <MonthSelector v-if="tab !== 'calendar'" v-model="listYearMonth" />

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
        <CategoryFilter
          v-if="tab !== 'calendar'"
          :income="filteredIncome"
          :expense="filteredExpense"
          :categories="mergedCategories"
          :selectedCategory="selectedCategory"
          @select-category="setCategory"
        />

        <div class="flex justify-center">
          <CalendarFilter
            v-if="tab === 'list'"
            :selected-types="listSelectedTypes"
            @toggle-type="toggleListType"
          />
          <CalendarFilter
            v-if="tab === 'calendar'"
            :selected-types="calendarSelectedTypes"
            @toggle-type="toggleCalendarType"
          />
        </div>
      </div>
    </div>

    <div class="flex-grow overflow-y-auto px-4">
      <TransactionList v-if="tab === 'list'" :transactions="filteredListTransactions" />

      <div v-else class="flex justify-center items-start">
        <Calendar
          :page="calendarPage"
          :transactions="filteredTransactions"
          :selectedTypes="calendarSelectedTypes"
          :userId="userId"
          @update:page="(val) => (calendarPage.value = val)"
        />
      </div>
    </div>

    <BottomNavBar />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'

import RealHeader from '@/components/layout/RealHeader.vue'
import BottomNavBar from '@/components/layout/BottomNavBar.vue'
import MonthSelector from '@/components/common/MonthSelector.vue'
import CategoryFilter from '@/components/transaction/calendar/CategoryFilter.vue'
import CalendarFilter from '@/components/transaction/calendar/CalendarFilter.vue'
import TransactionList from '@/components/transaction/list/TransactionList.vue'
import Calendar from '@/components/transaction/calendar/Calendar.vue'

// import { getTransactions, getCategoryExpenses, getCategoryIncome } from '@/api/transactionApi'
import {
  getTransactions,
  getCategoryExpenses,
  getCategoryIncome,
  getTransactionsByUserId,
} from '@/api/transactionApi'

const userStore = useUserStore()
onMounted(() => {
  userStore.loadUser()
})

// const userId = computed(() => String(userStore.user?.userId || '1'))
const userId = localStorage.getItem('userId')

// const transactions = ref([])
// onMounted(async () => {
//   const res = await getTransactions()
//   transactions.value = [...res.data]
// })
const transactions = ref([])
onMounted(async () => {
  try {
    const data = await getTransactionsByUserId(userId)
    transactions.value = [...data]
  } catch (error) {
    console.error('거래 불러오기 실패:', error)
  }
})

const listPage = ref({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 })
const calendarPage = ref({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 })
const listSelectedTypes = ref(['지출', '수입', '이체'])
const calendarSelectedTypes = ref(['지출', '수입', '이체'])
const tab = ref('list')
const selectedCategory = ref('')

const filteredTransactions = computed(() =>
  transactions.value.filter((tx) => String(tx.userid) === userId),
)

const listYearMonth = computed({
  get() {
    return `${listPage.value.year}-${String(listPage.value.month).padStart(2, '0')}`
  },
  set(val) {
    const [year, month] = val.split('-').map(Number)
    if (!isNaN(year) && !isNaN(month)) {
      listPage.value = { year, month }
    }
  },
})

const filteredListTransactions = computed(() => {
  return filteredTransactions.value.filter((tx) => {
    const txDate = new Date(tx.date)
    const isSameMonth =
      txDate.getFullYear() === listPage.value.year && txDate.getMonth() + 1 === listPage.value.month
    const isSelectedType = listSelectedTypes.value.includes(tx.type)
    const isSelectedCategory = !selectedCategory.value || tx.category === selectedCategory.value
    return isSameMonth && isSelectedType && isSelectedCategory
  })
})

const categoryList = ref([])
const setCategory = (val) => {
  selectedCategory.value = val
}

watch([listSelectedTypes, listYearMonth], async () => {
  const types = listSelectedTypes.value
  const [year, month] = listYearMonth.value.split('-')
  const monthStr = `${year}-${String(month).padStart(2, '0')}`
  const result = []

  if (types.includes('수입')) {
    const res = await getCategoryIncome({ userId })
    result.push(...res.data.filter((tx) => tx.month === monthStr))
  }

  if (types.includes('지출')) {
    const res = await getCategoryExpenses({ userId })
    result.push(...res.data.filter((tx) => tx.month === monthStr))
  }

  categoryList.value = result
})

const defaultCategories = [
  '식비',
  '교통비',
  '의료비',
  '교육비',
  '문화생활',
  '주거비',
  '기타',
  '용돈',
  '금융소득',
  '급여',
]

const mergedCategories = computed(() => {
  const dbCats = categoryList.value.map((c) => c.category)
  return Array.from(new Set([...defaultCategories, ...dbCats]))
})

const filteredIncome = computed(() =>
  filteredListTransactions.value
    .filter((tx) => tx.type === '수입')
    .reduce((sum, tx) => sum + tx.amount, 0),
)

const filteredExpense = computed(() =>
  filteredListTransactions.value
    .filter((tx) => tx.type === '지출')
    .reduce((sum, tx) => sum + tx.amount, 0),
)

const toggleListType = (type) => {
  if (listSelectedTypes.value.includes(type)) {
    listSelectedTypes.value = listSelectedTypes.value.filter((t) => t !== type)
  } else {
    listSelectedTypes.value.push(type)
  }
}

const toggleCalendarType = (type) => {
  if (calendarSelectedTypes.value.includes(type)) {
    calendarSelectedTypes.value = calendarSelectedTypes.value.filter((t) => t !== type)
  } else {
    calendarSelectedTypes.value.push(type)
  }
}
</script>
