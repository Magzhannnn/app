<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import BackBtn from "@/UI/BackBtn.vue";
import UserQuestion from "./UserQuestion.vue";
import OneQuestionAnswerItem from "./OneQuestionAnswer/OneQuestionAnswerItem.vue";
import { useQuestionStore } from "@/stores/questionsStore";
import type { IAnswer, IAnswerForm } from "@/types/answer";
import { addNewAnswer, getAnswers } from "@/api/answer";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import EmptyElem from "@/UI/EmptyElem.vue";
import type { IAuthor } from "@/types/user";
import { getQuestion } from "@/api/question";
import { uploadFile } from "@/api/uploadFile";
import { useErrorStore } from "@/stores/errorStore";

const errorStore = useErrorStore();

const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();
const questionStore = useQuestionStore();
const answerPictureUrls = ref<string[]>([]);

const page = ref(1);
const answers = ref<IAnswer[]>([]);

const questionId = route.params.id;

const getQuestionsAnswers = async () => {
  await getQuestion(questionId as string, authStore.accessToken)
    .then((res) => {
      questionStore.setChooseQuestion(res.device);

      getAnswers(page.value, questionId as string, authStore.accessToken)
        .then(({ response }) => {
          answers.value = [response.ai_answer, ...response.answers];
          answers.value.forEach((item) => {
            if (item.picture_urls) {
              item.picture_urls = item.picture_urls.filter(
                (elem) => elem.length > 0
              );
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

getQuestionsAnswers();

const setNewAnswer = async (
  userId: string,
  questionId: string,
  text: string,
  picture_urls: string[]
) => {
  const saveAsk: IAnswerForm = {
    text,
    user_id: userId,
    question_id: questionId,
    parent_answer_id: null,
    picture_urls,
  };

  await addNewAnswer(saveAsk, authStore.accessToken)
    .then((res) => {
      console.log(res);
      if (
        "response" in res &&
        res.response.status >= 400 &&
        res.response.status < 500
      ) {
        errorStore.setErrorData(res.response.data.message, true);
        return;
      }

      const author: IAuthor | null = JSON.parse(
        localStorage.getItem("user") ?? "null"
      );

      if (author) {
        answers.value.push({ ...res, author });
        questionStore.setIncrementQuestionTotalAnswers(questionId);
      }
    })
    .catch((error) => {
      console.log(error);
      errorStore.setErrorData(error.response.data.message, true);
    });
};

const inputDataHandle = (text: string, images: File[]) => {
  const accessToken = authStore.accessToken.toString();

  Promise.all(images.map((item) => uploadFile(item, accessToken)))
    .then((res) => {
      answerPictureUrls.value = res.map((item) => item.link);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setNewAnswer(
        userStore.getUserData.id,
        questionId as string,
        text,
        answerPictureUrls.value
      );
    });
};

const changeAnswerHandle = (answer: IAnswer) => {
  answers.value = answers.value.map((item) =>
    item.id === answer.id ? answer : item
  );
};
const deleteAnswerHandle = (answerId: string) => {
  answers.value = answers.value.filter((item) => item.id !== answerId);
};
</script>

<template>
  <div class="one-question_header">
    <BackBtn />
    <UserQuestion
      v-if="questionStore.chooseQuestion"
      user-name=""
      :author-id="questionStore.chooseQuestion.author.id"
      :question-text="questionStore.chooseQuestion.title.toString()"
      :question-subtext="questionStore.chooseQuestion.description"
      :pictures="questionStore.chooseQuestion.picture_urls"
    />
  </div>

  <div class="answer_list" v-if="answers.length > 0">
    <OneQuestionAnswerItem
      v-for="(item, idx) in answers"
      :key="item.id"
      :id="idx"
      :answer="item"
      @input-data="inputDataHandle"
      :is-my-answer="
        item.author &&
        userStore.getUserData &&
        item.author.id === userStore.getUserData.id
      "
      @change-answer="changeAnswerHandle"
      @delete-answer="deleteAnswerHandle"
    >
      <EmptyElem title="There's no answer here" v-if="answers.length < 2" />
    </OneQuestionAnswerItem>
  </div>
</template>

<style scoped>
.one-question_header {
  @apply flex flex-col gap-2 px-4 mb-5;
}

.answer_list {
  @apply flex flex-col gap-5 mb-[70px];
}
</style>
