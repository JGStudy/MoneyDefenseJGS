<template>
  <div class="flex gap-2">
    <button
      v-for="type in types"
      :key="type"
      @click="$emit('toggle-type', type)"
      :class="[
        'px-4 py-1 rounded border text-body01 font-medium',
        selectedTypes.includes(type)
          ? 'bg-kb-ui-04 text-white border-kb-ui-04'
          : 'bg-white text-kb-ui-03 border-kb-ui-06 hover:border-kb-ui-04',
      ]"
    >
      {{ type }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedTypes: {
    type: Array,
    required: true,
  },
  types: {
    type: Array,
    default: () => ['지출', '수입', '이체'],
  },
})
</script>
