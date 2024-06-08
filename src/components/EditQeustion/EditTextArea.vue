<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  title: string;
  isEmpty: boolean;
  placeholder: string;
  isSelectedTextArea: boolean;
  onClickTextArea: () => void;
  startData: string;
}>();

const emit = defineEmits<{
  (e: "inputText", text: string): void;
}>();

const textareaContent = ref(props.startData);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

watch(textareaContent, (next) => {
  emit("inputText", textareaContent.value);

  if (next.length === 0 && textareaRef.value) {
    textareaRef.value.style.height = "35px";
    return;
  }
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
  }
});
</script>

<template>
  <div class="textarea_wrap">
    <h3 class="title">{{ title }}</h3>
    <textarea
      @click.stop="onClickTextArea"
      class="input"
      ref="textareaRef"
      v-model="textareaContent"
      :placeholder="placeholder"
      :class="{
        error: isEmpty,
        isSelected: isSelectedTextArea,
      }"
    ></textarea>
  </div>
</template>

<style scoped>
.textarea_wrap {
  @apply flex flex-col gap-2.5 w-full;
}

.title {
  @apply text-sm leading-[16.94px] font-bold text-[#143237];
}

.input {
  @apply text-sm leading-[16.94px] py-2 px-6 placeholder:text-[#C3D2D4] border border-[#C3D2D4] rounded-md outline-none h-[35px];
}

.isSelected {
  @apply border-[#6DC5D3];
}

.error {
  @apply border-[#DE2929] placeholder:text-[#DE2929];
}
</style>
