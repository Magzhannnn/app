<script setup lang="ts">
import Loader from "@/UI/Loader.vue";
import AskTextArea from "./AskTextArea.vue";
import AskChooseQuestionCategory from "./AskChooseQuestionCategory.vue";
import SendAndAddImgBtns from "@/UI/SendAndAddImgBtns.vue";
import { ref, watch } from "vue";
import type { IQuestion } from "@/types/questions";
import {
  helperStartQuestionData,
  validateNewQuestionData,
} from "@/helpers/questionHelpers";
import { useQuestionStore } from "@/stores/questionsStore";
import { useRouter } from "vue-router";
import { addNewQuestion } from "@/api/question";
import { useAuthStore } from "@/stores/authStore";
import { getAnswerFromAI } from "@/api/answer";
import { useLoadingStore } from "@/stores/loadingStore";
import { uploadFile } from "@/api/uploadFile";
import { useErrorStore } from "@/stores/errorStore";

const errorStore = useErrorStore();

const router = useRouter();

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const questionStore = useQuestionStore();

const imgsData = ref([]);
const images = ref([]);
const sendCount = ref(0);
const isSelectedTextArea = ref("");
const newQuestionData = ref<IQuestion | null>(helperStartQuestionData());

const resetSendCount = () => {
  if (sendCount.value !== 0) {
    sendCount.value = 0;
  }
};

const inputQuestionDataHandle = (data: string, key: string) => {
  if (!newQuestionData.value) return;
  resetSendCount();

  switch (key) {
    case "title":
      newQuestionData.value.title = data;
      break;
    case "describe":
      newQuestionData.value.description = data;
      break;
    case "category_id":
      newQuestionData.value.category_id = data;
      break;
  }
};

const onSendAskQuestion = async () => {
  if (!newQuestionData.value) return;

  sendCount.value++;

  const resultValidate = validateNewQuestionData(newQuestionData.value);

  if (resultValidate) {
    sendCount.value = 0;
    loadingStore.setIsLoading(true);

    const accessToken = authStore.accessToken;

    Promise.all(
      images.value.map((item) => uploadFile(item, accessToken.toString()))
    )
      .then((res) => {
        newQuestionData.value.picture_urls = res.map((item) => item.link);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addNewQuestion(newQuestionData.value, authStore.accessToken)
          .then((res) => {
            if (
              "response" in res &&
              res.response.status >= 400 &&
              res.response.status < 500
            ) {
              errorStore.setErrorData(res.response.data.message, true);
              return;
            }

            questionStore.setNewQuestion(res);

            getAnswerFromAI(res, authStore.accessToken)
              .then((res) => {
                router.push({ name: "questionSuccessfull" });
              })
              .catch((error) => {
                errorStore.setErrorData(error.response.data.message, true);
              });
          })
          .catch((error) => {
            {
              errorStore.setErrorData(error.response.data.message, true);
            }
          })
          .finally(() => {
            loadingStore.setIsLoading(false);
          });
      });
  }
};

const onFileChange = (e: Event) => {
  const fileInput = e.target as HTMLInputElement;

  if (fileInput.files && fileInput.files[0]) {
    sendCount.value = 0;
    const reader = new FileReader();
    images.value.push(fileInput.files[0] as File);

    reader.onload = (e) => {
      imgsData.value.push(e.target?.result as string);
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
  <AskTextArea
    title="Ask your question"
    :on-click-text-area="() => openTextAreaHandle('title')"
    :is-selected-text-area="isSelectedTextArea === 'title'"
    :is-empty="newQuestionData?.title.length === 0 && sendCount > 0"
    placeholder="Type question here..."
    @input-text="(data) => inputQuestionDataHandle(data, 'title')"
  />
  <AskTextArea
    title="Describe your question"
    :on-click-text-area="() => openTextAreaHandle('describe')"
    :is-selected-text-area="isSelectedTextArea === 'describe'"
    :is-empty="newQuestionData?.description.length === 0 && sendCount > 0"
    placeholder="Describe your question here..."
    @input-text="(data) => inputQuestionDataHandle(data, 'describe')"
  />
  <AskChooseQuestionCategory
    title="Choose category"
    :is-selected-text-area="isSelectedTextArea !== ''"
    :is-empty="newQuestionData?.category_id === 'unselected' && sendCount > 0"
    @open-select="openSelectHandle"
    @select-category-id="(data) => inputQuestionDataHandle(data, 'category_id')"
  />

  <img
    v-if="imgsData.length"
    v-for="item in imgsData"
    class="img"
    :src="item"
    alt="imgsData"
  />

  <SendAndAddImgBtns :on-send="onSendAskQuestion" title="Send"
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
  @apply w-[full] h-[160px] object-cover rounded-[10px];
}

.loader_bg {
  @apply fixed w-full h-full bg-white opacity-50 top-0 left-0 z-[100];
}
</style>
