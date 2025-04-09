<template>
  <!-- 
    inline-flex => display: inline-flex
    items-center => align-items: center
    justify-center => justify-content: center
    px-3 => padding-left/right: 12px
    h-[40px] => height: 40px
    min-w-[90px] => 최소 너비 90px
    bg-kb-ui-09 => background-color: #EBEEF0
    rounded-[2px] => border-radius: 2px
    text-kb-ui-02 => color: #26282C
    text-[15px] => font-size: 15px
    leading-[23px] => line-height: 23px
    tracking-[-0.02em] => letter-spacing: -0.02em
    text-center => text-align: center
    font-light => font-weight: 300
    font-pretendard => font-family: 'Pretendard'
  -->
  <!-- 버튼 내 작성된 텍스트 길이에 따라 너비가 조절되며, 최소 너비는 90px입니다 -->
  <div
    class="inline-flex items-center justify-center px-3 h-[40px] min-w-[90px] bg-kb-ui-09 rounded-[2px] text-kb-ui-02 text-[15px] leading-[23px] tracking-[-0.02em] text-center font-light font-pretendard"
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
