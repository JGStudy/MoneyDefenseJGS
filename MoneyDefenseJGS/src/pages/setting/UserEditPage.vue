<template>
  <RealHeader title="" popup-message="사용자 이름을 수정합니다." />
  <div
    class="min-h-screen pt-24 px-6 font-sans bg-white dark:bg-kb-dark-line text-kb-ui-02 dark:text-kb-dark-text flex flex-col"
  >
    <!-- 토스트 메시지 -->
    <SettingToast ref="toast" />

    <!-- 뒤로가기 -->
    <!-- <button class="text-body03 text-status-error mb-6 self-start" @click="router.back()">
      뒤로가기
    </button> -->

    <!--  제목 -->
    <h1 class="text-title02 font-bold mb-8 mt-6">사용자 정보 수정</h1>

    <!--  입력 필드 -->
    <div class="flex flex-col gap-6 mb-12">
      <div>
        <label class="text-body03 font-medium block mb-2">닉네임</label>
        <input
          type="text"
          v-model="name"
          maxlength="12"
          placeholder="한글 닉네임 입력"
          class="w-full px-4 py-3 rounded-xl text-body02 placeholder:text-kb-ui-05 bg-kb-ui-11 dark:bg-kb-dark-muted text-kb-ui-02 dark:text-kb-dark-text border border-kb-ui-07 focus:outline-none focus:border-kb-yellow-positive transition"
        />
      </div>
    </div>

    <!--  버튼 -->
    <div class="flex justify-center gap-4">
      <!-- 저장 버튼 -->
      <button
        class="px-6 py-3 rounded-xl bg-kb-yellow-positive text-black font-semibold text-body02 hover:brightness-105 transition"
        @click="handleSave"
      >
        저장
      </button>

      <!-- 취소 버튼 -->
      <button
        class="px-6 py-3 rounded-xl border border-kb-ui-07 text-kb-ui-02 font-semibold text-body02 hover:bg-kb-ui-10 transition"
        @click="router.back()"
      >
        취소
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import SettingToast from '@/components/setting/SettingToast.vue'
import { useUserStore } from '@/stores/userStore'
import RealHeader from '@/components/common/RealHeader.vue'

const router = useRouter()
const toast = ref(null)
const name = ref('')

//  userStore에서 현재 사용자 정보 가져오기
const userStore = useUserStore()
const userId = userStore.user?.id

//  저장 로직
const handleSave = async () => {
  const hangulRegex = /^[가-힣]{1,12}$/

  if (!hangulRegex.test(name.value)) {
    toast.value?.show('닉네임은 한글 1~12자여야 합니다.', 'warning')
    return
  }

  if (!userId) {
    toast.value?.show('로그인된 사용자 정보가 없습니다.', 'error')
    return
  }

  try {
    const { data } = await axios.get(`/api/Profile/${userId}`)

    if (!data?.id) {
      toast.value?.show('존재하지 않는 사용자입니다.', 'error')
      return
    }

    await axios.put(`/api/Profile/${userId}`, {
      id: userId,
      name: name.value,
    })

    //  store 갱신 !
    userStore.user.name = name.value

    toast.value?.show('사용자 정보가 저장되었습니다.', 'success')
    router.back()
  } catch (err) {
    console.error('저장 실패:', err)
    toast.value?.show('저장에 실패했습니다.', 'error')
  }
}

//  현재 사용자 이름 초기값 설정
onMounted(() => {
  name.value = userStore.user?.name ?? ''
})
</script>
