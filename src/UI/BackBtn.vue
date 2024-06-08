<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

defineProps<{
  color?: string;
}>();

const route = useRoute();
const router = useRouter();

const openRouter = () => {
  if (route.name === "questionSuccessfull") {
    router.push({ name: "category" });
    return;
  }

  router.go(-1);
};
</script>

<template>
  <p @click="openRouter" class="backBtn">
    <svg
      width="4"
      height="6"
      viewBox="0 0 4 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 0.509766L2.15395 1.35465C1.38465 2.12289 1 2.50701 1 2.9999C1 3.49279 1.38465 3.87691 2.15394 4.64515L3 5.49003"
        :stroke="color === 'white' ? '#FAFCFC' : '#143237'"
        stroke-linecap="round"
      />
    </svg>
    <span class="backBtnText" :class="{ whiteText: color === 'white' }"
      >Back</span
    >
  </p>
</template>

<style scoped>
.backBtn {
  @apply flex items-center gap-[5px];
}

.backBtnText {
  @apply text-[10px] leading-[12.1px] font-bold text-[#143237];
}

.whiteText {
  @apply text-[#FAFCFC]
}
</style>
