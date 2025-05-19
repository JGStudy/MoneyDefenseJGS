<template>
  <li
    @click="$emit('click', transaction.id)"
    class="flex items-center justify-between gap-4 p-4 cursor-pointer hover:bg-kb-ui-11 transition"
  >
    <!-- 아이콘 (삭제 트리거) -->
    <div
      class="relative w-10 h-10 flex-none rounded-[22px] bg-kb-ui-09 flex items-center justify-center cursor-pointer"
      @click.stop="showPopup = true"
    >
      <span class="text-kb-ui-05 text-number-lg font-nums opacity-50">
        <i :class="['xi', isPositive ? 'xi-plus' : 'xi-minus', 'text-xl']"></i>
      </span>
    </div>

    <!-- 거래 메모 및 카테고리/출처 -->
    <div class="flex-1 min-w-0">
      <p class="text-kb-ui-01 text-body02 font-medium truncate">{{ transaction.memo }}</p>
      <p class="text-kb-ui-05 text-body03 mt-0.5">
        {{ transaction.category || '기타' }} | {{ transaction.source || '미지정' }}
      </p>
    </div>

    <!-- 금액 -->
    <div class="text-right whitespace-nowrap">
      <p class="text-kb-ui-01 text-body01 font-semibold">
        {{ isPositive ? '+' : '-' }}{{ formattedAmount }} 원
      </p>
    </div>

    <!-- 삭제 확인 팝업 -->
    <ConfirmPopup
      :visible="showPopup"
      message="이 거래를 삭제하시겠습니까?"
      cancelText="취소"
      confirmText="삭제"
      @cancel="showPopup = false"
      @confirm="handleDelete"
    />
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import ConfirmPopup from '@/components/common/ConfirmPopup.vue'

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const showPopup = ref(false)

const isPositive = computed(() => props.transaction.type === '수입')

const formattedAmount = computed(() => Number(props.transaction.amount).toLocaleString())

const handleDelete = () => {
  emit('delete', props.transaction.id)
  showPopup.value = false
}
</script>
