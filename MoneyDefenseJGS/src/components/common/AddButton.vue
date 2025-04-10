<template>
  <div
    class="fixed bottom-[108px] left-1/2 -translate-x-1/2 z-50 w-full max-w-[375px] flex justify-end pr-5"
  >
    <button
      class="w-12 h-12 rounded-full bg-kb-ui-03 shadow-card flex items-center justify-center z-[60]"
      @click="goToCreatePage"
    >
      <svg class="w-6 h-6 stroke-kb-ui-11" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToCreatePage = () => {
  router.push('/transaction/create')
}
</script>
