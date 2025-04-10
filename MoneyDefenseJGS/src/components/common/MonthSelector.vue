<template>
  <div class="flex items-center space-x-1 px-4 py-2">
    <!-- 이전 월 버튼 -->
    <button @click="prevMonth" class="text-sm text-gray-600">&lt;</button>

    <!-- 현재 월 -->
    <span class="text-lg font-semibold text-gray-900"> {{ currentMonth }}월 </span>

    <!-- 다음 월 버튼 -->
    <button @click="nextMonth" class="text-sm text-gray-600">&gt;</button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const currentMonth = ref(new Date().getMonth() + 1)

onMounted(() => {
  const month = parseInt(props.modelValue.split('-')[1])
  if (!isNaN(month)) currentMonth.value = month
})

watch(currentMonth, () => {
  const year = new Date().getFullYear()
  emit('update:modelValue', `${year}-${String(currentMonth.value).padStart(2, '0')}`)
})

const prevMonth = () => {
  if (currentMonth.value > 1) currentMonth.value--
}

const nextMonth = () => {
  if (currentMonth.value < 12) currentMonth.value++
}
</script>
