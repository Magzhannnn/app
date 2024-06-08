<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import SendAndAddImgBtns from "@/UI/SendAndAddImgBtns.vue";
import { ref, watch } from "vue";

interface IEmit {
  (e: "inputData", inputAnswer: string, images: File[]): void;
}

const emit = defineEmits<IEmit>();

const imgsData = ref([]);
const images = ref([]);

const divRef = ref<HTMLDivElement | null>(null);
const imgRef = ref<HTMLImageElement | null>(null);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const textareaContent = ref<string>("");
const sendCount = ref(0);

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

    if (!imgsData.value) {
      heightImgElements();
    }
  }
};

const heightInputElements = () => {
  if (textareaRef.value && divRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";

    divRef.value.style.height = "auto";
    divRef.value.style.height = divRef.value.clientHeight + "px";
    divRef.value.style.paddingBottom = "10px";
  }
};

const heightImgElements = () => {
  if (imgRef.value && divRef.value) {
    imgRef.value.style.height = "auto";
    imgRef.value.style.height = imgRef.value.scrollHeight + 109 + "px";

    divRef.value.style.height = "auto";
    divRef.value.style.height = divRef.value.clientHeight + 120 + "px";
    divRef.value.style.paddingBottom = "10px";
  }
};

const sendYourAnswerHandle = () => {
  sendCount.value++;

  if (textareaContent.value.length === 0) {
    return;
  }

  emit("inputData", textareaContent.value, images.value);
  textareaContent.value = "";
  sendCount.value = 0;
};

watch(textareaContent, () => {
  if (sendCount.value !== 0) {
    sendCount.value = 0;
  }

  heightInputElements();
});

</script>

<template>
  <div class="addAnswer">
    <div class="title">Write your answer</div>
    <div
      class="inputAnswer"
      :class="{
        errorElem: textareaContent.length === 0 && sendCount > 0,
      }"
      ref="divRef"
    >
      <textarea
        placeholder="Type here..."
        class="input"
        :class="{
          errorInput: textareaContent.length === 0 && sendCount > 0,
        }"
        ref="textareaRef"
        v-model="textareaContent"
      />
      <img
        v-for="item in imgsData"
        :src="item"
        ref="imgRef"
        alt="Image"
        class="img"
        v-show="imgsData.length > 0"
      />
    </div>
    <SendAndAddImgBtns :on-send="sendYourAnswerHandle" title="Send"
      ><input
        type="file"
        name="img"
        id="img"
        accept="image/*"
        @change="onFileChange"
        style="display: none"
    /></SendAndAddImgBtns>
  </div>
</template>

<style scoped>
.addAnswer {
  @apply w-full py-5 flex flex-col gap-3 px-4;
}

.title {
  @apply text-sm leading-[16.94px] text-[#143237] font-bold;
}

.inputAnswer {
  @apply py-2 px-6 border border-[#C3D2D4] rounded-[10px] flex flex-col gap-2.5;
}

.errorElem {
  @apply border border-[#DE2929];
}

.input {
  @apply min-h-[34px] border-none outline-none placeholder:text-[#475D60] placeholder:text-opacity-50 text-sm leading-[16.94px];
}

.errorInput {
  @apply placeholder:text-[#DE2929] placeholder:text-opacity-50;
}

/* .img {
  @apply w-full h-[109px] object-cover rounded-[10px];
} */
.img {
  @apply w-full h-[109px] object-contain rounded-[10px];
}
</style>
