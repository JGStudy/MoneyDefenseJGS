<template>
  <RealHeader title="설정" />
  <div class="min-h-screen pt-24 font-sans bg-white">
    <section class="my-10 mx-6">
      <p class="font-bold text-title02 mb-5">
        <span class="text-kb-yellow-positive">{{ userName }}</span
        >님, 안녕하세요!
      </p>
    </section>

    <!-- 설정 리스트 -->
    <section class="font-sans mb-12 mx-6">
      <ul class="space-y-3">
        <ListItem title="사용자 정보" @click="goToUserEdit" />
        <ListItem title="데이터 내보내기" @click="openModal('export')" />
        <ListItem title="데이터 초기화" @click="openModal('reset')" />
      </ul>
    </section>

    <!-- 슬라이드 모달 -->
    <transition name="slide">
      <SideModal v-if="activeModal" :type="activeModal" @close="closeModal" />
    </transition>

    <!-- 푸터 -->
    <RealFooter class="mt-20" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RealHeader from '@/components/layout/RealHeader.vue'
import RealFooter from '@/components/setting/RealFooter.vue'
import ListItem from '@/components/setting/ListItem.vue'
import SideModal from '@/components/setting/SideModal.vue'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

const router = useRouter()
const activeModal = ref(null)
const userStore = useUserStore()

// 쿠키에서 userId 가져오기
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const userId = getCookie('userId')

// 컴포넌트 마운트 시 사용자 정보 로드
onMounted(async () => {
  if (userId) {
    try {
      const { data } = await axios.get(`/api/Profile/${userId}`)
      userStore.setUser(data)
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error)
    }
  }
})

// Pinia에서 사용자 이름을 반응형으로 가져오기
const userName = computed(() => userStore.user?.name || '사용자')

// 사용자 정보 수정 페이지로 이동
const goToUserEdit = () => router.push({ name: 'user-edit' })

// 모달 열기/닫기
const openModal = (type) => (activeModal.value = type)
const closeModal = () => (activeModal.value = null)
</script>
