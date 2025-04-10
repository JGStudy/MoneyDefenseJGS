<template>
  <header
    class="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[375px] h-[98px] bg-kb-ui-11 pt-[50px] px-6 flex items-center justify-between"
  >
    <!-- Left Fix -->
    <div class="flex items-center gap-1">
      <template v-if="isHome">
        <!-- Home 전용 -->
        <h1 class="w-6 h-6 bg-[#D9D9D9]">
          <!-- 클릭 시 자산 숨기기 기능 on(구현 예정)) -->
          <i>logo</i>
        </h1>
      </template>

      <!-- Home 이외 모든 페이지 -->
      <template v-else>
        <button
          v-if="!noNeedBack"
          type="button"
          @click="backspace"
          aria-label="뒤로가기"
          class="w-6 h-6 flex items-center justify-center"
        >
          <!-- 뒤로가기가 필요 없는 페이지는 알려주세요. -->
          <i class="xi-angle-left xi-2x"></i>
        </button>
        <span class="font-sans text-kb-ui-02" :class="titleCustomClass">
          {{ title }}
        </span>
      </template>
    </div>

    <!-- Right Fix -->
    <button
      v-if="!noNeedBack && !isSetting"
      type="button"
      @click="goSetting"
      aria-label="설정 이동"
      class="w-6 h-6 flex items-center justify-center"
    >
      <i class="xi-cog xi-2x"></i>
    </button>
    <button
      v-else-if="noNeedBack && !isSetting"
      type="button"
      @click="handleCloseClick"
      aria-label="취소"
    >
      <span class="font-sans font-light text-body02 text-kb-ui-04">{{ close }}</span>
    </button>
    <!-- 취소 버튼 클릭 시 visible -->
    <ConfirmPopup
      :visible="showConfirm"
      :message="popupMessage"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import ConfirmPopup from '@/components/popup/ConfirmPopup.vue'

const route = useRoute()
const router = useRouter()
// path 체크
const isHome = computed(() => route.path === '/')
const isSetting = computed(() => route.path === '/setting')

// 뒤로가기가 필요 없는 페이지인지 체크
const noNeedBackRoutes = ['/transaction/create', '/onboarding', '/asset/edit', '/budget/edit']
const noNeedBack = computed(() => noNeedBackRoutes.includes(route.path))
// 뒤로가기 이벤트
const backspace = () => {
  router.back()
}

// 설정 이동 이벤트
const goSetting = () => {
  router.push('/setting')
}

// ConfirmPopup 관련
const showConfirm = ref(false)
const handleCloseClick = () => {
  showConfirm.value = true
}
const handleConfirm = () => {
  showConfirm.value = false
  backspace()
}
const handleCancel = () => {
  showConfirm.value = false
}

// Props
defineProps({
  titleCustomClass: {
    type: String,
    default: 'font-bold text-title02',
  }, // Menu 이외의 title은 font-light text-body01 로 변경해 주세요.
  title: {
    type: String,
    default: '타이틀',
  },
  close: {
    type: String,
    default: '취소',
  },
  popupMessage: String,
})
</script>
