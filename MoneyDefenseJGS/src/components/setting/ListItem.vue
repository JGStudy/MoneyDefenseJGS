<template>
  <li
    class="flex justify-between items-center px-4 py-3 rounded-2xl shadow-list cursor-pointer transition-colors bg-kb-ui-11 dark:bg-kb-dark-line hover:bg-kb-ui-10 dark:hover:bg-kb-dark-muted"
    @click="$emit('click')"
  >
    <span class="text-body02 font-medium text-kb-ui-02 dark:text-kb-dark-text">{{ title }}</span>
    <i class="xi-angle-right text-body03 text-kb-ui-05 dark:text-kb-dark-subtext"></i>
  </li>
</template>

<script setup>
defineProps({
  title: String,
})
</script>
