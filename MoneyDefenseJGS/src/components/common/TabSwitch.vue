<template>
  <div class="flex justify-start border-b border-gray-200 space-x-6 px-4 mt-5 font-sans">
    <button :class="tabClass('asset')" @click="$emit('update:activeTab', 'asset')">총 자산</button>
    <button :class="tabClass('budget')" @click="$emit('update:activeTab', 'budget')">예산</button>
  </div>
</template>

<script setup>
const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },
})

const tabClass = (tabName) => {
  return [
    'pb-2 text-base font-medium',
    tabName === props.activeTab ? 'border-b-2 border-black text-black' : 'text-gray-400',
  ]
}
</script>
