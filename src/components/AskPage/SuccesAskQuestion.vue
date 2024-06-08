<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goCategoryHandle = () => {
  router.push({ name: "category" });
};
</script>

<template>
  <p class="title">
    Thank you for your question! It was published successully!
  </p>
  <p class="textGPT" @click="goCategoryHandle">
    See the answer from Laundromat AI
  </p>
</template>

<style scoped>
.title {
  @apply text-sm leading-[16.94px] w-[202px] font-bold text-[#143237];
}

.textGPT {
  @apply text-sm leading-[16.94px]  text-[#6DC5D3];
}
</style>
