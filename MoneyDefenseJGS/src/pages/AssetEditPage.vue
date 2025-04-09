<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AmountEditForm from '@/components/common/AmountEditForm.vue'

// 자산 데이터 가져오기
const assetItem = assetData.asset[0]
const totalAsset = ref(assetItem?.totalAsset ?? 0)
const lastModified = ref(assetItem?.lastModified ?? '')

const saved = ref(false)

const handleSave = (newAmount) => {
  totalAsset.value = newAmount
  lastModified.value = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  saved.value = true
  console.log(`저장된 총 자산: ₩${newAmount.toLocaleString()}`)
}

const handleCancel = () => {
  totalAsset.value = assetItem?.totalAsset ?? 0
  saved.value = false
}
</script>

<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold text-center mb-4">총 자산 수정</h1>

    <AmountEditForm
      label="자산"
      :initialAmount="totalAsset"
      @save="handleSave"
      @cancel="handleCancel"
    />

    <p v-if="saved" class="text-green-600 text-center mt-4">
      자산이 성공적으로 저장되었습니다: ₩{{ totalAsset.toLocaleString() }}<br />
      마지막 수정일: {{ lastModified }}
    </p>
  </div>
</template>
