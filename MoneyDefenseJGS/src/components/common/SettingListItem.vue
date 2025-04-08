<template>
  <div
    class="flex justify-between items-center px-4 py-3 bg-kb-ui-10 hover:bg-kb-ui-09 text-kb-ui-02 rounded-xl cursor-pointer transition"
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
