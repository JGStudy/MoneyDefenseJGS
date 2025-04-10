<template>
    <div style="padding: 20px;">
        <!-- 📌 분류 선택 버튼 -->
        <div style="margin-bottom: 16px;">
            <label>분류:</label><br />
            <button v-for="type in types" :key="type" @click="selectedType = type" :style="{
                marginRight: '8px',
                backgroundColor: selectedType === type ? '#4CAF50' : '#ccc',
                color: 'white',
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px'
            }">
                {{ type }}
            </button>
        </div>

        <!-- 📂 카테고리 -->
        <div style="margin-bottom: 16px;">
            <label>카테고리:</label><br />
            <input v-model="category" type="text" placeholder="카테고리를 입력하세요" />
        </div>

        <!-- 🏢 거래처 -->
        <div style="margin-bottom: 16px;">
            <label>거래처:</label><br />
            <input v-model="partner" type="text" placeholder="거래처를 입력하세요" />
        </div>

        <!-- 💳 결제수단 -->
        <div style="margin-bottom: 16px;">
            <label>결제수단:</label><br />
            <input v-model="paymentMethod" type="text" placeholder="예: 카드, 현금" />
        </div>

        <!-- 📅 날짜 -->
        <div style="margin-bottom: 16px;">
            <label>날짜:</label><br />
            <input v-model="date" type="date" />
        </div>

        <!-- 📝 메모 -->
        <div style="margin-bottom: 16px;">
            <label>메모:</label><br />
            <textarea v-model="memo" placeholder="메모를 작성하세요" rows="3" style="width: 100%;"></textarea>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const types = ['수입', '지출', '이체']
const selectedType = ref('수입') // 기본값

const category = ref('')
const partner = ref('')
const paymentMethod = ref('')
const date = ref('')
const memo = ref('')
</script>