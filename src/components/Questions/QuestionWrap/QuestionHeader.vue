<script setup lang="ts">
import { ref, watch } from "vue";
import InputAndFilterData from "@/UI/InputAndFilterData.vue";
import type { IFilterCoordinates } from "@/types/questions";
import { useQuestionStore } from "@/stores/questionsStore";
import questionSortedTypes from "@/data/questionSortedTypes.json";

// const filterQuestionTest = ref("allTime");
const questionStore = useQuestionStore();

const inputText = ref("");
const isFilterQuestion = ref(false);
const filterQuestionOffsetInfo = ref<IFilterCoordinates>({ top: 0, left: 0 });

const inputTextHandle = (text: string) => {
  inputText.value = text;
  questionStore.setSearchQuestionOfTitle(text)
};

const openFilterOptionHandle = (filterCoordinates: IFilterCoordinates) => {
  isFilterQuestion.value = true;
  filterQuestionOffsetInfo.value = {
    ...filterCoordinates,
    left: filterCoordinates.left - 41,
  };
};

const closeFilterOption = () => {
  isFilterQuestion.value = false;
  filterQuestionOffsetInfo.value = { top: 0, left: 0 };
};

const onSelectFilterQuestionItem = (filterType: string) => {
  questionStore.setQuestionSortedType(filterType);
  closeFilterOption();
};

window.addEventListener("click", () => {
  closeFilterOption();
});
</script>

<template>
  <InputAndFilterData
    placeholder="Search a question"
    @open-filter-option="openFilterOptionHandle"
    @input-text="inputTextHandle"
  >
    <div
      v-if="isFilterQuestion"
      class="filter-category_list"
      :style="{
        top: `${filterQuestionOffsetInfo.top}px`,
        left: `${filterQuestionOffsetInfo.left}px`,
      }"
    >
      <div
        v-for="(item, idx) in questionSortedTypes"
        :key="item.label"
        class="filter-category_item"
        @click.stop="() => onSelectFilterQuestionItem(item.label)"
        :class="{
          active: questionStore.questionSortedType === item.label,
          roundedTop: idx === 0,
          roundedBottom: idx === questionSortedTypes.length - 1,
        }"
      >
        {{ item.title }}
      </div>
    </div>
  </InputAndFilterData>
</template>

<style scoped>
.filter-category_list {
  box-shadow: 2px 2px 10px 0px #c4c4c4;

  @apply flex flex-col justify-center items-center w-max rounded-[5px] fixed bg-[#FAFCFC];
}

.filter-category_item {
  @apply py-[6px] px-[14px] text-xs leading-[14.52px] w-full text-center;
}

.active {
  @apply bg-[#6DC5D3];
}

.roundedTop {
  @apply rounded-t-[5px];
}

.roundedBottom {
  @apply rounded-b-[5px];
}
</style>
