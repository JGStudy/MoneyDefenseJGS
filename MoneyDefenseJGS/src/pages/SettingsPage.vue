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
    <div class="flex flex-col gap-3">
      <SettingListItem label="사용자 정보" @click="$router.push('/user-edit')">
        <template #action>
          <div class="w-10 h-5 bg-kb-ui-06 rounded-full" />
        </template>
      </SettingListItem>

      <SettingListItem label="테마" @click="$emit('open-modal', 'theme')">
        <template #action>
          <ThemeToggle :model-value="true" />
        </template>
      </SettingListItem>

      <SettingListItem label="데이터 내보내기" @click="$emit('open-modal', 'export')">
        <template #action>
          <div class="w-10 h-5 bg-kb-ui-06 rounded-full" />
        </template>
      </SettingListItem>

      <SettingListItem label="데이터 초기화" @click="$emit('open-modal', 'reset')">
        <template #action>
          <div class="w-10 h-5 bg-kb-ui-06 rounded-full" />
        </template>
      </SettingListItem>
    </div>

    <!-- 푸터 -->
    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import UserInfoCard from '@/components/UserInfoCard.vue'
import SettingListItem from '@/components/common/SettingListItem.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
// import Footer from '@/components/Footer.vue'
</script>
