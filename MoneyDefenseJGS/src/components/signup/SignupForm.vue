<template>
  <div class="flex flex-col gap-4">
    <!-- 닉네임 입력 필드 -->
    <TextInputField
      v-model="nickname"
      label="닉네임"
      placeholder="닉네임을 입력하세요"
      :validator="validateNickname"
      :showValidation="touched.nickname"
      @input="touched.nickname = true"
    />

    <!-- 아이디 입력 필드 -->
    <div class="relative">
      <TextInputField
        v-model="userId"
        label="아이디"
        placeholder="아이디를 입력하세요"
        :validator="validateUserId"
        :showValidation="touched.userId"
        @input="
          () => {
            touched.userId = true
            isIdChecked = false
          }
        "
      />
      <!-- 아이디 중복 확인 버튼 -->
      <button
        class="absolute right-2 bottom-2 text-sm text-blue-500 underline disabled:text-gray-400"
        :disabled="!isUserIdFormatValid"
        @click="checkUserIdDuplication"
      >
        중복 확인
      </button>
    </div>
</template>
<script setup>
import TextInputField from '@/components/common/TextInputField.vue'
const nickname = ref('')
const userId = ref('')

// 아이디 중복 검사 상태 관리
const isIdChecked = ref(false) // 중복 확인 버튼 눌렀는지 여부
const isUserIdDuplicate = ref(false) // 중복 여부 결과
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

// 아이디
const validateUserId = (val) => {
  const regex = /^[a-zA-Z0-9]{5,20}$/ // 영문/숫자 5~20자, 특수문자X
  if (!regex.test(val)) return { isValid: false, message: '5~20자 영문/숫자만 입력' } // 형식 불일치
  if (!isIdChecked.value) return { isValid: false, message: '중복 확인 필요' } // 중복 확인 안됨
  if (isUserIdDuplicate.value) return { isValid: false, message: '이미 사용 중인 아이디 입니다.' } // 중복됨
  return { isValid: true, message: '사용 가능한 아이디 입니다.' } // 유효
}

// id 중복 확인 버튼 : 아이디가 형식에 맞는 경우에만 버튼 활성화
const isUserIdFormatValid = computed(() => /^[a-zA-Z0-9]{5,20}$/.test(userId.value))

// 전체 유저 목록에서 동일한 userId가 있는지 확인
const checkUserIdDuplication = async () => {
  try {
    const { data: users } = await getAllUsers()
    const duplicate = users.some((u) => u.userId === userId.value)
    isUserIdDuplicate.value = duplicate
    isIdChecked.value = true
  } catch (err) {
    console.error('중복 확인 에러:', err)
    isUserIdDuplicate.value = true
    isIdChecked.value = false
  }
}
</script>
