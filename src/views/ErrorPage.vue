<script setup lang="ts">
import { useRouter } from "vue-router";
import arrow from "@/assets/img/arrow-50.png";
import errorSvg from "@/assets/svgData/errorSvg.svg";

const router = useRouter();

const goBack = () => {
  router.push({ name: "premium" });
};
</script>

<template>
  <div class="wrap">
    <div><img :src="errorSvg" alt="success" class="img" /></div>
    <div class="title">Transaction Completed In Error</div>
    <div class="btn" @click="goBack">
      <img :src="arrow" alt="arrow" class="w-[26px] h-[26px]" />
      <span>Go back</span>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  @apply flex flex-col items-center justify-center gap-10 absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full;
}

.img {
  @apply w-[200px] h-[200px];
}

.title {
  @apply font-bold text-[22px];
}

.btn {
  @apply w-[150px] h-[40px] text-xl rounded-xl flex items-center justify-center gap-3 bg-[#e6572b] text-white;
}
</style>
