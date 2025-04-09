<template>
  <div class="min-h-screen bg-kb-ui-10 text-kb-ui-02 flex flex-col p-6 gap-6">
    <!-- 상단 제목 + 설정 버튼 -->
    <div class="flex justify-between items-center">
      <h1 class="text-title02 font-bold">프로필</h1>
      <button class="bg-kb-ui-08 text-kb-ui-01 text-sm rounded-full px-3 py-1">설정</button>
    </div>
    <!-- 사용자 카드 -->
    <UserInfoCard />
    <!-- 설정 제목 -->
    <h2 class="text-title03 font-bold border-b border-kb-ui-08 pb-2">설정</h2>
    <!-- 설정 항목 리스트 -->
    <!-- 사용자 정보 -->
    <ListSideModal label="사용자 정보" @click="$router.push('/user-edit')">
      <template #action> 화살표 icon 들어갈자리 </template>
    </ListSideModal>
    <!-- 테마 -->
    <div>
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">테마</span>
      <ThemeToggle />
    </div>
    <ListSideModal label="데이터 내보내기">
      <template #action> 화살표 icon 들어갈자리 </template>
      <template #modalContent> 데이터를 저장하시겠습니까? </template>
    </ListSideModal>
    <ListSideModal label="데이터 초기화" @click="$emit('open-modal', 'reset')">
      <template #action> 화살표 icon 들어갈자리 </template>
      <template #modalContent>데이터를 초기화 하시겠습니까?</template>
    </ListSideModal>
    <!-- 푸터 -->
    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import UserInfoCard from '@/components/UserInfoCard.vue'
import ListSideModal from '@/components/common/ListSideModal.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import SideModal from '@/components/common/SideModal.vue'
// import Footer from '@/components/Footer.vue'
</script>
