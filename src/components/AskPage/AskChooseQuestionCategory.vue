<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { allQuestionCategory } from "@/helpers/questionHelpers";
import { useCategoryStore } from "@/stores/categoryStore";
import type { ICategory } from "@/types/category";

const categoryStore = useCategoryStore();

const props = defineProps<{
  title: string;
  isEmpty: boolean;
  isSelectedTextArea: boolean;
}>();

const emit = defineEmits<{
  (e: "selectCategoryId", selectQuestionCategory: string): void;
  (e: "openSelect"): void;
}>();

const isSelectQuestionCategory = ref(false);
const selectRef = ref<HTMLDivElement | null>(null);
const selectedQuestionCategory = ref<ICategory>({
  id: "unselected",
  title: "Not selected",
  isSelected: false,
});

emit("selectCategoryId", selectedQuestionCategory.value.id);

const allQuestionCategoryAndSelect = computed(() => {
  return allQuestionCategory(
    isSelectQuestionCategory.value,
    selectedQuestionCategory.value,
    categoryStore.allCategory
  );
});

const onChooseQuestionCategory = (item: ICategory) => {
  if (selectRef.value) {
    selectRef.value.style.height = "auto";
  }

  if (!isSelectQuestionCategory.value) {
    isSelectQuestionCategory.value = true;
    emit("openSelect");
    return;
  }

  selectedQuestionCategory.value = { ...item, isSelected: false };
  isSelectQuestionCategory.value = false;
};

watch(selectedQuestionCategory, () => {
  emit("selectCategoryId", selectedQuestionCategory.value.id);
});

watch(
  () => props.isSelectedTextArea,
  () => {
    if (props.isSelectedTextArea) {
      isSelectQuestionCategory.value = false;
    }
  }
);

window.addEventListener("click", () => {
  isSelectQuestionCategory.value = false;
});
</script>

<template>
  <div class="select_wrap">
    <h3 class="title">{{ title }}</h3>
    <div
      class="select"
      ref="selectRef"
      :class="{
        isSelected: isSelectQuestionCategory,
        error: isEmpty,
      }"
    >
      <div
        v-for="(item, idx) in allQuestionCategoryAndSelect"
        :key="item.id"
        class="category"
        :class="{
          lastItem: idx === allQuestionCategoryAndSelect.length - 1,
          otherItem: isSelectQuestionCategory,
          selected: item.isSelected,
          error: isEmpty,
        }"
        @click.stop="onChooseQuestionCategory(item)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.select_wrap {
  @apply flex flex-col gap-2.5 w-full;
}

.title {
  @apply text-sm leading-[16.94px] font-bold text-[#143237];
}

.select {
  @apply text-sm leading-[16.94px] border border-[#C3D2D4] rounded-md h-[35px];
}

.isSelected {
  @apply border-[#6DC5D3];
}

.category {
  @apply text-[#143237] text-base leading-[19.36px] pt-[6px] pb-2 px-6;
}

.lastItem {
  @apply rounded-b-[5px];
}

.selected {
  @apply bg-[#6DC5D3];
}

.error {
  @apply border-[#DE2929] text-[#DE2929];
}
</style>
