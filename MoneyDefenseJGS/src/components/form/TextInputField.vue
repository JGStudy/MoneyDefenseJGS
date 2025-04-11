<template>
  <div class="w-[327px] min-h-[70px] mb-5 relative">
    <!-- 입력값 title -->
    <label class="font-sans text-body02 text-kb-ui-04 mb-[-3px] block">
      {{ label }}
    </label>

    <div
      class="flex items-center h-[41px] px-[2px] py-[7px]"
      :class="{ 'justify-between': isAmountType, 'justify-start': !isAmountType }"
    >
      <!-- default: String -->
      <input
        :value="modelValue"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @input="onInput"
        @keyup.enter="emit('enter')"
        :type="type === 'amount' ? 'tel' : type"
        :inputmode="isAmountType ? 'numeric' : undefined"
        :placeholder="placeholder"
        class="w-full outline-none font-sans text-body02 text-kb-ui-02"
        :class="[isAmountType ? 'text-right pr-1' : '']"
      />
      <!-- type: Number인 경우 -->
      <div
        v-if="isAmountType"
        class="flex items-center gap-[1px] text-number-lg font-nums text-kb-ui-02"
      >
        <span class="font-sans text-body01 font-bold">원</span>
      </div>

      <!-- type: String -->
      <div
        v-if="showClear && modelValue && !isAmountType"
        class="w-5 h-5 ml-2 cursor-pointer text-kb-ui-06"
        @click="clearInput"
      >
        <i class="xi-close-circle xi-x" aria-label="입력 내용 지우기"></i>
      </div>
    </div>

    <div :class="['h-[2px]', underlineColor]"></div>

    <!-- 유효성 검사 메세지 항목 -->
    <div v-if="showMessage" class="flex items-center gap-1 mt-1">
      <i :class="iconClass" class="w-5 h-5"></i>
      <span :class="messageClass">{{ validationMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  showClear: {
    type: Boolean,
    default: true,
  },
  validator: {
    type: Function,
    default: (val, type = 'text') => {
      const value = String(val || '').trim()
      return {
        isValid: !!value,
        message: value ? '입력 완료!' : '금액을 입력해 주세요.',
      }
    },
  },
  showValidation: {
    type: Boolean,
    default: false,
  }, //유효성여부 체크
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input', 'keydown', 'enter'])
const focused = ref(false) // inputField에 값을 입력할 준비

const isAmountType = computed(() => props.type === 'amount') // 숫자 입력 판단

const onInput = (e) => {
  let value = e.target.value
  if (isAmountType.value) {
    value = value.replace(/[^0-9]/g, '')
  }
  emit('update:modelValue', value)
  emit('input', e)
} // 입력 후 숫자 필터링(붙여넣기 때문에 추가)

const clearInput = () => {
  emit('update:modelValue', '')
} // 입력 초기화 -> 텍스트

const validation = computed(() => props.validator(String(props.modelValue || ''), props.type)) // 유효성 검증
const validationMessage = computed(() => validation.value.message) // 유효성 검증 메세지
const isInvalid = computed(() => !validation.value.isValid) // 유효성 검증 결과

const underlineColor = computed(() => {
  if (props.modelValue?.length > 0) {
    return isInvalid.value ? 'bg-status-error-input' : 'bg-status-positive'
  }
  return 'bg-kb-ui-02/[.2]'
}) // 유효성 검증에 따른 밑줄 색상

const iconClass = computed(() =>
  isInvalid.value ? 'xi-error text-status-error-input' : 'xi-check-circle text-status-positive',
) // 유효성 검증에 따른 아이콘

const messageClass = computed(() =>
  isInvalid.value ? 'text-status-error-input' : 'text-status-positive',
) // 유효성 검증에 따른 메세지 색상

const showMessage = computed(() => props.showValidation && validationMessage.value) // 메세지 show 처리
</script>
