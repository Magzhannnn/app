<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="title">{{ title }}...</div>
</template>

<style scoped>
.title {
  @apply ml-[15px] text-2xl text-slate-500 font-bold;
}
</style>
