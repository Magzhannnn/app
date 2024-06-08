<script setup lang="ts">
import CategoryHeader from "./CategoryHeader.vue";
import CategoryMain from "./CategoryMain.vue";
import Footer from "@/UI/Footer.vue";

</script>

<template>
  <div class="container">
    <CategoryHeader />
    <CategoryMain />
    <Footer />
  </div>
</template>

<style scoped>
.container {
  @apply px-[15px] text-[#143237];
}
</style>
