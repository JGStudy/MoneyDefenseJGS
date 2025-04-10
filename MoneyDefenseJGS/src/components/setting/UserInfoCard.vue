<template>
  <div class="p-4 rounded-xl bg-kbUi09 text-kbUi02 mb-4">
    <h2 class="text-body01 font-semibold mb-1">안녕하세요,</h2>
    <p class="text-body02 font-bold">{{ name }}님 👋</p>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profileStore'
import { storeToRefs } from 'pinia'

const profile = useProfileStore()
const { name, email } = storeToRefs(profile)
</script>
