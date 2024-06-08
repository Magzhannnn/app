<script setup lang="ts">
import { ref, watch } from "vue";
import filterSvg from "@/assets/svgData/filterSvg.svg";
import type { IFilterCoordinates } from "@/types/questions";

const props = defineProps<{
  placeholder: string;
}>();

interface IInputAndFilterDataEmit {
  (e: "inputText", text: string): void;
  (e: "openFilterOption", data: IFilterCoordinates): void;
}

const emit = defineEmits<IInputAndFilterDataEmit>();

const inputText = ref("");

watch(inputText, () => {
  emit("inputText", inputText.value);
});

const onFilterQuestion = () => {
  const element = document.getElementById("filter_question");

  if (element) {
    const data = { top: element.offsetTop + 53, left: element.offsetLeft };
    emit("openFilterOption", data);
  }
};
</script>

<template>
  <header class="header">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="inputText"
      class="input"
    />
    <div class="filter" id="filter_question" @click.stop="onFilterQuestion">
      <img :src="filterSvg" alt="" />
    </div>
  </header>
  <slot></slot>
</template>

<style scoped>
.header {
  @apply mt-8 flex gap-[7px] items-center mb-10;
}

.input {
  box-shadow: 2px 2px 10px 0px #ebebeb;

  @apply py-2.5 px-4 rounded-[100px] text-[#C3D2D4] placeholder:text-[#C3D2D4] text-sm w-full outline-none;
}

.filter {
  box-shadow: 2px 2px 10px 0px #ebebeb;

  @apply px-[19px] py-[13px] rounded-[100px];
}
</style>
