<template>
  <div
    class="bg-white dark:bg-kb-dark-bg text-kb-ui-02 dark:text-kb-dark-text min-h-screen flex flex-col"
  >
    <!-- 토글 스위치시 다크모드로 변경 할 수 있게 클래스 삽입 -->
    <Header
      :title="title"
      :titleCustomClass="titleCustomClass"
      :close="close"
      :popupMessage="popupMessage"
    />
    <div class="pt-[98px] pb-[80px] relative">
      <slot></slot>
      <!-- <router-view /> -->
    </div>
    <!--AddButton : BottomBar보다 20px 상단에 위치-->
    <AddButton />
    <BottomBar v-if="isTabMenu" />
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Header from '@/components/common/RealHeader.vue'
import BottomBar from '@/components/common/BottomNavBar.vue'
import AddButton from '@/components/common/AddButton.vue'

const route = useRoute()
const tabMenuRoutes = ['/', '/transaction', '/transaction/calendar', '/asset', '/report']
const isTabMenu = computed(() => tabMenuRoutes.includes(route.path))

// Props
// default 처리 시 [props함수명]=""으로 작성해 주세요.
const props = defineProps({
  titleCustomClass: String, // Menu 이외의 title은 font-light text-body01 로 변경해 주세요.
  title: String,
  close: String,
  popupMessage: String, // 팝업을 띄우지 않는 경우도 popupMessage=""로 작성해 주세요.
})
</script>
