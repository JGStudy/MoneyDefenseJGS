<template>
  <div class="fixed inset-0 z-50 flex">
    <!-- 어두운 배경 -->
    <div class="flex-1 bg-black/40" @click="$emit('close')" />

    <!-- 슬라이드 모달 -->
    <div
      class="w-[90%] max-w-md h-full bg-white dark:bg-kbUi02 shadow-xl overflow-auto transition-all duration-300 ease-in-out"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
// 필요한 props, emits 등은 아래처럼 추가 가능
defineEmits(['close'])
</script>
