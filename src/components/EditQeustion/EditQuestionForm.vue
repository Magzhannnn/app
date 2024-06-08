<script setup lang="ts">
import Loader from "@/UI/Loader.vue";
import EditTextArea from "./EditTextArea.vue";
import EditChooseQuestionCategory from "./EditChooseQuestionCategory.vue";
import SendAndAddImgBtns from "@/UI/SendAndAddImgBtns.vue";
import { ref, watch } from "vue";
import type { IQuestion } from "@/types/questions";
import {
  helperStartQuestionData,
  validateNewQuestionData,
} from "@/helpers/questionHelpers";
import { useQuestionStore } from "@/stores/questionsStore";
import { useRouter } from "vue-router";
import { editQuestion } from "@/api/question";
import { useAuthStore } from "@/stores/authStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { useErrorStore } from "@/stores/errorStore";

const errorStore = useErrorStore();

const router = useRouter();

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const questionStore = useQuestionStore();

const imgData = ref();
const sendCount = ref(0);
const isSelectedTextArea = ref("");
const editQuestionData = ref<IQuestion>(questionStore.chooseQuestion);

const resetSendCount = () => {
  if (sendCount.value !== 0) {
    sendCount.value = 0;
  }
};

const inputQuestionDataHandle = (data: string, key: string) => {
  if (!editQuestionData.value) return;
  resetSendCount();

  switch (key) {
    case "title":
      editQuestionData.value.title = data;
      break;
    case "describe":
      editQuestionData.value.description = data;
      break;
    case "category_id":
      editQuestionData.value.category_id = data;
      break;
  }
};

const onSendEditQuestion = async () => {
  if (!editQuestionData.value) return;

  sendCount.value++;

  const resultValidate = validateNewQuestionData(editQuestionData.value);

  if (resultValidate) {
    sendCount.value = 0;
    loadingStore.setIsLoading(true);

    editQuestion(editQuestionData.value, authStore.accessToken)
      .then((res: IQuestion) => {
        questionStore.setEditQuestion(res);
        loadingStore.setIsLoading(false);
        router.go(-1);
      })
      .catch((error) => {
        errorStore.setErrorData(error.response.data.message, true);
      })
      .finally(() => {
        loadingStore.setIsLoading(false);
      });
  }
};

const onFileChange = (e: Event) => {
  const fileInput = e.target as HTMLInputElement;

  if (fileInput.files && fileInput.files[0]) {
    sendCount.value = 0;
    const reader = new FileReader();

    reader.onload = (e) => {
      imgData.value = e.target?.result as string;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
};

const openTextAreaHandle = (text: string) => {
  isSelectedTextArea.value = text;

  resetSendCount();
};

const openSelectHandle = () => {
  isSelectedTextArea.value = "";

  resetSendCount();
};

window.addEventListener("click", () => {
  isSelectedTextArea.value = "";
});
</script>

<template>
  <EditTextArea
    title="Edit your question"
    :on-click-text-area="() => openTextAreaHandle('title')"
    :is-selected-text-area="isSelectedTextArea === 'title'"
    :is-empty="editQuestionData.title.length === 0 && sendCount > 0"
    placeholder="Type question here..."
    @input-text="(data) => inputQuestionDataHandle(data, 'title')"
    :start-data="editQuestionData.title"
  />
  <EditTextArea
    title="Describe your question"
    :on-click-text-area="() => openTextAreaHandle('describe')"
    :is-selected-text-area="isSelectedTextArea === 'describe'"
    :is-empty="editQuestionData.description.length === 0 && sendCount > 0"
    placeholder="Describe your question here..."
    @input-text="(data) => inputQuestionDataHandle(data, 'describe')"
    :start-data="editQuestionData.description"
  />
  <EditChooseQuestionCategory
    title="Choose category"
    :is-selected-text-area="isSelectedTextArea !== ''"
    :is-empty="editQuestionData.category_id === 'unselected' && sendCount > 0"
    @open-select="openSelectHandle"
    @select-category-id="(data) => inputQuestionDataHandle(data, 'category_id')"
    :category="editQuestionData.category"
  />

  <img v-if="imgData" class="img" :src="imgData" alt="imgData" />

  <SendAndAddImgBtns :on-send="onSendEditQuestion" title="Change"
    ><input
      type="file"
      name="img"
      id="img"
      accept="image/*"
      @change="onFileChange"
      style="display: none"
  /></SendAndAddImgBtns>
  <div class="loader_bg" v-if="loadingStore.isLoading"></div>
  <Loader v-if="loadingStore.isLoading" />
</template>

<style scoped>
.img {
  @apply w-[full] h-[132px] object-cover rounded-[10px];
}

.loader_bg {
  @apply fixed w-full h-full bg-white opacity-50 top-0 left-0 z-[100];
}
</style>
