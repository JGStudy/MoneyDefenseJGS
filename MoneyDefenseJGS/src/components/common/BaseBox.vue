<template>
  <!-- 
    w-[343px] => width: 343px
    rounded-md => border-radius: 8px
    border border-kbUi08 => border: 1px solid #DDE1E4
    bg-white => background: #FFFFFF
    shadow-md => box-shadow: 0px 4px 6px 0px #00000012
    p-[20px] => padding: 20px 
    gap-[13px] => gap: 13px 
  -->
  <div
    class="w-[343px] rounded-md border border-kbUi08 bg-white shadow-md p-[20px] gap-[13px]"
    :class="customClass"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: '',
  },
})
</script>
