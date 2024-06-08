<script setup lang="ts">
import BgModal from "./BgModal.vue";

const props = defineProps<{
  title: string;
  deleteHandle: () => void;
  closeModal: () => void;
}>();
</script>

<template>
  <BgModal @click.stop="closeModal" />
  <div class="answerText">
    <p class="title">Are you sure you want to delete the {{ title }}?</p>
    <div class="btns">
      <div class="btn yesBtn" @click.stop="deleteHandle">Yes</div>
      <div class="btn noBtn" @click.stop="closeModal">No</div>
    </div>
  </div>
</template>

<style scoped>
.answerText {
  @apply fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[180] w-[90%] rounded p-2 flex flex-col gap-3 bg-white;
}

.title {
  @apply text-2xl font-bold text-center;
}

.btns {
  @apply flex items-center justify-between gap-4;
}

.btn {
  @apply w-full h-[40px] flex items-center justify-center text-white font-bold text-xl rounded;
}

.yesBtn {
  @apply bg-green-600;
}

.noBtn {
  @apply bg-red-600;
}
</style>
