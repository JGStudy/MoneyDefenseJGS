<template>
  <div class="mx-6 pt-24 pt-mx-1 font-sans relative h-screen">
    <!-- <p class="text-body01 mb-2">💰지갑을 지켜라!</p> -->
    <p class="font-bold text-title02 mb-10">회원가입</p>
    <!-- 회원 정보 입력 영역 -->
    <SignupForm @update:formValid="onFormValidUpdate" @update:formValues="onFormValuesUpdate" />

    <!-- 회원가입 버튼 -->
    <SignupButton
      label="회원가입 완료"
      :disabled="!isFormValid"
      customClass="absolute bottom-[50px]"
      class="mt-6"
      @click="handleSignup"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SignupForm from '@/components/signup/SignupForm.vue'
import SignupButton from '@/components/common/BaseButton.vue'
import { registerUser } from '@/api/userApi.js'

// 유효성 여부 + 입력된 유저 정보
const isFormValid = ref(false)
const formValues = ref({
  name: '',
  userId: '',
  password: '',
})

const router = useRouter()

// 입력된 정보 유효 상태
const onFormValidUpdate = (valid) => {
  isFormValid.value = valid
}

// 사용자 입력값
const onFormValuesUpdate = (values) => {
  formValues.value = values
}

// 회원가입 처리 함수
const handleSignup = async () => {
  try {
    await registerUser(formValues.value)
    console.log('회원가입이 완료되었습니다!')
    router.push('/') // 홈으로 이동
  } catch (err) {
    console.log('회원가입 중 오류가 발생했습니다.')
    console.error(err)
  }
}
</script>
