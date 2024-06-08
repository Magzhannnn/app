<script setup lang="ts">
import { deleteQuestion } from "@/api/question";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { useQuestionStore } from "@/stores/questionsStore";
import HelperText from "@/UI/HelperText.vue";
import SettingsModal from "@/UI/SettingsModal.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  userName: string;
  questionText: string;
  questionSubtext: string;
  authorId?: string;
  pictures: string[];
}>();

const authStore = useAuthStore();
const questionStore = useQuestionStore();

const route = useRoute();

const isOpenSetting = ref(false);
const isDeleteQuestion = ref(false);

const myUser = JSON.parse(localStorage.getItem("user") ?? "null");

const openSettingsHandle = () => {
  isOpenSetting.value = true;
};

window.addEventListener("click", () => {
  isOpenSetting.value = false;
});

const editItemHandle = () => {
  router.push({ name: "editQuestion" });
};

const deleteItemHandle = async () => {
  resetData();
  isDeleteQuestion.value = true;
};

const deleteQuestionHandle = async () => {
  await deleteQuestion(route.params.id, authStore.accessToken)
    .then((res) => {
      questionStore.deleteQuestion(route.params.id);
      router.push({ name: "questionCategory" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const resetData = () => {
  isOpenSetting.value = false;
  isDeleteQuestion.value = false;
};
</script>

<template>
  <div class="user_question_wrap">
    <div class="user_question">
      <p class="user_name">{{ userName }}</p>
      <h2 class="question_text">
        {{ questionText }}
      </h2>
      <p
        class="question_subtext"
        :class="{ oneQuestion: route.name === 'oneQuestion' }"
      >
        {{ questionSubtext }}
      </p>
      <img
        v-for="picture in pictures"
        :src="`https://${picture}`"
        alt="Image"
        class="img"
      />
    </div>
    <div class="right-item">
      <div class="mt-[10px]">
        <SettingsModal
          v-if="isOpenSetting"
          :edit-item="editItemHandle"
          :delete-item="deleteItemHandle"
        />
      </div>
      <div
        class="user_question-settings"
        v-if="
          route.name === 'oneQuestion' &&
          myUser &&
          authorId &&
          myUser.id === authorId
        "
        @click.stop="openSettingsHandle"
      >
        ...
      </div>
    </div>
  </div>
  <HelperText
    title="question"
    :delete-handle="deleteQuestionHandle"
    :close-modal="resetData"
    v-if="isDeleteQuestion"
  />
</template>

<style scoped>
.user_question_wrap {
  @apply flex items-start justify-between;
}

.user_question {
  @apply flex flex-col gap-2 text-[#143237] w-full;
}

.user_name {
  @apply text-xs leading-[14.52px] font-semibold;
}

.question_text {
  @apply text-base leading-[19.36px] font-bold;
}

.question_subtext {
  word-wrap: break-word;

  @apply text-sm leading-[16.94px] text-[#475D60] w-[300px];
}

.oneQuestion {
  @apply w-[250px];
}

.img {
  @apply w-full h-[160px] object-cover rounded-[10px];
}

.right-item {
  @apply flex items-start justify-start gap-3;
}

.user_question-settings {
  @apply box-content;
}
</style>
