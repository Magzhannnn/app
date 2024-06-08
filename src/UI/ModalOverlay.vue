<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useErrorStore } from "@/stores/errorStore";

const router = useRouter();
const errorStore = useErrorStore();

const onClose = () => {
  errorStore.setErrorData("", false);
};

watch(
  () => errorStore.errorData,
  () => {
    if (errorStore.errorData.isVisible) {
      setTimeout(() => {
        onClose();
        router.push({ name: "premium" });
      }, 600);
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    class="modalOverlay"
    :class="{ visible: errorStore.errorData.isVisible }"
  >
    <span class="title">{{ errorStore.errorData.message }}!</span>
    <span class="closeBtn" @click="onClose">X</span>
  </div>
</template>

<style scoped>
.modalOverlay {
  @apply w-[260px] h-[50px] absolute -top-[50px] right-[15px] pl-4 flex items-center font-medium text-xl bg-white border border-red-400 rounded-xl transition-all duration-300;
}

.closeBtn {
  @apply absolute top-[2px] right-[8px];
}

.visible {
  @apply top-[30px];
}
</style>
