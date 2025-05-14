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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RealHeader from '@/components/layout/RealHeader.vue'
import RealFooter from '@/components/setting/RealFooter.vue'
import ListItem from '@/components/setting/ListItem.vue'
import SideModal from '@/components/setting/SideModal.vue'
import { getAllUsers } from '@/api/userApi.js'

const router = useRouter()
const activeModal = ref(null)
const userName = ref('사용자')

// localStorage에서 userId를 우선 가져오고, 없으면 db에서 검색
const getUserId = async () => {
  let userId = localStorage.getItem('userId')
  if (userId) return userId
  // localStorage에 없으면 db에서 가장 마지막 사용자 userId를 사용
  try {
    const { data } = await getAllUsers()
    if (data && data.length > 0) {
      return data[data.length - 1].userId
    }
  } catch (e) {
    // 무시
  }
  return null
}

onMounted(async () => {
  const userId = await getUserId()
  if (userId) {
    try {
      const { data } = await getAllUsers()
      const user = data.find((u) => u.userId === userId)
      if (user) {
        userName.value = user.name
      } else {
        userName.value = '사용자'
      }
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error)
    }
  }
})

const goToUserEdit = () => router.push({ name: 'user-edit' })
const openModal = (type) => (activeModal.value = type)
const closeModal = () => (activeModal.value = null)
</script>
