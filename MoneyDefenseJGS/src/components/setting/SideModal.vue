<template>
  <Teleport to="body">
    <div v-if="isRendered" class="fixed inset-0 z-50 flex">
      <!-- 배경 딤처리 -->
      <div class="flex-1 bg-black/30 backdrop-blur-sm" @click.self="$emit('close')" />

      <!-- 슬라이드 모달 -->
      <div
        class="w-full h-full bg-white dark:bg-kb-dark-muted text-kb-ui-02 dark:text-kb-dark-text transition-transform duration-500 ease-in-out transform"
        :class="isVisible ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="p-6 flex flex-col h-full justify-between">
          <div>
            <h2 class="text-title02 font-semibold mb-4">
              {{ modalTitle[type] || '설정' }}
            </h2>
            <p class="text-body03 text-kb-ui-05 dark:text-kb-dark-subtext">
              {{
                type === 'reset'
                  ? '정말 초기화하시겠습니까?'
                  : type === 'export'
                    ? '데이터를 CSV 파일로 저장하시겠습니까?'
                    : `여기에 ${type} 내용`
              }}
            </p>
          </div>

          <div
            class="flex justify-end gap-2 pt-6 border-t border-kb-ui-08 dark:border-kb-dark-line"
          >
            <button
              class="px-4 py-2 rounded-xl bg-kb-ui-09 dark:bg-kb-dark-line text-body03 text-kb-ui-02 dark:text-kb-dark-text hover:bg-kb-ui-08 dark:hover:bg-kb-dark-muted"
              @click="$emit('close')"
            >
              아니오
            </button>
            <button
              class="px-4 py-2 rounded-xl bg-status-positive text-white text-body03 hover:opacity-90"
              @click="handleSave"
            >
              네
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import apiClient from '@/api/apiClient'

const props = defineProps({ type: String })
const emit = defineEmits(['close'])

const isRendered = ref(false)
const isVisible = ref(false)

const modalTitle = {
  user: '사용자 정보',
  theme: '테마 설정',
  export: '데이터 내보내기',
  reset: '데이터 초기화',
}

onMounted(async () => {
  isRendered.value = true
  await nextTick()
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})

function handleSave() {
  if (props.type === 'export') {
    exportToCSV()
  } else if (props.type === 'reset') {
    resetTransactions()
  }
  emit('close')
}

async function exportToCSV() {
  try {
    const { data } = await apiClient.get('/transactions')
    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'transactions.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('CSV 내보내기 실패:', error)
  }
}

async function resetDatabase() {
  try {
    const endpoints = [
      'Profile',
      'Title',
      'transactions',
      'asset',
      'month',
      'savings',
      'expense',
      'categoryExpenses',
      'items',
      'fileter',
      'select',
    ]
    for (const endpoint of endpoints) {
      const { data } = await apiClient.get(`/${endpoint}`)
      await Promise.all(data.map((item) => apiClient.delete(`/${endpoint}/${item.id}`)))
    }
    console.log('✅ 모든 주요 데이터가 초기화되었습니다.')
  } catch (error) {
    console.error('전체 초기화 실패:', error)
  }
}

function convertToCSV(data) {
  if (!data || !data.length) return ''
  const headers = Object.keys(data[0]).join(',')
  const rows = data.map((obj) => Object.values(obj).join(',')).join('\n')
  return `${headers}\n${rows}`
}
</script>
