<script setup>
import { getMoney } from '@/api/reportApi'
import { onMounted, ref, watch } from 'vue'
import { updateNetAssets } from '@/api/reportApi.js'

// Basebox
import BaseBox from '../common/BaseBox.vue'

const currentMonth = ref(new Date().getMonth() + 1)
const allData = ref([])
const totalIncome = ref(0)
const totalExpense = ref(0)

const loadCurrentMonthData = () => {
  const currentData = allData.value.find(
    (item) => item.month === `2025-${String(currentMonth.value).padStart(2, '0')}`,
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
  <div class="TotalMoney space-y-2 font-sans">
    <div class="flex items-center space-x-2 py-2">
      <button @click="prevMonth"><i class="xi-angle-left xi-2x translate-y-[1px]"></i></button>
      <p class="text-title03 font-bold">{{ currentMonth }}월</p>
      <button @click="nextMonth"><i class="xi-angle-right xi-2x translate-y-[1px]"></i></button>
    </div>
    <!-- 총 수입 & 총 지출 -->

    <div class="font-sans flex space-x-2 w-full">
      <BaseBox>
        <p class="text-body02 font-bold mb-1">총 수입</p>
        <p class="text-status-error-input text-number-md font-bold">
          {{ totalIncome.toLocaleString() }} 원
        </p>
      </BaseBox>
      <BaseBox>
        <p class="text-body02 font-bold mb-1">총 지출</p>
        <p class="text-status-positive text-number-md font-bold">
          {{ totalExpense.toLocaleString() }} 원
        </p>
      </BaseBox>
    </div>

    <BaseBox>
      <div class="flex justify-between items-center">
        <p class="text-kb-ui-02 text-title-0 font-bold mb-1">순 자산</p>
        <p class="text-kb-yellow-native text-number-lg font-bold font-nums">
          {{ calculateNetAssets().toLocaleString() }} 원
        </p>
      </div>
    </BaseBox>
  </div>
</template>

<style scoped>
.TotalMoney {
  font-weight: bold;
}
</style>
