<script setup lang="ts">
import { ref, watch } from "vue";
import chatGPT from "@/assets/svgData/ChatGPT.svg";
import WriteYourAnswer from "./WriteYourAnswer.vue";
import type { IAnswer } from "@/types/answer";
import SettingsModal from "@/UI/SettingsModal.vue";
import EditAnswerModal from "@/UI/EditAnswerModal.vue";
import { deleteAnswer, setEditAnswer } from "@/api/answer";
import { useAuthStore } from "@/stores/authStore";
import HelperText from "@/UI/HelperText.vue";
import { useErrorStore } from "@/stores/errorStore";

const errorStore = useErrorStore();

const authStore = useAuthStore();

const isOpenSetting = ref(false);
const isOpenSettingModal = ref(false);
const isOpenDeleteModal = ref(false);

interface IEmit {
  (e: "inputData", inputAnswer: string, images: File[]): void;
  (e: "changeAnswer", answer: IAnswer): void;
  (e: "deleteAnswer", answerId: string): void;
}

const emit = defineEmits<IEmit>();

const props = defineProps<{
  id: number;
  answer: IAnswer;
  isMyAnswer: boolean;
}>();

const imageURL = ref<string | null>(null);

const inputDataHandle = (text: string, images: File[]) => {
  emit("inputData", text, images);
};

const openSetting = () => {
  isOpenSetting.value = true;
};

window.addEventListener("click", () => {
  isOpenSetting.value = false;
});

const editItemHandle = () => {
  isOpenSetting.value = false;
  isOpenSettingModal.value = true;
};

const deleteItemHandle = async () => {
  closeModalHandle();
  isOpenDeleteModal.value = true;
};

const closeModalHandle = () => {
  isOpenSetting.value = false;
  isOpenSettingModal.value = false;
  isOpenDeleteModal.value = false;
};

const saveAnswerHandle = async (text: string) => {
  try {
    const response: { data: { answer: IAnswer } } | null = await setEditAnswer(
      props.answer.id,
      text,
      authStore.accessToken.toString()
    );

    const author = JSON.parse(localStorage.getItem("user") ?? "null");

    if (author) {
      emit("changeAnswer", { ...response.data.answer, author });
      closeModalHandle();
    }
  } catch (error: any) {
    console.log(error);
    errorStore.setErrorData(error.response.data.message, true);
  }
};

const deleteAnswerHandle = async () => {
  try {
    const response = await deleteAnswer(props.answer.id, authStore.accessToken);

    emit("deleteAnswer", props.answer.id);
    closeModalHandle();
  } catch (error: any) {
    console.log(error);
    errorStore.setErrorData(error.response.data.message, true);
  }
};
</script>

<template>
  <div class="answer">
    <div class="answerHeadWrap">
      <div class="flex flex-col gap-3">
        <p class="answerHead">
          <img
            v-if="!answer.author"
            :src="!answer.author ? chatGPT : imageURL?.toString()"
            alt="chatOpenAI"
            class="answerIcon"
          />
          <span class="answerTitle"
            >{{
              !answer.author ? "LaundromatAI" : answer.author.username
            }}
            says</span
          >
        </p>

        <p
          class="answerText"
          v-if="answer"
          :class="{ myAnswerWidth: isMyAnswer }"
        >
          {{ answer.text }}
        </p>

        <img
          v-for="picture in answer.picture_urls"
          :src="`https://${picture}`"
          alt="Image"
          class="img"
        />
      </div>
      <div class="flex items-start justify-start gap-2">
        <SettingsModal
          v-if="isOpenSetting"
          :edit-item="editItemHandle"
          :delete-item="deleteItemHandle"
        />
        <div class="h-max" v-if="isMyAnswer" @click.stop="openSetting">...</div>
      </div>
    </div>
  </div>

  <WriteYourAnswer v-if="id === 0" @input-data="inputDataHandle" />

  <p v-if="id === 0" class="answerOwner">
    Get answers from seasoned laundromat owners
  </p>

  <EditAnswerModal
    :answer="answer"
    :close-modal="closeModalHandle"
    v-if="isOpenSettingModal"
    @save-answer="saveAnswerHandle"
  />

  <HelperText
    title="answer"
    :delete-handle="deleteAnswerHandle"
    :close-modal="closeModalHandle"
    v-if="isOpenDeleteModal"
  />

  <slot />
</template>

<style scoped>
.answer {
  box-shadow: 2px 2px 10px 0px #ebebeb;

  @apply w-full  py-5 bg-white flex flex-col gap-2 px-4;
}

.answerHeadWrap {
  @apply flex items-start justify-between;
}

.answerHead {
  @apply flex items-center justify-start gap-2;
}

.answerIcon {
  border-radius: 3px 3px 0px 3px;

  @apply w-[13px] h-[13px];
}

.answerTitle {
  @apply font-bold text-[12px] leading-[14.1px] text-[#143237];
}

.answerText {
  word-wrap: break-word;

  @apply ml-[21px] text-base leading-[19.96px] text-[#475D60] w-[300px];
}

.myAnswerWidth {
  @apply w-[230px];
}

.answerOwner {
  @apply text-sm leading-[16.94px] font-bold text-black;
}

.img {
  @apply relative w-full h-[160px] object-cover rounded-[10px];
}
</style>
