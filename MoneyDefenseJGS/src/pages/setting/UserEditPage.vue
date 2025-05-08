<template>
  <header
    class="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[375px] h-[98px] bg-kb-ui-11 pt-[50px] px-6 flex items-center gap-2"
  >
    <!-- 왼쪽: 뒤로가기 화살표 + 텍스트 -->
    <button
      type="button"
      @click="goToSetting"
      aria-label="뒤로가기"
      class="flex items-center gap-1"
    >
      <i class="xi-angle-left xi-2x"></i>
      <span class="font-sans text-kb-ui-02 font-bold text-title02">사용자 정보 수정</span>
    </button>
  </header>

  <!-- 본문: header 높이(98px) 만큼 padding-top -->
  <div
    class="min-h-screen pt-[98px] px-6 font-sans bg-white dark:bg-kb-dark-line text-kb-ui-02 dark:text-kb-dark-text flex flex-col"
  >
    <SettingToast ref="toast" />

    <!-- 입력폼: 제목과 닉네임 간격 조정 -->
    <div class="flex flex-col gap-8 mb-12 mt-6">
      <div>
        <label class="text-body03 font-medium block mb-4">닉네임</label>
        <input
          v-model="name"
          type="text"
          maxlength="12"
          placeholder="한글 닉네임 입력"
          class="w-full px-4 py-3 rounded-xl text-body02 placeholder:text-kb-ui-05 bg-white border border-kb-ui-07 focus:outline-none focus:border-kb-yellow-positive transition"
        />
      </div>
    </div>

    <!-- 버튼 -->
    <div class="flex justify-center gap-4">
      <button
        type="button"
        @click="handleSave"
        class="px-6 py-3 rounded-xl bg-kb-yellow-positive text-black font-semibold text-body02 hover:brightness-105 transition"
      >
        저장
      </button>
      <button
        type="button"
        @click="goToSetting"
        class="px-6 py-3 rounded-xl border border-kb-ui-07 text-kb-ui-02 font-semibold text-body02 hover:bg-kb-ui-10 transition"
      >
        취소
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import SettingToast from '@/components/setting/SettingToast.vue'

const router = useRouter()
const userStore = useUserStore()
const toast = ref(null)
const name = ref('')

// 쿠키에서 userId 가져오기
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const userId = getCookie('userId')

// 뒤로가기 (설정 페이지로 이동)
const goToSetting = () => {
  router.push({ name: 'setting' }).then(() => {
    window.location.reload() // 페이지 강제 새로고침 (정상 렌더링 보장)
  })
}

// 컴포넌트 마운트 시 닉네임 로드
onMounted(async () => {
  if (userId) {
    try {
      const { data } = await axios.get(`/api/Profile/${userId}`)
      userStore.setUser(data)
      name.value = data.name ?? ''
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error)
      toast.value?.show('사용자 정보를 불러오는데 실패했습니다.', 'error')
    }
  } else {
    toast.value?.show('로그인된 사용자 정보가 없습니다.', 'error')
  }
})

// 사용자 정보 저장 처리
const handleSave = async () => {
  const hangulRegex = /^[가-힣]{1,12}$/
  if (!hangulRegex.test(name.value)) {
    toast.value.show('닉네임은 한글 1~12자여야 합니다.', 'warning')
    return
  }
  if (!userId) {
    toast.value.show('로그인된 사용자 정보가 없습니다.', 'error')
    return
  }

  try {
    // 1) 사용자 정보 가져오기
    const { data } = await axios.get(`/api/Profile/${userId}`)
    if (!data.id) {
      toast.value.show('존재하지 않는 사용자입니다.', 'error')
      return
    }

    // 2) 업데이트 요청
    await axios.put(`/api/Profile/${userId}`, {
      id: userId,
      name: name.value,
    })

    // 3) Pinia 스토어 갱신
    userStore.setUser({ ...data, name: name.value })

    toast.value.show('사용자 정보가 저장되었습니다.', 'success')
    router.push({ name: 'setting' })
  } catch (err) {
    console.error('저장 실패:', err)
    toast.value.show('저장에 실패했습니다.', 'error')
  }
}
</script>
