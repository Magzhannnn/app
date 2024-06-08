<script setup lang="ts">
import QuestionWrap from "@/components/Questions/QuestionWrap/QuestionWrap.vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "@/stores/questionsStore";

const route = useRoute();

const questionStore = useQuestionStore();

const getStartQuestion = () => {
  questionStore.setSearchQuestionOfTitle("");
  questionStore.getAllQuestion(route.params.categoryId);
};

getStartQuestion();
</script>

<template>
  <QuestionWrap />
</template>
