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
      <button class="bg-kbUi02 text-white px-6 py-2 rounded-full" @click="handleSave">저장</button>
      <button class="bg-kbUi05 text-white px-6 py-2 rounded-full" @click="router.back()">
        취소
      </button>
    </div>

    <!-- 하단 푸터 -->
    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore'
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
