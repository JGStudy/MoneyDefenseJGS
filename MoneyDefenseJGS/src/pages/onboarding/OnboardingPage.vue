<template>
  <div class="mx-6 pt-24 pt-mx-1 font-sans relative h-screen">
    <p class="text-body01 mb-2">💰지갑을 지켜라!</p>
    <p class="font-bold text-title02">지금부터</p>
    <p class="font-bold text-title02 mb-5">
      <span class="text-kb-yellow-positive">지갑지켜진기스</span>를 시작하지
    </p>

    <OnboardingForm
      v-model:userName="userName"
      v-model:assetTotal="assetTotal"
      :showNameValidation="showNameValidation"
      :showAmountValidation="showAmountValidation"
      @enter="handleSubmit"
    />

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
import OnboardingForm from '@/components/onboarding/OnboardingForm.vue'
import { useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'
import { createAsset } from '@/api/assetApi'
import { createUser } from '@/api/userApi'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const userName = ref('') // userName값
const assetTotal = ref('') //assetTotal값
const showNameValidation = ref(false) // userName유효성여부확인
const showAmountValidation = ref(false) // assetTotal유효성여부확인

const isNameValid = (val) => val.trim().length >= 2 && val.trim().length <= 20 //userName 유효성 조건
const isAmountValid = (val) => !!val //amount 유효성 조건

const isInvalid = computed(() => {
  return !isNameValid(userName.value) || !isAmountValid(assetTotal.value)
}) // 둘 중 하나라도 만족하지 못한다면 유효성 false

// 실시간 감시
watch(userName, (newVal) => {
  if (newVal !== '') showNameValidation.value = true
})
watch(assetTotal, (newVal) => {
  if (newVal !== '') showAmountValidation.value = true
})

const handleSubmit = async () => {
  showNameValidation.value = true
  showAmountValidation.value = true // 유효성여부 메세지 보여주기

  if (isInvalid.value) return

  // userName과 assetTotal 로컬 스토리지 저장
  const newUser = await createUser(userName.value)
  userStore.setUser(newUser)
  localStorage.setItem('userId', newUser.userId)

  await createAsset(newUser.id, Number(assetTotal.value))

  router.push('/') // Home으로 이동
}
</script>
