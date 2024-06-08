<script setup lang="ts">
import { ref, watch } from "vue";
import { useQuestionStore } from "@/stores/questionsStore";
import InputAndFilterData from "@/UI/InputAndFilterData.vue";
import type { IFilterCoordinates } from "@/types/questions";
import { useCategoryStore } from "@/stores/categoryStore";

const questionStore = useQuestionStore();
const categoryStore = useCategoryStore();

const inputText = ref("");
const isFilterCategory = ref(false);
const filterCategoryOffsetInfo = ref<IFilterCoordinates>({ top: 0, left: 0 });

watch(inputText, () => {
  categoryStore.setSearchCategoryOfTitle(inputText.value);
});

const inputTextHandle = (text: string) => {
  inputText.value = text;
};

const openFilterOptionHandle = (filterCoordinates: IFilterCoordinates) => {
  isFilterCategory.value = true;
  filterCategoryOffsetInfo.value = filterCoordinates;
};

const closeFilterOption = () => {
  isFilterCategory.value = false;
  filterCategoryOffsetInfo.value = { top: 0, left: 0 };
};

const onSelectFilterCategoryItem = (filterType: string) => {
  questionStore.setQuestionSortedType(filterType);
  closeFilterOption();
};

window.addEventListener("click", () => {
  closeFilterOption();
});

</script>

<template>
  <InputAndFilterData
    placeholder="Search a category"
    @open-filter-option="openFilterOptionHandle"
    @input-text="inputTextHandle"
  >
    <div
      v-if="isFilterCategory"
      class="filter-category_list"
      :style="{
        top: `${filterCategoryOffsetInfo.top}px`,
        left: `${filterCategoryOffsetInfo.left}px`,
      }"
    >
      <div
        class="filter-category_item rounded-[5px]"
        @click.stop="() => onSelectFilterCategoryItem('alphabet')"
        :class="{ active: questionStore.questionSortedType === 'alphabet' }"
      >
        A - Z
      </div>
      <!-- <div
        class="filter-category_item rounded-t-[5px]"
        @click.stop="() => onSelectFilterCategoryItem('alphabet')"
        :class="{ active: questionStore.questionSortedType === 'alphabet' }"
      >
        A - Z
      </div>
      <div
        class="filter-category_item"
        @click.stop="() => onSelectFilterCategoryItem('new')"
        :class="{ active: questionStore.questionSortedType === 'new' }"
      >
        New
      </div>
      <div
        class="filter-category_item rounded-b-[5px]"
        @click.stop="() => onSelectFilterCategoryItem('old')"
        :class="{ active: questionStore.questionSortedType === 'old' }"
      >
        Old
      </div> -->
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
</style>
