import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useDebounce } from "@/hooks/useDebounce";
import type { ICategory } from "@/types/category";
import { useAuthStore } from "./authStore";
import { getCategories } from "@/api/category";
import { useQuestionStore } from "./questionsStore";

export const useCategoryStore = defineStore("category", () => {
  const authStore = useAuthStore();
  const questionStore = useQuestionStore();

  const page = ref(1);
  const allCategory = ref<ICategory[]>([]);
  const categorySortedType = ref("alphabet");
  const chooseCategory = ref<ICategory | null>(null);

  const { debounceValue: searchCategoryOfTitle, updateDebounceValue } =
    useDebounce<string>("");

  const setSearchCategoryOfTitle = (text: string) => {
    page.value = 1;
    updateDebounceValue(text);
  };

  const setCategorySortedType = (type: string) => {
    categorySortedType.value = type;
  };

  const setNewPage = () => {
    page.value++;
    getCategory();
  };

  const setChooseCategory = (category: ICategory) => {
    updateDebounceValue("");
    chooseCategory.value = category;
  };

  const getCategory = () => {
    getCategories(
      page.value,
      authStore.accessToken,
      searchCategoryOfTitle.value
    )
      .then(({ response }) => {
        // allCategory.value = [...response.categories, ...categories];
        allCategory.value = response.categories;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  watch(
    searchCategoryOfTitle,
    () => {
      getCategory();
    },
    { deep: true }
  );

  return {
    allCategory,
    setSearchCategoryOfTitle,
    categorySortedType,
    setCategorySortedType,
    getCategory,
    setNewPage,
    chooseCategory,
    setChooseCategory,
  };
});
