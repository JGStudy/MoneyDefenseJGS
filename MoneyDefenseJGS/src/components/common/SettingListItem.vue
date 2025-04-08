<template>
  <div
    class="flex justify-between items-center px-4 py-3 bg-kbUi10 hover:bg-kbUi09 text-kbUi02 rounded-xl cursor-pointer transition"
    @click="$emit('click')"
  >
    <span class="text-body02 font-medium">{{ label }}</span>
    <slot name="action" />
  </div>
</template>

<script setup>
defineProps({
  label: String,
})
defineEmits(['click'])
</script>
