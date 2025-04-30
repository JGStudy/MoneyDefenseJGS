<template>
  <div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
    <div
      class="h-full transition-all duration-300"
      :style="{ width: percentage + '%', backgroundColor: '#a48a79' }"
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
