<template>
  <div
    v-if="visible"
    :class="[
      'fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-white text-body03 z-50 shadow-list',
      colorClass,
      'dark:bg-kb-dark-card',
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const colorClass = ref('bg-status-positive')

function show(msg, type = 'success') {
  message.value = msg
  colorClass.value =
    {
      success: 'bg-status-positive',
      error: 'bg-status-error',
      warning: 'bg-status-caution',
    }[type] || 'bg-status-positive'

  visible.value = true
  setTimeout(() => (visible.value = false), 2500)
}

defineExpose({ show })
</script>
