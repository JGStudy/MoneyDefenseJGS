<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 bg-kb-ui-01/50 flex items-center justify-center font-sans"
  >
    <div class="w-[327px] bg-kb-ui-11 rounded-t-[2px] flex flex-col overflow-hidden">
      <!-- message -->
      <div class="px-6 pt-[30px] pb-[28px] flex flex-col gap-[19px]">
        <h2 class="text-title03 font-bold">알림</h2>
        <p class="text-body02 font-light text-kb-ui-03">
          {{ message }}
        </p>
      </div>

      <!-- button -->
      <div class="flex h-[52px]">
        <button
          class="w-[130px] bg-kb-ui-09 text-body02 font-bold text-center rounded-bl-[2px]"
          @click="$emit('cancel')"
        >
          {{ cancelText }}
        </button>
        <button
          class="flex-1 bg-[#373D5C] text-white text-body02 font-bold text-center rounded-br-[2px]"
          @click="$emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '너 삭제할 거야? 진짜?? 정말???',
  },
  cancelText: {
    type: String,
    default: '취소',
  },
  confirmText: {
    type: String,
    default: '확인',
  },
})

defineEmits(['confirm', 'cancel'])
</script>
