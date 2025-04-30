<template>
  <Card class="font-sans flex justify-between items-center cursor-pointer" @click="$emit('click')">
    <div>
      <h3 class="text-body01">총 자산</h3>
      <div class="flex items-center text-title03 font-bold font-sans gap-1 mt-1">
        <span class="text-number-lg translate-y-[1px] font-nums">
          {{ (currentAsset || 0).toLocaleString() }}
        </span>
        <span>원</span>
      </div>
      <div class="text-body03 flex items-center mt-1 gap-1 text-kb-ui-04">
        <span> 지난 달보다 </span>
        <div
          :class="[
            'flex items-center text-[13px]',
            assetDiff > 0 ? 'text-status-error-input' : 'text-status-positive',
          ]"
        >
          <i :class="assetDiff > 0 ? 'xi-caret-up-min' : 'xi-caret-down-min'"></i>
          <span class="font-nums translate-y-[1px]">
            {{ Math.abs(assetDiff).toLocaleString() }}
          </span>
          <span class="font-sans"> 원</span>
        </div>
        <span>{{ assetDiff > 0 ? '올랐습니다' : '내렸습니다' }}</span>
      </div>
    </div>
    <div><i class="xi-angle-right"></i></div>
  </Card>
</template>

<script setup>
import Card from '@/components/common/BaseBox.vue'
import { ref, onMounted } from 'vue'
import { getAsset } from '@/api/assetApi'
import { format, subMonths } from 'date-fns'

const props = defineProps({
  userId: String,
})

// 변수 선언 및 초기화
const currentAsset = ref(0)
const previousAsset = ref(0)
const assetDiff = ref(0)
const now = ref('')
const prev = ref('')

onMounted(async () => {
  const assetList = await getAsset()
  const userAssets = assetList.filter((a) => a.userId === props.userId)

  now.value = format(new Date(), 'yyyy-MM')
  prev.value = format(subMonths(new Date(), 1), 'yyyy-MM')

  const current = userAssets.find((a) => a.lastModified.startsWith(now.value))
  const previous = userAssets.find((a) => a.lastModified.startsWith(prev.value))

  currentAsset.value = current?.totalAsset || 0
  previousAsset.value = previous?.totalAsset || 0
  assetDiff.value = currentAsset.value - previousAsset.value
})
</script>
