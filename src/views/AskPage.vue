<script setup lang="ts">
import AskPageWrap from "@/components/AskPage/AskPageWrap.vue";
import { useCategoryStore } from "@/stores/categoryStore";

const categoryStore = useCategoryStore();

const getStartCategory = () => {
  categoryStore.setSearchCategoryOfTitle("");
  categoryStore.getCategory();
};

getStartCategory();
</script>

<template>
  <AskPageWrap />
</template>
