<template>
  <AppLayout title="" titleCustomClass="" close="" popupMessage="">
    <div class="text-title02 font-bold font-sans pr-1 pl-1 mt-11 mb-[23px]">
      <p v-if="user?.name">{{ user.name }} 님</p>
      <p>지갑을 지키세요!</p>
    </div>

    <div
      v-for="(card, index) in cards"
      :key="card.id"
      class="mb-4"
      :draggable="isEditMode"
      @dragstart="isEditMode && onDragStart(index)"
      @dragover.prevent="isEditMode"
      @drop="isEditMode && onDrop(index)"
      :class="[isEditMode ? 'cursor-move' : '', draggingIndex === index ? 'opacity-60' : '']"
    >
      <component
        :is="card.component"
        :user-id="userId"
        @click="card.onClick ? card.onClick() : null"
      />
    </div>
    <Button
      class="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-10"
      :editContent="isEditMode ? '완료' : '보드 편집'"
      customClass="xi-exchange xi-1x rotate-90 text-kb-ui-03"
      @click="toggleEditMode"
    />
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/pages/layout/AppLayoutPage.vue'
import AssetTotalCard from '@/components/cardBoard/AssetTotalCard.vue'
import TransactionCard from '@/components/cardBoard/TransactionCard.vue'
import Button from '@/components/button/EditCardBoardButton.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getUserById } from '@/api/user'
import { getAssetByUserId } from '@/api/asset'
import { useUserStore } from '@/stores/userStore'

const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const router = useRouter()
const userStore = useUserStore()
const userId = getCookie('userId')
const asset = ref(null)

const isEditMode = ref(false)
const draggingIndex = ref(null)
const cards = ref([
  { id: 1, component: AssetTotalCard, onClick: () => goToAssetPage() },
  { id: 2, component: TransactionCard },
]) // 보드 편집 세팅

onMounted(async () => {
  if (userId) {
    const res = await getUserById(userId)
    userStore.setUser(res.data)
    const userAsset = await getAssetByUserId(userId)
    asset.value = userAsset
  } else {
    window.location.href = '/onboarding'
  }
})

const user = computed(() => userStore.user)

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
}

const goToAssetPage = () => {
  router.push('/asset')
} // 페이지 이동

// 드래그드롭 편집
const onDragStart = (index) => {
  draggingIndex.value = index
}

const onDrop = (targetIndex) => {
  if (draggingIndex.value === null) return
  const draggedCard = cards.value[draggingIndex.value]
  cards.value.splice(draggingIndex.value, 1)
  cards.value.splice(targetIndex, 0, draggedCard)
  draggingIndex.value = null
}
</script>
