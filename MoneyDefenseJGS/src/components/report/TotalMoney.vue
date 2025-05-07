<script setup>
import { getMoney } from '@/api/reportApi'
import { onMounted, ref, watch } from 'vue'

// Basebox
import BaseBox from '../common/BaseBox.vue'

// MonthSelector
import MonthSelector from '@/components/common/MonthSelector.vue'

// 현재 월 설정
const today = new Date()
const selectedMonth = ref(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`)
const currentMonth = ref(today.getMonth() + 1)

// 총 수입 지출
const totalIncome = ref(0)
const totalExpense = ref(0)
const allData = ref([])

// 데이터 로딩
const loadCurrentMonthData = async () => {
  try {
    // db.json의 Transaction 데이터 로드
    const response = await fetch('/db/db.json');
    const dbData = await response.json();

    const currentMonth = selectedMonth.value;  // 예: '2025-05'
    totalIncome.value = 0;
    totalExpense.value = 0;

    // 해당 월의 모든 트랜잭션을 필터링하여 수입과 지출을 합산
    dbData.Transaction.forEach(transaction => {
      if (transaction.date.startsWith(currentMonth)) {  // 월이 동일한 트랜잭션만 필터링
        if (transaction.type === '수입') {
          totalIncome.value += transaction.amount;
        } else if (transaction.type === '지출') {
          totalExpense.value += transaction.amount;
        }
      }
    });

    // totalIncome, totalExpense 업데이트
    const currentData = {
      month: currentMonth,
      totalIncome:totalIncome.value,
      totalExpense:totalExpense.value,
    };

    // 모든 데이터에서 해당 월을 찾거나, 없으면 새로 추가
    const idx = allData.value.findIndex(d => d.month === currentMonth);
    if (idx !== -1) {
      allData.value[idx] = currentData;  // 기존 데이터 업데이트
    } else {
      allData.value.push(currentData);  // 새 데이터 추가
    }

    // 결과 출력 (필요에 따라)
    console.log(`수입: ${totalIncome}원`);
    console.log(`지출: ${totalExpense}원`);

  } catch (err) {
    console.error('데이터 불러오기 실패:', err);
  }
};

// 순자산 계산 함수
const calculateNetAssets = () => {
  let netAssets = 0;
  const selected = selectedMonth.value; // 예: "2025-02"

  // 누적 수입-지출 계산 (선택된 월까지)
  const sorted = [...allData.value].sort((a, b) => a.month.localeCompare(b.month));
  for (const data of sorted) {
    if (data.month > selected) break; // 선택된 월까지만 계산
    netAssets += (data.totalIncome || 0) - (data.totalExpense || 0);
  }

  return netAssets;
};

watch(selectedMonth, async () => {
  await loadCurrentMonthData()
})

onMounted(async () => {
  await loadCurrentMonthData()
})
</script>

<style scoped>
.TotalMoney {
  font-weight: bold;
}
</style>

<template>
  <!-- 월 선택 -->
  <div>
    <MonthSelector v-model="selectedMonth" />

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

    <!-- 순자산 -->
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