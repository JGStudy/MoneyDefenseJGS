<template>
  <div class="pt-24 pt-mx-1 font-sans relative h-screen">
    <p class="font-bold text-title02 mb-2">지갑을 지켜라</p>
    <p class="font-body01">지금부터 지갑지켜진기스를</p>
    <p class="font-body01 mb-5">시작하지</p>
    <InputUser v-model="userName" label="자기소개 좀" placeholder="누구 지갑 지켜야지?" />
    <StartButton
      @click="handleSubmit"
      label="시작하기"
      customClass="absolute bottom-[50px]"
      :disabled="isInvalid"
    />
  </div>
</template>

<script setup>
import StartButton from '@/components/common/BaseButton.vue'
import InputUser from '@/components/form/TextInputField.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { createUser } from '@/api/userApi'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userName = ref('')
const userStore = useUserStore()

const handleSubmit = async () => {
  // if (!userName.value) return alert('닉네임을 입력하세요!')

  const newUser = await createUser(userName.value)
  userStore.setUser(newUser)

  document.cookie = `userId=${newUser.id}; path=/;` // 쿠키 저장

  router.push('/')
}
</script>
