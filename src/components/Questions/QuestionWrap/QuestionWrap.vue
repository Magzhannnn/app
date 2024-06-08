<script setup lang="ts">
import { RouterView } from "vue-router";
import QuestionHeader from "./QuestionHeader.vue";
import Footer from "@/UI/Footer.vue";
</script>

<template>
  <div class="container">
    <QuestionHeader />
  </div>
  <RouterView></RouterView>
  <Footer />
</template>

<style scoped>
.container {
  @apply px-[15px] text-[#143237];
}
</style>
