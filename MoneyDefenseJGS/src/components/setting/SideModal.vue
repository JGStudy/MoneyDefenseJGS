<template>
  <Teleport to="body">
    <div v-if="isRendered" class="fixed inset-0 z-50 flex font-sans">
      <!-- 딤 처리 (외부 클릭 시 닫힘) -->
      <div class="flex-1 bg-black/30 backdrop-blur-sm" @click.self="closeModal" />

      <!-- 슬라이드 모달 -->
      <div
        class="w-full h-full bg-white dark:bg-kb-dark-line text-kb-ui-02 dark:text-kb-dark-text transition-transform duration-500 ease-in-out transform"
        :class="isVisible ? 'translate-x-0' : 'translate-x-full'"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex flex-col h-full justify-between px-6 pt-10 pb-8">
          <!-- 제목 / 설명 -->
          <div>
            <h2 class="text-title02 font-bold mb-4">
              {{ modalTitle[type] || '설정' }}
            </h2>
            <p class="text-body01 text-kb-ui-05 dark:text-kb-dark-subtext leading-relaxed">
              {{
                type === 'reset'
                  ? '정말 초기화하시겠습니까?'
                  : type === 'export'
                    ? '데이터를 CSV 파일로 저장하시겠습니까?'
                    : `여기에 ${type} 내용`
              }}
            </p>
          </div>

          <!-- 버튼 영역 -->
          <div
            class="flex justify-end gap-2 pt-6 border-t border-kb-ui-08 dark:border-kb-dark-line mt-10"
          >
            <button
              class="px-5 py-3 rounded-xl text-body02 font-semibold bg-kb-yellow-positive text-black hover:opacity-90 transition"
              @click="closeModal"
            >
              아니오
            </button>
            <button
              class="px-5 py-3 rounded-xl text-body02 font-semibold bg-kb-yellow-positive text-black hover:opacity-90 transition"
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api/apiClient'

const props = defineProps({ type: String })
const emit = defineEmits(['close'])

const router = useRouter()

const isRendered = ref(false)
const isVisible = ref(false)

const modalTitle = {
  user: '사용자 정보',
  theme: '테마 설정',
  export: '데이터 내보내기',
  reset: '데이터 초기화',
}

// 모달 열릴 때 실행됨
onMounted(async () => {
  isRendered.value = true
  await nextTick()

  // 브라우저 히스토리에 모달 열림 상태를 추가
  history.pushState({ modal: true }, '')

  // 살짝 delay 주고 슬라이드 인
  requestAnimationFrame(() => {
    isVisible.value = true
  })

  // ESC 키, 뒤로가기 감지용 이벤트 등록
  window.addEventListener('popstate', handleBack)
  window.addEventListener('keydown', handleEsc)
})

// 모달이 닫힐 때 정리
onUnmounted(() => {
  window.removeEventListener('popstate', handleBack)
  window.removeEventListener('keydown', handleEsc)
})

// 뒤로가기 or history.back() 시 모달 닫기
function handleBack() {
  isVisible.value = false
  setTimeout(() => emit('close'), 300) // 애니메이션 고려
}

// ESC 키 눌렀을 때도 닫기
function handleEsc(e) {
  if (e.key === 'Escape') {
    closeModal()
  }
}

// 닫기 버튼 or 딤 클릭 시 실행
function closeModal() {
  history.back() // popstate 트리거
}

// 확인 버튼 눌렀을 때
function handleSave() {
  if (props.type === 'export') {
    exportToCSV()
  } else if (props.type === 'reset') {
    resetDatabase()
  }
  closeModal()
}

// 데이터 CSV로 내보내기
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

// 전체 데이터 리셋
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

// 배열 → CSV 텍스트로 변환
function convertToCSV(data) {
  if (!data || !data.length) return ''
  const headers = Object.keys(data[0]).join(',')
  const rows = data.map((obj) => Object.values(obj).join(',')).join('\n')
  return `${headers}\n${rows}`
}
</script>
