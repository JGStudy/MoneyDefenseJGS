<template>
  <div class="mx-1 font-sans h-screen">
    <p class="font-bold text-title02 mb-2">지갑을 지켜라</p>
    <p class="font-body01">지금부터 지갑지켜진기스를</p>
    <p class="font-body01">시작하지</p>
    <StartButton @click="startHome" label="시작하기" customClass="absolute bottom-0 " />
  </div>
</template>

<script setup>
import StartButton from '@/components/common/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const startHome = () => {
  router.push('/')
}
</script>
