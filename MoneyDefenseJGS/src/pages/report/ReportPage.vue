<template>
  <div class="Report">
    <TotalMoney />
    <MonthlyChart />
    <CategoryChart />
  </div>
</template>

<script setup>
import TotalMoney from '@/components/DashBoard/TotalMoney.vue'
import MonthlyChart from '@/components/DashBoard/MonthlyChart.vue'
import CategoryChart from '@/components/DashBoard/CategoryChart.vue'
</script>

<style scoped></style>
