<script setup lang="ts">
import chatGPT from "@/assets/svgData/ChatGPT.svg";
import arrowSvg from "@/assets/svgData/arrowSvg.svg";
import commentSvg from "@/assets/svgData/commentSvg.svg";
import QuestionVoice from "./QuestionVoice/QuestionVoice.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserQuestion from "./UserQuestion.vue";
import type { reaction, IQuestion } from "@/types/questions";
import { useQuestionStore } from "@/stores/questionsStore";
import EmptyElem from "@/UI/EmptyElem.vue";
import { useLoadingStore } from "@/stores/loadingStore";
import Loader from "@/UI/Loader.vue";
import { axiosInstance } from "@/utils/axiosInstance";
import { useUserStore } from "@/stores/userStore";
import { setQuestionReaction } from "@/api/question";
import type { IUser } from "@/types/user";
import { useAuthStore } from "@/stores/authStore";
import { useErrorStore } from "@/stores/errorStore";

const errorStore = useErrorStore();

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const questionStore = useQuestionStore();

const helperFavoriteQuestion = async (type: reaction, question: IQuestion) => {
  const userData: IUser | null = userStore.getUserData;

  if (!userData) return;

  await setQuestionReaction(
    type,
    question,
    userData.id,
    authStore.accessToken.toString()
  )
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

      questionStore.setQuestionReaction(type, res);
    })
    .catch((err) => {
      console.log(err);
      errorStore.setErrorData(err.response.data.message, true);
    });
};

const onLikeHandle = (question: IQuestion) => {
  helperFavoriteQuestion("like", question);
};

const onDisLikeHandle = (question: IQuestion) => {
  helperFavoriteQuestion("dislike", question);
};

const openOneQuestionHandle = (question: IQuestion) => {
  questionStore.setChooseQuestion(question);
  router.push({ name: "oneQuestion", params: { id: question.id } });
};
</script>

<template>
  <section class="main hideScroll">
    <Loader v-if="loadingStore.isLoading" />
    <div
      v-else-if="questionStore.allQuestion.length > 0"
      class="question_item"
      v-for="item in questionStore.allQuestion"
      :key="item.id"
    >
      <h3 class="category_title">/ {{ item.category.title }}</h3>
      <UserQuestion
        :user-name="item.author ? item.author.username : ''"
        :question-text="item.title"
        :question-subtext="item.description"
      />
      <div class="answer">
        <p class="answer_head">
          <img :src="chatGPT" alt="chatOpenAI" class="answer_icon" />
          <span class="answer_title">LaundromatAI says</span>
        </p>
        <p class="answer_text" v-if="item.ai_answer">
          <!-- “{{ item.ai_answer.text.split(" ").slice(0, 13).join(" ") }}...” -->
          “{{ item.ai_answer.text }}”
        </p>
        <p class="answer_btn" @click="() => openOneQuestionHandle(item)">
          <span>See all answers</span>
          <img :src="arrowSvg" alt="arrowSvg" />
        </p>
      </div>
      <div class="question_footer">
        <div
          class="question_comment"
          @click="() => openOneQuestionHandle(item)"
        >
          <img :src="commentSvg" alt="commentSvg" />
          <span>{{ item.total_answers }}</span>
        </div>
        <QuestionVoice
          :is-like-count="item.type"
          :dis-like-count="item.total_dislikes"
          :like-count="item.total_likes"
          :on-dis-like="() => onDisLikeHandle(item)"
          :on-like="() => onLikeHandle(item)"
        />
      </div>
    </div>
    <EmptyElem v-else title="There's no question here" />
  </section>
</template>

<style scoped>
.main {
  @apply flex flex-col gap-5 mb-16 overflow-auto h-[80vh];
}

.question_item {
  box-shadow: 2px 2px 10px 0px #ebebeb;

  @apply w-full px-4 py-5 bg-white flex flex-col gap-[18px];
}

.category_title {
  @apply text-[10px] font-bold text-[#C3D2D4];
}

.answer {
  @apply flex flex-col gap-2;
}

.answer_head {
  @apply flex items-center justify-start gap-2;
}

.answer_icon {
  border-radius: 3px 3px 0px 3px;

  @apply w-[13px] h-[13px];
}

.answer_title {
  @apply font-bold text-[12px] leading-[14.1px] text-[#143237];
}

.answer_text {
  @apply ml-[21px] text-base leading-[19.96px] text-[#475D60];
}

.answer_btn {
  @apply text-sm leading-[16.94px] w-full text-right text-[#6DC5D3] flex items-center justify-end gap-2;
}

.question_footer {
  @apply flex items-center justify-between;
}

.question_voice {
  @apply flex items-center gap-5;
}

.question_comment,
.question_like,
.question_disLike {
  @apply flex items-center gap-1;
}
</style>
