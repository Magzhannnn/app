<script setup lang="ts">
import BackBtn from "@/UI/BackBtn.vue";
import Footer from "@/UI/Footer.vue";
import EditQuestionForm from "./EditQuestionForm.vue";
</script>

<template>
  <div class="container">
    <BackBtn />
    <EditQuestionForm />
  </div>
  <Footer />
</template>

<style scoped>
.container {
  @apply mt-8 px-[15px] text-[#143237] flex flex-col gap-5;
}
</style>
