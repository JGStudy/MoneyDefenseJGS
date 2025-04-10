<template>
  <button
    :type="type"
    :class="['text-sm rounded-full px-3 py-1 transition-colors duration-200', baseStyle]"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  variant: {
    type: String,
    default: 'primary', // primary | secondary
  },
})

const baseStyle = computed(() => {
  return props.variant === 'primary'
    ? 'bg-kbUi08 dark:bg-kb-dark-line text-kbUi01 dark:text-kb-dark-text'
    : 'bg-kbUi09 dark:bg-kb-dark-muted text-kbUi02 dark:text-kb-dark-text'
})
</script>
