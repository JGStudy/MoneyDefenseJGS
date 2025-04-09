<template>
  <div
    class="w-full rounded-md border-kb-ui-08 bg-white shadow-card p-[20px] gap-[13px] mt-5 mb-5"
    :class="customClass"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: '',
  },
})
</script>
