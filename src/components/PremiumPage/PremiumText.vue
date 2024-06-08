<script setup lang="ts">
defineProps<{
  isMainText?: boolean;
  text: string;
  paymentTotal: string;
}>();
</script>

<template>
  <div class="text">
    <p :class="{ mainText: isMainText }">{{ text }}</p>
    <p>{{ paymentTotal }}$</p>
  </div>
</template>

<style scoped>
.text {
  @apply flex items-center justify-between text-xs leading-[12.52px];
}

.mainText {
  @apply font-bold;
}
</style>
