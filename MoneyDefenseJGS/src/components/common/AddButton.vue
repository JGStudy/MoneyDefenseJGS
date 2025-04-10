<template>
  <button
    class="fixed bottom-[108px] right-[20px] w-12 h-12 rounded-full bg-kb-ui-03 shadow-card flex items-center justify-center z-[60]"
    @click="$emit('click')"
  >
    <svg class="w-6 h-6 stroke-kb-ui-11" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
</template>

<script setup>
const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>
