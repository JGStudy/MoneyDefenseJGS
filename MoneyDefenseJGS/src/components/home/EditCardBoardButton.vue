<template>
  <div class="absolute left-1/2 transform -translate-x-1/2 h-[44px] p-0">
    <!-- 회색 테두리 둥근 버튼 -->
    <button
      type="button"
      class="flex items-center px-9 py-[10px] h-[44px] border border-kb-ui-06 rounded-full mb-8"
    >
      <div class="flex items-center gap-1">
        <!-- Icon -->
        <div class="w-6 h-6 flex justify-center items-center">
          <i :class="customClass"></i>
        </div>
        <!-- Edit -->
        <span class="text-body02 font-light font-sans"> {{ editContent }} </span>
      </div>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  customClass: {
    type: String,
    default: '',
  },
  editContent: {
    type: String,
    default: '편집하기',
  },
})
</script>
