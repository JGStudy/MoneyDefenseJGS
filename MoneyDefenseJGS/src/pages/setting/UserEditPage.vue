<template>
  <div
    class="min-h-screen bg-kbUi10 dark:bg-kb-dark-line text-kbUi02 dark:text-kb-dark-text p-6 flex flex-col"
  >
    <SettingToast ref="toast" />
    <button class="text-sm text-red-500 mb-4 self-start" @click="router.back()">뒤로가기</button>
    <h1 class="text-page-title font-bold mb-6">사용자 정보 수정</h1>

    <div class="flex flex-col gap-4 flex-1">
      <div>
        <label class="text-sm font-medium text-kb-ui-02 dark:text-kb-dark-text mb-1 block"
          >닉네임</label
        >
        <input
          type="text"
          v-model="name"
          maxlength="12"
          placeholder="한글 닉네임 입력"
          class="w-full px-4 py-2 rounded-xl placeholder:text-kb-ui-05 bg-kb-ui-09 dark:bg-kb-dark-muted text-kb-ui-02 dark:text-kb-dark-text border border-kb-ui-07 focus:outline-none focus:border-status-positive"
        />
      </div>
    </div>

    <div class="flex gap-4 justify-center mt-6 z-10 mb-24">
      <SettingButton variant="primary" @click="handleSave">저장</SettingButton>
      <SettingButton variant="secondary" @click="router.back()">취소</SettingButton>
    </div>
  </div>

  <BottomBar class="fixed bottom-0 left-0 right-0 z-0" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SettingButton from '@/components/setting/SettingButton.vue'
import SettingToast from '@/components/setting/SettingToast.vue'
import BottomBar from '@/components/common/BottomNavBar.vue'
import axios from 'axios'

const router = useRouter()
const toast = ref(null)
const name = ref('')
const userId = 1

onMounted(async () => {
  try {
    const { data } = await axios.get(`/api/Profile/${userId}`)
    if (!data?.id) {
      throw new Error('사용자 정보가 존재하지 않습니다.')
    }
    name.value = data.name
  } catch (err) {
    toast.value?.show('사용자 정보를 불러오지 못했습니다.', 'error')
  }
})

const handleSave = async () => {
  const hangulRegex = /^[가-힣]{1,12}$/
  if (!hangulRegex.test(name.value)) {
    toast.value?.show('닉네임은 한글 1~12자여야 합니다.', 'warning')
    return
  }

  try {
    const { data } = await axios.get(`/api/Profile/${userId}`)
    if (!data?.id) {
      toast.value?.show('존재하지 않는 사용자입니다.', 'error')
      return
    }

    await axios.put(`/api/Profile/${userId}`, {
      id: userId, // ✅ 숫자형 유지
      name: name.value,
    })

    toast.value?.show('사용자 정보가 저장되었습니다.', 'success')
    router.back()
  } catch (err) {
    toast.value?.show('저장에 실패했습니다.', 'error')
  }
}
</script>
