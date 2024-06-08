<script setup lang="ts"></script>

<template>
  <section class="headerSignUp">
    <h1 class="title">Laundromat +</h1>
    <div class="content">
      <div class="contentItem">Ask your on questions</div>
      <div class="contentItemCenter">Get answers from other subsribers</div>
      <div class="contentItem">Try it free for 2 weeks</div>
    </div>
  </section>
</template>

<style scoped>
.headerSignUp {
  @apply w-full mx-auto flex flex-col items-center my-9 text-[#FAFCFC] justify-center gap-4;
}

.title {
  @apply text-[30px] font-bold text-center;
}

.content {
  @apply text-sm leading-[16.94px] w-full text-center flex gap-[10px] justify-between items-start;
}

.contentItem {
  @apply w-[100px];
}

.contentItemCenter {
  @apply w-[108px];
}
</style>
