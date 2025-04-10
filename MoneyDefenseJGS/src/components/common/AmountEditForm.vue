<!-- 공통 금액 입력 폼 컴포넌트 -->
<template>
  <BaseBox>
    <h2 class="text-body02 text-kb-ui-04 font-sans">{{ label }}을 입력해 주세요.</h2>
    <div class="flex items-center justify-between">
      <input
        v-model.number="amount"
        type="number"
        min="0"
        class="text-kb-ui-02 mt-2 w-full text-center text-number-lg font-bold font-nums p-2 bg-white rounded"
      />
      <span class="font-sans text-body01 font-bold text-kb-ui-02">원</span>
    </div>
    <p class="text-red-500" v-if="amount < 0">0 이상의 값을 입력해주세요.</p>
    <div class="mt-5">
      <button
        @click="save"
        :disabled="amount < 0"
        class="bg-kb-gray-alt text-kb-ui-11 px-4 py-2 rounded w-full"
      >
        저장
      </button>
    </div>
  </BaseBox>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseBox from './BaseBox.vue'
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
