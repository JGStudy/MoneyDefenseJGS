<template>
  <div class="flex items-center gap-4">
    <button
      @click="$emit('change-month', -1)"
      class="text-body02 text-kb-ui-04 hover:text-kb-ui-02"
    >
      &lt;
    </button>
    <h2 class="text-title02 text-kb-ui-01 font-sans">{{ month }}월</h2>
    <button @click="$emit('change-month', 1)" class="text-body02 text-kb-ui-04 hover:text-kb-ui-02">
      &gt;
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  month: {
    type: Number,
    required: true,
  },
})
</script>
