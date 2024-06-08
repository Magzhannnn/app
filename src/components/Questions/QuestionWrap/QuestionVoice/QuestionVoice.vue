<script setup lang="ts">
import type { reaction } from "@/types/questions";
import { computed } from "vue";
import QuestionDisLike from "./QuestionDisLike.vue";
import QuestionLike from "./QuestionLike.vue";

const props = defineProps<{
  isLikeCount: reaction;
  likeCount: number;
  onLike: () => void;
  disLikeCount: number;
  onDisLike: () => void;
}>();

// const disLikeCount = computed(() => {
//   if (props.isLikeCount === "disLike") {
//     return props.disLikeCount + 1;
//   }

//   return props.disLikeCount;
// });

// const likeCount = computed(() => {
//   if (props.isLikeCount === "like") {
//     return props.likeCount + 1;
//   }

//   return props.likeCount;
// });
</script>

<template>
  <div class="question_voice">
    <QuestionDisLike
      @click="onDisLike"
      :is-like-count="isLikeCount"
      :dis-like-count="disLikeCount"
    />
    <QuestionLike
      @click="onLike"
      :is-like-count="isLikeCount"
      :like-count="likeCount"
    />
  </div>
</template>

<style scoped>
.question_voice {
  @apply flex items-center gap-5;
}

.svg_btn {
  @apply flex items-center justify-center;
}

.question_comment {
  @apply flex items-center gap-1;
}
</style>
