<template>
  <div style="padding: 20px">
    <!-- 거래처 입력 -->
    <div style="margin-bottom: 16px">
      <label>거래처:</label><br />
      <input v-model="partner" type="text" placeholder="거래처를 입력하세요" />
    </div>

    <!-- 거래액 입력
        <div>
            <label>거래액:</label><br />
            <input v-model="amount" type="number" placeholder="숫자만 입력하세요" />
        </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const partner = ref('')
const amount = ref('')
</script>
