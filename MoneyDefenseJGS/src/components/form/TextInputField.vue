<template>
  <div class="w-[327px] min-h-[70px]">
    <!-- input label -->
    <label class="font-sans font-light text-body02 text-kb-ui-04 mb-[-3px]">
      {{ label }}
    </label>
    <!-- input main -->
    <div class="flex items-center px-[2px] py-[7px] h-[41px]">
      <input
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        @focus="focused = true"
        @blur="focused = false"
        @input="handleInput"
        class="w-full outline-none font-sans text-body02"
        :class="inputTextColor"
      />
      <div
        v-if="showClear && modelValue"
        class="w-5 h-5 ml-2 cursor-pointer text-kb-ui-06"
        @click="clearInput"
      >
        <i class="xi-close-circle xi-x" aria-label="입력 내용 지우기"></i>
      </div>
    </div>

    <!-- underline design -->
    <div :class="['h-[2px]', underlineColor]"></div>

    <!-- status -->
    <div v-if="showMessage" class="flex items-center gap-1 mt-1">
      <i :class="iconClass" class="w-5 h-5"></i>
      <span :class="messageClass">{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
})

const emit = defineEmits(['update:modelValue']) // v-model update

const modelValue = ref(props.modelValue || '') // modelValue reset

const focused = ref(false)
const nameLength = computed(() => modelValue.value.trim().length)

const isEmpty = computed(() => nameLength.value === 0)
const isValid = computed(() => nameLength.value >= 2 && nameLength.value <= 20)
const isInvalid = computed(() => isEmpty.value || !isValid.value)

const underlineColor = computed(() => {
  if (nameLength.value > 0) {
    return isInvalid.value ? 'bg-status-error-input' : 'bg-status-positive'
  }
  return 'bg-kb-ui-02/[.2]'
})

const message = computed(() => {
  if (isEmpty.value) {
    return '두 글자 이상 입력해 주세요.'
  } else if (nameLength.value >= 2 && nameLength.value <= 20) {
    return '이제 지갑지킴이로 등록할 수 있어요.'
  } else {
    return '20자 이내로 입력해 주세요.'
  }
})

const iconClass = computed(() =>
  isInvalid.value ? 'xi-error text-status-error-input' : 'xi-check-circle text-status-positive',
)

const messageClass = computed(() =>
  isInvalid.value ? 'text-status-error-input' : 'text-status-positive',
)

const showMessage = computed(() => !isEmpty.value && (focused.value || isInvalid.value))

const clearInput = () => {
  modelValue.value = ''
  emit('update:modelValue', '')
}

const handleInput = () => {
  emit('update:modelValue', modelValue.value.trim())
}

//  코드 다시 뜯어보자;;
</script>
