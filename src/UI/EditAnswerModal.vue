<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import type { IAnswer } from "@/types/answer";
import BgModal from "./BgModal.vue";

const props = defineProps<{
  answer: IAnswer;
  closeModal: () => void;
}>();

const emit = defineEmits<{
  (e: "saveAnswer", text: string): void;
}>();

const answer = computed(() => props.answer);
const textareaContent = ref(answer.value.text);

const textareaRefAnswer = ref<HTMLTextAreaElement | null>(null);

const saveAnswer = () => {
  emit("saveAnswer", textareaContent.value);
};

onMounted(() => {
  if (textareaRefAnswer.value) {
    textareaRefAnswer.value.style.height = "auto";
    textareaRefAnswer.value.style.height =
      textareaRefAnswer.value.scrollHeight + "px";
  }
});

watch(
  textareaContent,
  (next) => {
    if (next.length === 0 && textareaRefAnswer.value) {
      textareaRefAnswer.value.style.height = "35px";
      return;
    }
    if (textareaRefAnswer.value) {
      textareaRefAnswer.value.style.height = "auto";
      textareaRefAnswer.value.style.height =
        textareaRefAnswer.value.scrollHeight + "px";
    }
  },
  { deep: true }
);
</script>

<template>
  <BgModal @click.stop="closeModal" />
  <div class="answerText">
    <textarea
      class="input"
      ref="textareaRefAnswer"
      v-model="textareaContent"
      :class="{
        error: textareaContent.length === 0,
      }"
    ></textarea>
    <div class="btn" @click.stop="saveAnswer">Save</div>
  </div>
</template>

<style scoped>
.answerText {
  @apply fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[180] w-[90%] rounded p-2 flex flex-col gap-3 bg-white;
}

.input {
  @apply border-none p-2 rounded outline-none placeholder:text-[#475D60] placeholder:text-opacity-50 text-xl leading-[19.56px] ;
}
.error {
  @apply border-[#DE2929] placeholder:text-[#DE2929];
}

.btn {
  @apply w-full h-[40px] flex items-center justify-center bg-green-600 text-white font-bold text-xl rounded;
}
</style>
