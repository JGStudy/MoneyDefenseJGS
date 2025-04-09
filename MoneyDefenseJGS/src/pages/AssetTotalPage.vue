<!-- 자산 조회 페이지 -->
<template>
  <div class="p-4 space-y-6">
    <!-- 자산/예산 탭 전환: 현재 자산 탭 활성화-->
    <TabSwitch active-tab="asset" />

    <!-- 총 자산 정보 보여주는 컴포넌트 -->
    <!-- 계산된 총 자산, 마지막 수정일 -->
    <AssetDisplay :total-asset="calculatedTotalAsset" :last-modified="assetStore.lastModified" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 자산 상태 가져오기
import { useAssetStore } from '@/stores/assetStore'

// 거래 내역 상태 가져오기
import { useTransactionStore } from '@/stores/transactionStore'

// 컴포넌트 임포트
import TabSwitch from '@/components/common/TabSwitch.vue'
import AssetDisplay from '@/components/assetTotal/AssetDisplay.vue'

// Pinia 스토어 인스턴스
const assetStore = useAssetStore()
const transactionStore = useTransactionStore()

// 자산 입력 시점 이후의 수입만 합산
// 거래 내역 중에서 수입 타입이면서,
// 자산이 마지막으로 수정된 날짜 이후의 거래만 포함
const totalIncome = computed(() => {
  return transactionStore.transactions
    .filter((t) => t.type === 'income' && new Date(t.date) >= new Date(assetStore.lastModified))
    .reduce((sum, t) => sum + t.amount, 0)
})

// 자산 입력 시점 이후의 지출만 합산
// 거래 내역 중에서 지출 타입이면서,
// 자산이 마지막으로 수정된 날짜 이후의 거래만 포함
const totalExpense = computed(() => {
  return transactionStore.transactions
    .filter((t) => t.type === 'expense' && new Date(t.date) >= new Date(assetStore.lastModified))
    .reduce((sum, t) => sum + t.amount, 0)
})

// 총 자산 계산 = 입력 자산 + (입력 이후 수입 - 지출)
const calculatedTotalAsset = computed(() => {
  return assetStore.totalAsset + totalIncome.value - totalExpense.value
})
</script>
