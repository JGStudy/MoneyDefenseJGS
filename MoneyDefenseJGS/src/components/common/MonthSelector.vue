<!-- components/common/MonthSelector.vue -->
<template>
  <div class="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-xl">
    <button @click="prevMonth" class="text-sm text-gray-600">&lt;</button>
    <span class="font-semibold text-lg">{{ currentMonth }}월</span>
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

// modelValue로부터 currentMonth 세팅
onMounted(() => {
  const month = parseInt(props.modelValue.split('-')[1])
  if (!isNaN(month)) currentMonth.value = month
})

// currentMonth 바뀌면 modelValue도 같이 emit
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
