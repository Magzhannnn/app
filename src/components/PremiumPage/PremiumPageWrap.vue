<script setup lang="ts">
import BackBtn from "@/UI/BackBtn.vue";
import Footer from "@/UI/Footer.vue";
import PremiumSignUp from "./PremiumSignUp.vue";
import PremiumHeader from "./PremiumHeader.vue";
</script>

<template>
  <div class="container">
    <BackBtn color="white" />
    <PremiumHeader />
    <PremiumSignUp />
  </div>
  <Footer />
</template>

<style scoped>
.container {
  @apply px-[18px] py-8 bg-[url('@/assets/img/premiumImg.png')] bg-no-repeat bg-cover bg-center h-screen;
}
</style>
