<template>
  <AppLayoutPage title="대시보드">
    <TotalMoney />
    <MonthlyChart />
    <CategoryChart />
  </AppLayoutPage>
</template>

<script setup>
import TotalMoney from '@/components/report/TotalMoney.vue'
import MonthlyChart from '@/components/report/MonthlyChart.vue'
import CategoryChart from '@/components/report/CategoryChart.vue'
import AppLayoutPage from '../layout/AppLayoutPage.vue'
</script>

<style scoped></style>
