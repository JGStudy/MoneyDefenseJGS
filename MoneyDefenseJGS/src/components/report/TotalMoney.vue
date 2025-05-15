<script setup>
import { onMounted, ref, watch } from 'vue'

// BaseBox & MonthSelector
import BaseBox from '../common/BaseBox.vue'
import MonthSelector from '@/components/common/MonthSelector.vue'

// 현재 월 설정
const today = new Date()
const selectedMonth = ref(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`)

// 총 수입 지출
const totalIncome = ref(0)
const totalExpense = ref(0)
const allData = ref([])

// 순자산 계산
const calculateNetAssets = () => {
  return totalIncome.value - totalExpense.value
}

// userId ref 생성
const userId = ref(null)

// userId가 없으면 localStorage에서 가져와 설정
watch(
  userId,
  async (newUserId) => {
    const storedUserId = localStorage.getItem('userId')
    const idToUse = newUserId || storedUserId

    if (idToUse) {
      userId.value = idToUse
    }
  },
  { immediate: true }
)

// 데이터 로딩 함수
const loadCurrentMonthData = () => {
  try {
    totalIncome.value = 0
    totalExpense.value = 0

    // localStorage에서 데이터 불러오기
    const storedData = localStorage.getItem('db.json') // db.json 파일을 가져옴
    if (storedData) {
      const dbData = JSON.parse(storedData)
      console.log('로컬스토리지에서 불러온 데이터:', dbData) // 디버깅

      // dbData.Transaction이 배열인지 확인
      if (dbData && Array.isArray(dbData.Transaction)) {
        dbData.Transaction.forEach(transaction => {
          // 날짜 형식이 'YYYY-MM' 형식인지 확인 후 필터링
          if (transaction.date.startsWith(selectedMonth.value)) {
            if (transaction.type === '수입') {
              totalIncome.value += transaction.amount
            } else if (transaction.type === '지출') {
              totalExpense.value += transaction.amount
            }
          }
        })

        const currentData = {
          month: selectedMonth.value,
          totalIncome: totalIncome.value,
          totalExpense: totalExpense.value,
        }

        const idx = allData.value.findIndex(d => d.month === selectedMonth.value)
        if (idx !== -1) {
          allData.value[idx] = currentData
        } else {
          allData.value.push(currentData)
        }

        console.log(`수입: ${totalIncome.value}원`)
        console.log(`지출: ${totalExpense.value}원`)
      } else {
        console.error('Transaction 배열이 없거나 잘못된 형식입니다.')
      }
    } else {
      console.error('localStorage에 저장된 db.json 데이터가 없습니다.')
    }
  } catch (err) {
    console.error('데이터 불러오기 실패:', err)
  }
}

// 로딩 트리거
onMounted(loadCurrentMonthData)
watch(selectedMonth, loadCurrentMonthData)
</script>

<template>
  <div>
    <!-- 월 선택 -->
    <MonthSelector v-model="selectedMonth" />

    <!-- 총 수입 & 지출 -->
    <div class="font-sans flex space-x-2 w-full">
      <BaseBox>
        <p class="text-body02 font-bold mb-1">총 수입</p>
        <p class="text-status-error-input text-number-md font-bold">
          {{ Number(totalIncome).toLocaleString() }} 원
        </p>
      </BaseBox>
      <BaseBox>
        <p class="text-body02 font-bold mb-1">총 지출</p>
        <p class="text-status-positive text-number-md font-bold">
          {{ Number(totalExpense).toLocaleString() }} 원
        </p>
      </BaseBox>
    </div>

    <!-- 순자산 -->
    <BaseBox>
      <div class="flex justify-between items-center">
        <p class="text-kb-ui-02 text-title-0 font-bold mb-1">순 자산</p>
        <p class="text-kb-yellow-native text-number-lg font-bold font-nums">
          {{ Number(calculateNetAssets()).toLocaleString() }} 원
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
