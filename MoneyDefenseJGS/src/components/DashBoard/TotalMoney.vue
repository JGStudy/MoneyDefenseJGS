<script setup>
import { getMoney } from '@/api/report'
import { onMounted, ref, watch } from 'vue'
import { updateNetAssets } from '@/api/report.js'

// Basebox
import BaseBox from '../common/BaseBox.vue'

const currentMonth = ref(new Date().getMonth() + 1)
const allData = ref([])
const totalIncome = ref(0)
const totalExpense = ref(0)

const loadCurrentMonthData = () => {
  const currentData = allData.value.find(
    (item) => item.month === `2025-${String(currentMonth.value).padStart(2, '0')}`
  )
  if (currentData) {
    totalIncome.value = currentData.totalIncome
    totalExpense.value = currentData.totalExpense
  } else {
    totalIncome.value = 0
    totalExpense.value = 0
  }
}

// 월 바뀔 때마다 자동 갱신
watch(currentMonth, () => {
  loadCurrentMonthData()
})

const prevMonth = () => {
  if (currentMonth.value > 1) {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value < 12) {
    currentMonth.value++
  }
}

// 순자산 계산 함수
const calculateNetAssets = () => {
  let netAssets = 0
  const sorted = [...allData.value].sort((a, b) => a.month.localeCompare(b.month))
  for (const data of sorted) {
    const month = Number(data.month.split('-')[1])
    if (month > currentMonth.value) break
    netAssets += (data.totalIncome || 0) - (data.totalExpense || 0)
  }
  return netAssets
}

// 월별 데이터 불러오기 및 순자산 업데이트
onMounted(async () => {
  try {
    const response = await getMoney()
    allData.value = response.data
    loadCurrentMonthData()

    const netAssets = calculateNetAssets()
    const currentMonthStr = `2025-${String(currentMonth.value).padStart(2, '0')}`
    await updateNetAssets(currentMonthStr, netAssets)
    console.log('✅ 순자산 업데이트 완료:', netAssets)
  } catch (error) {
    console.error('월별 데이터 불러오기 실패:', error)
  }
})

</script>

<template>
  <!-- 월 선택 -->
<div class="TotalMoney space-y-2">

    <div class="flex items-center space-x-2  bg-yellow-100 px-4 py-2 shadow">
    <button @click="prevMonth" class="text-xl">＜</button>
    <p class="text-lg font-bold">{{ currentMonth }}월</p>
    <button @click="nextMonth" class="text-xl">＞</button>
    </div>
  <!-- 총 수입 & 총 지출 -->
  
  <div class="flex space-x-2 w-full">
    <BaseBox>
    <div class="p-4">
      <p class= "text-base font-semibold mb-1">총 수입</p>
      <p class="text-[#F23F3F] text-base font-bold">{{ totalIncome.toLocaleString() }} 원</p>
    </div>
  </BaseBox>
  <BaseBox>
    <div class="p-4 ">
      <p class="text-base font-semibold mb-1">총 지출</p>
      <p class="text-[#287EFF] text-base font-bold">{{ totalExpense.toLocaleString() }} 원</p>
    </div>
  </BaseBox>
  </div>

<BaseBox>
  <div class="p-4">
    <div class="flex justify-between items-center">
      <p class="text-[#26282C] text-lg font-semibold mb-1">순 자산</p>
      <p class="text-[#FFCC00] text-lg font-bold">{{ calculateNetAssets().toLocaleString() }} 원</p>
    </div>
  </div>
</BaseBox>
</div>

</template>

<style scoped>
  .TotalMoney {
    font-weight: bold;
  }
</style>