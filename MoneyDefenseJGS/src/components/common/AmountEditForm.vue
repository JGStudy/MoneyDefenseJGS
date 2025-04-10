<!-- 공통 금액 입력 폼 컴포넌트 -->
<template>
  <div class="max-w-md mx-auto bg-gray-100 p-6 rounded-lg text-center space-y-4">
    <h2 class="text-lg">{{ label }}을 입력해주세요.</h2>

    <input
      v-model.number="amount"
      type="number"
      min="0"
      class="w-full text-center text-2xl font-bold p-2 bg-white rounded"
    />
    <p class="text-red-500" v-if="amount < 0">0 이상의 값을 입력해주세요.</p>

    <div class="flex justify-center gap-4">
      <button @click="save" :disabled="amount < 0" class="bg-gray-300 px-4 py-2 rounded">
        저장
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  label: String, // '자산' 또는 '예산'
  initialAmount: Number, // 초기값
})
const emit = defineEmits(['save', 'cancel'])

const amount = ref(props.initialAmount || 0)

watch(
  () => props.initialAmount,
  (val) => {
    amount.value = val
  },
)

const save = () => {
  if (amount.value >= 0) {
    emit('save', amount.value)
  }
}
</script>
