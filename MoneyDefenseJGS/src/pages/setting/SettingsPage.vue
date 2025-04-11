<template>
  <RealHeader title="설정" />
  <div class="min-h-screen pt-24 px-6 pb-10 font-sans bg-white">
    <section class="mb-10">
      <p class="font-bold text-title02 mb-5">
        <span class="text-kb-yellow-positive">{{ userStore.user?.name || '사용자' }}</span
        >님, 안녕하세요!
      </p>
    </section>

    <!-- 설정 리스트 -->
    <section class="mb-12">
      <ul class="space-y-3">
        <ListItem title="사용자 정보" @click="goToUserEdit" />
        <ListItem title="데이터 내보내기" @click="openModal('export')" />
        <ListItem title="데이터 초기화" @click="openModal('reset')" />
      </ul>
    </section>

    <!-- 다크모드 토글 -->
    <!-- <section class="mt-12">
      <h2 class="text-title03 font-semibold mb-4">테마</h2>
      <ToggleSwitchTheme />
    </section> -->

    <!-- 슬라이드 모달 -->
    <transition name="slide">
      <SideModal v-if="activeModal" :type="activeModal" @close="closeModal" />
    </transition>

    <!-- 푸터 -->
    <RealFooter class="mt-20" />
    <BottomNavBar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RealHeader from '@/components/common/RealHeader.vue'
import RealFooter from '@/components/setting/RealFooter.vue'
import ListItem from '@/components/setting/ListItem.vue'
import SideModal from '@/components/setting/SideModal.vue'
// import ToggleSwitchTheme from '@/components/setting/ToggleSwitchTheme.vue'
import { useUserStore } from '@/stores/userStore'
import BottomNavBar from '@/components/common/BottomNavBar.vue'

const router = useRouter()
const activeModal = ref(null)
const userStore = useUserStore()

const goToUserEdit = () => router.push({ name: 'user-edit' })
const openModal = (type) => (activeModal.value = type)
const closeModal = () => (activeModal.value = null)
</script>
