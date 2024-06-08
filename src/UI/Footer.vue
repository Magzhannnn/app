<script setup lang="ts">
import categoriesSvg from "@/assets/svgData/categoriesSvg.svg";
import askSvg from "@/assets/svgData/askSvg.svg";
import starSvg from "@/assets/svgData/starSvg.svg";
import logoutSvg from "@/assets/svgData/logoutSvg.svg";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();
</script>

<template>
  <footer class="footer">
    <div class="footer_item" @click="router.push({ name: 'category' })">
      <img :src="categoriesSvg" alt="" />
      <p>Categories</p>
    </div>
    <div class="footer_item" @click="router.push({ name: 'questionForm' })">
      <img :src="askSvg" alt="" />
      <p>Ask</p>
    </div>
    <div class="footer_item" @click="router.push({ name: 'premium' })">
      <img :src="starSvg" alt="" />
      <p>Get premium</p>
    </div>
    <div class="footer_item" @click="() => authStore.onLogout()">
      <img :src="logoutSvg" alt="" />
      <p>LogOut</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  box-shadow: 2px 2px 10px 0px #ebebeb;

  @apply fixed bottom-0 left-0 flex items-center justify-between w-full bg-[#FAFCFC] py-3;
}

.footer_item {
  @apply flex flex-col items-center justify-center text-[10px];
}

.footer_item p {
  @apply w-[84px] text-center;
}
</style>
