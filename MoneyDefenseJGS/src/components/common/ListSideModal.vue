<template>
  <div>
    <!-- 리스트 항목 -->
    <div
      @click="isOpen = true"
      class="flex justify-between items-center p-4 border-b cursor-pointer"
    >
      <div>{{ label }}</div>
      <slot name="action" />
    </div>

    <!-- 리스트 전용 모달 -->
    <SideModal v-if="isOpen" @close="closeModal">
      <slot name="modalContent" />
    </SideModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SideModal from '@/components/common/SideModal.vue'

defineProps({ label: String })

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
</script>
