<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps<{
  title: string;
  onSend: () => void;
}>();
</script>

<template>
  <div class="btns">
    <button class="sendBtn" @click="onSend">{{ title }}</button>
    <label class="addImgBtn" for="img">
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.83301 8.50016C1.83301 5.35747 1.83301 3.78612 2.80932 2.80981C3.78563 1.8335 5.35698 1.8335 8.49967 1.8335C11.6424 1.8335 13.2137 1.8335 14.19 2.80981C15.1663 3.78612 15.1663 5.35747 15.1663 8.50016C15.1663 11.6429 15.1663 13.2142 14.19 14.1905C13.2137 15.1668 11.6424 15.1668 8.49967 15.1668C5.35698 15.1668 3.78563 15.1668 2.80932 14.1905C1.83301 13.2142 1.83301 11.6429 1.83301 8.50016Z"
          stroke="#6DC5D3"
        />
        <circle cx="11.1663" cy="5.83333" r="1.33333" stroke="#6DC5D3" />
        <path
          d="M1.83301 8.83326L3.00073 7.81151C3.60825 7.27994 4.52386 7.31043 5.09466 7.88124L7.95448 10.7411C8.41264 11.1992 9.13384 11.2617 9.66394 10.8891L9.86274 10.7494C10.6256 10.2133 11.6576 10.2754 12.3507 10.8991L14.4997 12.8333"
          stroke="#6DC5D3"
          stroke-linecap="round"
        />
      </svg>
      <span class="ml-2">Add a picture</span>
      <slot></slot>
    </label>
  </div>
</template>

<style scoped>
.btns {
  @apply flex items-center gap-8;
}

.sendBtn {
  @apply bg-[#6DC5D3] flex items-center justify-center h-[30px] w-1/2;
}
.addImgBtn {
  @apply flex items-center justify-center h-[30px] w-1/2 text-[#6DC5D3];
}

.sendBtn,
.addImgBtn {
  @apply text-xs leading-[14.52px] rounded-[100px];
}
</style>
