<template>
  <AppLayout title="" titleCustomClass="" close="" popupMessage="">
    <div class="text-title02 font-bold font-sans pr-1 pl-1 mt-11 mb-[23px]">
      <p>진기스 님</p>
      <p>지갑을 지키세요!</p>
    </div>
    <Card class="font-sans flex justify-between items-center">
      <div>
        <h3 class="text-body01">총 자산</h3>
        <div class="flex items-center text-title03 font-bold gap-1">
          <span class="text-number-lg font-nums">10,203,394</span>
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
</script>
