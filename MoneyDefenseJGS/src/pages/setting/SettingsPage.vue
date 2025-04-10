<template>
  <AppLayout>
    <div
      class="min-h-screen px-6 py-8 bg-white dark:bg-kb-dark-line text-kb-ui-02 dark:text-kb-dark-text"
    >
      <div class="px-6 py-8">
        <!-- 프로필 섹션 -->
        <section class="mb-10">
          <h2 class="text-title03 font-semibold mb-6">프로필</h2>
          <p class="text-body02 font-medium">안녕하세요,</p>
          <p class="text-body02 font-semibold flex items-center gap-1">진기스님 <span>👋</span></p>
        </section>

        <!-- 설정 메뉴 -->
        <section class="mb-10">
          <h2 class="text-title03 font-semibold mb-6 text-kb-ui-02 dark:text-kb-dark-text">설정</h2>
          <ul class="space-y-3">
            <ListItem title="사용자 정보" @click="goToUserEdit" />
            <ListItem title="데이터 내보내기" @click="openModal('export')" />
            <ListItem title="데이터 초기화" @click="openModal('reset')" />
          </ul>
        </section>

        <!-- 다크모드 토글 -->
        <section class="mb-10">
          <ToggleSwitchTheme />
        </section>

        <!-- 슬라이드 모달 -->
        <transition name="slide">
          <SideModal v-if="activeModal" :type="activeModal" @close="closeModal" />
        </transition>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/pages/layout/AppLayoutPage.vue'
import ListItem from '@/components/setting/ListItem.vue'
import SideModal from '@/components/setting/SideModal.vue'
import ToggleSwitchTheme from '@/components/setting/ToggleSwitchTheme.vue'

const router = useRouter()
const activeModal = ref(null)

const goToUserEdit = () => router.push({ name: 'user-edit' })
const openModal = (type) => (activeModal.value = type)
const closeModal = () => (activeModal.value = null)
</script>
