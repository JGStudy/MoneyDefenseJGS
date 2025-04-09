<template>
  <div class="kb-modal-wrapper">
    <div class="kb-modal-overlay" @click="startClose" />
    <transition name="slide-fade">
      <div v-if="isVisible" class="kb-modal">
        <slot />
        <div class="kb-modal-footer">
          <button @click="startClose" class="kb-button-secondary">취소</button>
          <button @click="$emit('save')" class="kb-button-primary">저장</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const emit = defineEmits(['close', 'save'])
const isVisible = ref(false)

function startClose() {
  isVisible.value = false
}

function handleKeydown(e) {
  if (e.key === 'Escape') startClose()
}

onMounted(() => {
  nextTick(() => {
    isVisible.value = true
  })
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
