<template>
  <div class="flex justify-center space-x-4 my-4">
    <button :class="tabClass('asset')" @click="$emit('update:activeTab', 'asset')">자산</button>
    <button :class="tabClass('budget')" @click="$emit('update:activeTab', 'budget')">예산</button>
  </div>
</template>

<script setup>
// activeTab을 부모로부터 받아옴
const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },
})

// tabClass 함수에서 activeTab을 사용할 수 있도록
const tabClass = (tabName) => {
  return [
    'px-6 py-2 rounded-full font-semibold transition',
    tabName === props.activeTab
      ? 'bg-blue-500 text-white shadow-md'
      : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
  ]
}
</script>
