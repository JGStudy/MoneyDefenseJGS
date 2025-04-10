<template>
  <div>
    <h1>
      <i>logo</i>
    </h1>
    <p>타이틀명</p>
    <i>설정</i>
  </div>
</template>



<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>
