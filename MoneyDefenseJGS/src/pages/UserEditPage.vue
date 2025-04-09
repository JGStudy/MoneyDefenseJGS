<template>
  <div class="min-h-screen bg-kbUi10 text-kbUi02 p-6 flex flex-col">
    <!-- 상단 -->
    <button class="text-sm text-red-500 mb-4 self-start" @click="router.back()">🔙 뒤로가기</button>

    <h1 class="text-page-title font-bold mb-6">사용자 정보 수정</h1>

    <!-- 입력 항목 -->
    <div class="flex flex-col gap-4 flex-1">
      <InputItem label="닉네임" v-model="name" />
      <InputItem label="이메일" v-model="email" />
    </div>

    <!-- 버튼 -->
    <div class="flex gap-4 justify-center mt-6">
      <BaseButton class="bg-kbUi08 text-kbUi01 text-sm rounded-full px-3 py-1" @click="handleSave">
        저장
      </BaseButton>
      <BaseButton class="bg-kbUi09 text-kbUi02 text-sm rounded-full px-3 py-1" @click="router.back">
        취소
      </BaseButton>
    </div>

    <!-- 하단 푸터 -->
    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore'
import BaseButton from '@/components/common/BaseButton.vue'
// import InputItem from '@/components/InputItem.vue'
// import Footer from '@/components/Footer.vue'

const router = useRouter()
const profile = useProfileStore()

// 로컬 상태로 가져오기 (v-model 대응)
const name = ref(profile.name)
const email = ref(profile.email)

const handleSave = () => {
  profile.updateName(name.value)
  profile.updateEmail(email.value)
  router.back()
}
</script>
