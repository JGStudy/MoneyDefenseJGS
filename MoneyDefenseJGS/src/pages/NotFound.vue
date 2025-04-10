<script>
export default {
  name: "NotFound",
  methods: {
    // 뒤로가기 이벤트
    backspace() {
      this.$router.back();
    },
    // 홈으로 이동
    goHome() {
      this.$router.push({ name: 'home' }); // 'home'은 홈 페이지의 라우터 이름으로 수정 필요
    }
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>

<template>
  <div class="NotFound mt-[96px]">
    <h2 class="text-4xl font-semibold">404</h2>
    <h2 class="text-2xl text-gray-500">ERROR</h2>
    <p class="mt-4 text-lg text-gray-700">존재하지 않는 요청 경로: {{ $route.fullPath }}</p>
    <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
    <div class="mt-8 flex justify-center gap-6">
      <!-- 뒤로가기 버튼 -->
      <button
        type="button"
        @click="backspace"
        aria-label="뒤로가기"
        class="w-36 h-12 bg-white text-kb-yellow font-bold rounded-md shadow-lg hover:bg-kb-gray-alt hover:text-white focus:outline-none focus:ring-2 focus:ring-kb-yellow"
      >
        뒤로 가기
      </button>
      
      <!-- 홈으로 버튼 -->
      <button
        type="button"
        @click="goHome"
        aria-label="홈으로 가기"
        class="w-36 h-12 bg-kb-yellow text-white font-bold rounded-md shadow-lg hover:bg-kb-yellow hover:text-white focus:outline-none focus:ring-2 focus:ring-kb-yellow"
      >
        홈으로 가기
      </button>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  text-align: center;
}
</style>
