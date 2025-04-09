<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only"
      :checked="modelValue"
      @change="$emit('update:modelValue', !modelValue)"
    />
    <div
      class="w-10 h-5 bg-kbUi07 rounded-full p-1 flex items-center transition-colors duration-300"
      :class="{ 'bg-kbPointBlue': modelValue }"
    >
      <div
        class="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300"
        :class="{ 'translate-x-5': modelValue }"
      />
    </div>
  </label>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
})
defineEmits(['update:modelValue'])
</script>
