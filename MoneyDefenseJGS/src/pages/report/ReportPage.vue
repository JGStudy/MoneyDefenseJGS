<template>
  <AppLayoutPage title="대시보드">
    <TotalMoney />
    <MonthlyChart />
    <CategoryChart />
  </AppLayoutPage>
</template>

<script setup>
import TotalMoney from '@/components/DashBoard/TotalMoney.vue'
import MonthlyChart from '@/components/DashBoard/MonthlyChart.vue'
import CategoryChart from '@/components/DashBoard/CategoryChart.vue'
import AppLayoutPage from '../layout/AppLayoutPage.vue'
</script>

<style scoped></style>
