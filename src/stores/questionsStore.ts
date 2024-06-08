import { useCategoryStore } from "./categoryStore";
import { useLoadingStore } from "./loadingStore";
import type {
  IQuestion,
  IQuestionReaction,
  reaction,
} from "./../types/questions";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useDebounce } from "@/hooks/useDebounce";
import { getQuestions } from "@/api/question";
import { useAuthStore } from "./authStore";

export const useQuestionStore = defineStore("question", () => {
  const authStore = useAuthStore();
  const loadingStore = useLoadingStore();
  const categoryStore = useCategoryStore();

  const page = ref(1);
  const questionSortedType = ref("allTime");
  const allQuestion = ref<IQuestion[]>([]);
  const chooseQuestion = ref<IQuestion | null>(null);

  const { debounceValue: searchQuestionOfTitle, updateDebounceValue } =
    useDebounce<string>("");

  const setSearchQuestionOfTitle = (text: string) => {
    page.value = 1;
    updateDebounceValue(text);
  };

  const setQuestionSortedType = (type: string) => {
    questionSortedType.value = type;
  };

  const setNewQuestion = (newQuestion: IQuestion) => {
    allQuestion.value.push(newQuestion);
  };

  const setEditQuestion = (editQuestion: IQuestion) => {
    allQuestion.value = allQuestion.value.map((item: IQuestion) =>
      item.id === editQuestion.id ? editQuestion : item
    );
  };

  const setIncrementQuestionTotalAnswers = (questionId: string) => {
    allQuestion.value.forEach((item: IQuestion) => {
      if (item.id === questionId) {
        item.total_answers = item.total_answers + 1;
      }
    });
  };

  const setChooseQuestion = (chooseQuest: IQuestion) => {
    chooseQuest.picture_urls =
      chooseQuest.picture_urls &&
      chooseQuest.picture_urls.filter((item) => item.length > 0);

    chooseQuestion.value = chooseQuest;
  };

  const deleteQuestion = (questionId: string) => {
    allQuestion.value = allQuestion.value.filter(
      (item: IQuestion) => item.id != questionId
    );
  };

  const getAllQuestion = async (categoryId: string) => {
    if (!categoryId) return;

    loadingStore.setIsLoading(true);

    getQuestions(
      page.value,
      categoryId,
      authStore.accessToken,
      searchQuestionOfTitle.value
    )
      .then(({ response }) => {
        allQuestion.value = response.questions;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingStore.setIsLoading(false);
      });
  };

  const setQuestionReaction = (type: reaction, question: IQuestionReaction) => {
    allQuestion.value = allQuestion.value.map((item: IQuestion) =>
      item.id === question.question_id
        ? {
            ...item,
            total_likes: question.total_likes,
            total_dislikes: question.total_dislikes,
            type,
          }
        : item
    );
  };

  watch(searchQuestionOfTitle, () => {
    if (categoryStore.chooseCategory)
      getAllQuestion(categoryStore.chooseCategory.id);
  });

  return {
    allQuestion,
    searchQuestionOfTitle,
    setSearchQuestionOfTitle,
    questionSortedType,
    setQuestionSortedType,
    setNewQuestion,
    setEditQuestion,
    getAllQuestion,
    chooseQuestion,
    setChooseQuestion,
    deleteQuestion,
    setIncrementQuestionTotalAnswers,
    setQuestionReaction,
  };
});
