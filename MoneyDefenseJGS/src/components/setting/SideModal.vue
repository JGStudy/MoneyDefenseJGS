<template>
  <!-- ✨ Teleport 제거 -->
  <div v-if="isRendered" class="absolute inset-0 z-40 flex items-center justify-center font-sans">
    <!-- ✅ 배경 딤 -->
    <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click.self="closeModal" />

    <!-- ✅ 컨테이너 박스: 크기 자동 + 중앙 정렬 -->
    <div
      class="relative w-10/12 bg-white dark:bg-kb-dark-line text-kb-ui-02 dark:text-kb-dark-text rounded-xl shadow-xl p-6 transition-all"
      role="dialog"
      aria-modal="true"
    >
      <!-- ✅ 콘텐츠 -->
      <div class="p-5">
        <h2 class="text-title02 font-bold mb-4 text-center">
          {{ modalTitle[type] || '설정' }}
        </h2>
        <p class="text-body01 text-kb-ui-05 dark:text-kb-dark-subtext leading-relaxed text-center">
          {{
            type === 'reset'
              ? '정말 초기화하시겠습니까?'
              : type === 'export'
                ? '데이터를 CSV 파일로 저장하시겠습니까?'
                : `이 작업을 진행하시겠습니까?`
          }}
        </p>
      </div>

      <!-- ✅ 버튼 -->
      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="closeModal"
          class="px-5 py-3 rounded-xl text-body02 font-semibold border border-kb-ui-07 text-kb-ui-02 dark:text-kb-dark-text hover:bg-kb-ui-10 dark:hover:bg-kb-dark-muted transition w-full"
        >
          아니오
        </button>

        <button
          @click="handleSave"
          class="px-5 py-3 rounded-xl text-body02 font-semibold bg-kb-yellow-positive text-black hover:brightness-105 transition w-full"
        >
          네
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import apiClient from '@/api/apiClient'

const props = defineProps({ type: String })
const emit = defineEmits(['close'])

const isRendered = ref(false)
const isVisible = ref(false)

// 모달 제목 매핑
const modalTitle = {
  user: '사용자 정보',
  theme: '테마 설정',
  export: '데이터 내보내기',
  reset: '데이터 초기화',
}

// 모달 mount
onMounted(async () => {
  isRendered.value = true
  await nextTick()
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})

// 닫기 (네 or 아니오 모두 사용)
function closeModal() {
  emit('close')
}

// 확인 버튼 처리
function handleSave() {
  if (props.type === 'export') {
    exportToCSV()
  } else if (props.type === 'reset') {
    resetDatabase()
  }

  closeModal()
}

// CSV 내보내기
async function exportToCSV() {
  try {
    const { data } = await apiClient.get('/Transaction') // 변경된 DB에서 Transaction 불러오기
    const csv = convertToCSV(data)
    const bom = '\uFEFF' // UTF-8 BOM 추가
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'transactions.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    console.log('✅ CSV 저장 완료 (UTF-8 BOM 추가됨)')
  } catch (error) {
    console.error('❌ CSV 내보내기 실패:', error)
  }
}

// ✅ CSV 변환 함수 (변경된 DB 구조에 맞춤)
function convertToCSV(data) {
  if (!data || !data.length) return ''

  // 변경된 DB 필드에 맞춰 CSV 생성
  const headers = ['날짜', '유형', '카테고리', '금액', '메모', '출처']

  const rows = data.map((transaction) => [
    transaction.date || '',
    transaction.type || '',
    transaction.category || '',
    transaction.amount || 0,
    transaction.memo || '',
    transaction.source || '',
  ])

  return `${headers.join(',')}\n${rows.map((row) => row.join(',')).join('\n')}`
}

// 데이터 초기화
async function resetDatabase() {
  try {
    console.log('🚀 Transaction 데이터 초기화 시작')

    // Transaction 데이터 로드
    const { data } = await apiClient.get('/Transaction')

    if (data.length === 0) {
      console.log('✅ Transaction에 삭제할 데이터가 없습니다.')
      return
    }

    // ✅ 각 Transaction 데이터 순차적으로 삭제
    for (const entry of data) {
      try {
        await apiClient.delete(`/Transaction/${entry.id}`)
        console.log(`🗑️ Transaction - ${entry.id} 삭제 완료`)
      } catch (deleteError) {
        console.error(`❌ Transaction - ${entry.id} 삭제 실패:`, deleteError.message)
      }
    }

    console.log(`✅ Transaction 초기화 완료 (총 ${data.length}개 삭제됨)`)
  } catch (error) {
    console.error('❌ Transaction 초기화 실패:', error.message)
  }
}
</script>
