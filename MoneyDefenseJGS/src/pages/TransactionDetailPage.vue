<template>
    <div class="transaction-detail-page">
        <!-- 상단 제목 -->
        <TransactionTitle />

        <!-- 거래 정보 표시 및 저장 처리 -->
        <TransactionStore />

        <!-- 거래 수정 -->
        <EditTransaction />
    </div>
</template>

<script setup>
import TransactionTitle from '@/components/TransactionTitle.vue'
import TransactionStore from '@/components/TransactionStore.vue'
import EditTransaction from '@/components/EditTransaction.vue'
</script>

<style scoped>
.transaction-detail-page {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>