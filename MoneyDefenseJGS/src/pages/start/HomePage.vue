<template>
  <AppLayout title="" titleCustomClass="" close="" popupMessage="">
    <div class="text-title02 font-bold font-sans pr-1 pl-1 mt-11 mb-[23px]">
      <p v-if="user?.name">{{ user.name }} 님</p>
      <p>지갑을 지키세요!</p>
    </div>
    <Card class="font-sans flex justify-between items-center">
      <div>
        <h3 class="text-body01">총 자산</h3>
        <div class="flex items-center text-title03 font-bold gap-1">
          <span class="text-number-lg font-nums">{{
            Number(asset?.totalAsset || 0).toLocaleString()
          }}</span>
          <span>원</span>
        </div>
        <div class="text-body03 align-middle flex items-center gap-1">
          <span> 지난 달보다 </span>
          <div class="flex items-center text-status-error-input">
            <i class="xi-caret-up-min"></i>
            <span class="font-nums text-[13px]">1,230,453</span>
            <span> 원</span>
          </div>
          <span> 올랐습니다 </span>
        </div>
      </div>
      <div><i class="xi-angle-right"></i></div>
    </Card>
    <Button customClass="xi-exchange xi-1x rotate-90 text-kb-ui-03" editContent="보드 편집" />
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/pages/layout/AppLayoutPage.vue'
import Card from '@/components/common/BaseBox.vue'
import Button from '@/components/button/EditCardBoardButton.vue'
import { ref, onMounted, computed } from 'vue'
import { getUserById } from '@/api/user'
import { getAssetByUserId } from '@/api/asset'
import { useUserStore } from '@/stores/userStore'

// 쿠키에서 userId 가져오기
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const userStore = useUserStore()
const userId = getCookie('userId')
const asset = ref(null)

onMounted(async () => {
  if (userId) {
    const res = await getUserById(userId)
    userStore.setUser(res.data)
    const userAsset = await getAssetByUserId(userId)
    asset.value = userAsset
  } else {
    // 쿠키 없으면 온보딩으로 이동
    window.location.href = '/onboarding'
  }
})

const user = computed(() => userStore.user)
</script>
