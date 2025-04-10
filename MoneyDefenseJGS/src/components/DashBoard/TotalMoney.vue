<script setup>
import {onMounted, ref} from 'vue'
const currentMonth = ref(new Date().getMonth()+1)
  

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

const totalIncome = ref(0)
const totalExpense =ref(0)

onMounted(async()=>{
  const res=await fetch('/db/Dashboard.json')
  const data= await res.json()

})

</script>

<template>
  <!-- 월 선택 -->
<div class="TotalMoney space-y-2">
    <div class="flex items-center space-x-2">
    <button @click="prevMonth" class="text-xl">＜</button>
    <p class="text-lg font-bold">{{ currentMonth }}월</p>
    <button @click="nextMonth" class="text-xl">＞</button>
    </div>
  <!-- 총 수입 & 총 지출 -->
  <div class="flex space-x-2 w-full">
    <div class="flex-1 bg-[#fefcbf] rounded-2xl p-4 shadow">
      <p class="text-sm font-semibold mb-1">총 수입</p>
      <p class="text-xl font-bold">{{ totalIncome.toLocaleString() }} 원</p>
    </div>
    <div class="flex-1 bg-[#fefcbf] rounded-2xl p-4 shadow">
      <p class="text-sm font-semibold mb-1">총 지출</p>
      <p class="text-xl font-bold">{{ totalExpense.toLocaleString() }} 원</p>
    </div>
  </div>
  <div class="bg-[#fefcbf] rounded-2xl p-4 shadow">
    <div class="flex justify-between items-center">
      <p class="text-sm font-semibold mb-1">순 수익</p>
      <p class="text-xl font-bold">{{ (totalIncome-totalExpense) }} 원</p>
    </div>
  </div>
</div>
</template>

<style scoped>
  .TotalMoney {
    font-weight: bold;
  }
</style>