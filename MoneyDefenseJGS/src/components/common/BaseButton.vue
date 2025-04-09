<template>
  <button
    type="button"
    class="w-full h-[60px] bg-kb-yellow rounded-[10px] flex justify-center items-center overflow-hidden"
    :class="customClass"
  >
    <span class="text-title03 font-bold font-sans">
      {{ label }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '버튼',
  },
})
</script>
