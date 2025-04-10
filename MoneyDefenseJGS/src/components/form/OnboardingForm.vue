<template>
  <TextInputField
    :modelValue="userName"
    @update:modelValue="emit('update:userName', $event)"
    label="새로운 지갑지킴이가 돼라"
    placeholder="이름을 입력해 주세요."
    :validator="nameValidator"
    :showValidation="showNameValidation"
    @enter="emit('enter')"
  />

  <TextInputField
    :modelValue="assetTotal"
    @update:modelValue="emit('update:assetTotal', $event)"
    label="지갑을 보여줘"
    placeholder="금액을 입력해 주세요."
    type="amount"
    :validator="amountValidator"
    :showValidation="showAmountValidation"
    @enter="emit('enter')"
    @input="handleInput"
  />
</template>

<script setup>
import TextInputField from './TextInputField.vue'

const props = defineProps({
  userName: String,
  assetTotal: String,
  showNameValidation: Boolean,
  showAmountValidation: Boolean,
})

const emit = defineEmits(['update:userName', 'update:assetTotal', 'enter', 'keydown', 'input'])

// 이벤트 정의: 숫자 관련
const handleInput = (e) => {
  const filtered = e.target.value.replace(/[^0-9]/g, '')
  emit('update:assetTotal', filtered)
}

const nameValidator = (val) => {
  const length = val.trim().length
  if (length === 0) return { isValid: false, message: '이름을 입력해 주세요.' }
  if (length > 20) return { isValid: false, message: '20자 이내로 입력해 주세요.' }
  if (length < 2) return { isValid: false, message: '두 글자 이상 입력해 주세요.' }
  return { isValid: true, message: '이제 지갑지킴이로 등록할 수 있어요.' }
} // userName 유효성 조건+메세지

const amountValidator = (val) => {
  return {
    isValid: !!val,
    message: val ? '이제 지갑지킴이로 등록할 수 있어요.' : '금액을 입력해 주세요.',
  }
} // assetTotal 유효성 조건+메세지
</script>
