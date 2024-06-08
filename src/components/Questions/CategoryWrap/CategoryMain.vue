<script setup lang="ts">
import { useRouter } from "vue-router";
import arrowSvg from "@/assets/svgData/arrowSvg.svg";
import { useCategoryStore } from "@/stores/categoryStore";
import { onMounted, onUnmounted, ref } from "vue";
import type { ICategory } from "@/types/category";

const scrollData = ref<HTMLElement | null>(null);

const router = useRouter();
const categoryStore = useCategoryStore();

const chooseQuestionCategory = (item: ICategory) => {
  categoryStore.setChooseCategory(item);
  router.push({
    name: "questionCategory",
    params: { categoryId: item.id },
  });
};

const getStartCategory = () => {
  categoryStore.getCategory();
};

getStartCategory();

const loadMoreCategory = () => {
  categoryStore.setNewPage();
};

const handleScroll = () => {
  let element = scrollData.value;
  if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
    loadMoreCategory();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <main class="main">
    <p class="main_text">
      Choose the category in which you want to see the questions and answers
      about laundry
    </p>
    <div ref="scrollContainer">
      <div class="main_category_list hideScroll">
        <div
          v-for="item in categoryStore.allCategory"
          :key="item.id"
          class="main_category_item"
          @click.stop="() => chooseQuestionCategory(item)"
        >
          <div class="category_item_text">{{ item.title }}</div>
          <div class="category_item_btn">
            <img :src="arrowSvg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  @apply flex flex-col gap-6;
}

.main_text {
  @apply text-sm text-[#475D60] leading-[16.94px];
}

.main_category_list {
  @apply flex flex-col gap-4 overflow-auto h-[74vh] pb-16;
}

.main_category_item {
  box-shadow: 2px 2px 10px 0px #ebebeb;

  @apply flex items-center justify-between py-[10px] pl-[14px] bg-[#FAFCFC] rounded-md;
}

.category_item_text {
  @apply text-base;
}

.category_item_btn {
  @apply w-[40px] h-[40px] flex items-center justify-center;
}
</style>
