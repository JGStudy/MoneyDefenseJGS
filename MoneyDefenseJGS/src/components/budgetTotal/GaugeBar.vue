<template>
  <div class="w-full h-4 bg-gray-200 rounded overflow-hidden">
    <div
      class="h-full bg-green-500 transition-all duration-300"
      :style="{ width: percentage + '%' }"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
})
</script>
