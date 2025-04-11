<template>
  <button
    :disabled="disabled"
    :class="[
      'w-full h-[60px] rounded-[10px] font-bold font-sans text-title03 transition-colors flex justify-center items-center',
      disabled
        ? 'bg-kb-ui-08 text-kb-ui-06 cursor-not-allowed'
        : 'bg-kb-yellow-positive text-kb-ui-02',
      customClass,
    ]"
  >
    {{ label }}
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
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
