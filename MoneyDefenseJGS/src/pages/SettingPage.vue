<template>
  <div class="flex flex-col gap-3">
    <!-- 사용자 정보 -->
    <SettingListItem label="사용자 정보" @click="$emit('open-modal', 'userInfo')" />

    <!-- 테마 설정 -->
    <SettingListItem label="테마" @click="$emit('open-modal', 'theme')">
      <template #action>
        <ThemeToggle />
      </template>
    </SettingListItem>

    <!-- 데이터 내보내기 -->
    <SettingListItem label="데이터 내보내기" @click="$emit('open-modal', 'export')" />

    <!-- 데이터 초기화 -->
    <SettingListItem label="데이터 초기화" @click="$emit('open-modal', 'reset')" />
  </div>
</template>

<script setup>
import SettingListItem from '@/components/common/SettingListItem.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

defineEmits(['open-modal'])
</script>
"""
