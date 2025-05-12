<template>
    <!-- 닉네임 입력 필드 -->
    <TextInputField
      v-model="nickname"
      label="닉네임"
      placeholder="닉네임을 입력하세요"
      :validator="validateNickname"
      :showValidation="touched.nickname"
      @input="touched.nickname = true"
    />
</template>
<script setup>
import TextInputField from '@/components/common/TextInputField.vue'
const nickname = ref('')
// 닉네임
const validateNickname = (val) => {
  const regex = /^[가-힣a-zA-Z]{2,20}$/ // 길이 2~20자, 한글/영문만 허용
  const forbidden = ['운영자', '관리자', 'admin', 'master'] // 예약어
  if (!regex.test(val)) return { isValid: false, message: '2~20자 한글/영문만 입력' } // 형식 불일치 시
  if (forbidden.some((word) => val.includes(word)))
    // 금지어 포함 여부 확인
    return { isValid: false, message: '사용할 수 없는 닉네임 입니다. ' }
  return { isValid: true, message: '사용 가능한 닉네임 입니다.' } // 유효
}
</script>
