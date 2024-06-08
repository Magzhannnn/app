<script setup lang="ts">
defineProps<{
  isActive: boolean;
  text: string;
  paymentTotal: number;
}>();
</script>

<template>
  <div
    class="premiumBtn"
    :class="{
      activeBorder: isActive,
    }"
  >
    <div
      class="radioBtn"
      :class="{
        activeRadioBtn: isActive,
      }"
    ></div>
    <div class="content">
      <div class="saved">
        <h3 class="text">
          {{ text }}
          <span
            v-if="text === 'Yearly'"
            class="discount"
            :class="{
              activeBtn: isActive,
            }"
            >save 40%</span
          >
        </h3>
      </div>
      <p class="total">{{ paymentTotal }}$/mo</p>
    </div>
  </div>
</template>

<style scoped>
.premiumBtn {
  background: transparent;

  @apply py-2 px-2.5 flex gap-3 w-full border border-[#C3D2D4] rounded-[10px];
}

.radioBtn {
  @apply w-[10px] h-[10px] border border-[#C3D2D4] rounded-full;
}

.content {
  @apply flex flex-col gap-2 text-[#FAFCFC];
}

.saved {
  @apply flex gap-2 items-center;
}

.text {
  @apply text-sm leading-[16.94px] font-bold;
}

.discount {
  @apply text-xs leading-[12.52px] text-white bg-[#C3D2D4] p-1 rounded-[100px] font-normal;
}

.total {
  @apply text-xs leading-[12.52px];
}

.activeBorder {
  @apply border-[#6DC5D3];
}

.activeRadioBtn {
  @apply border-[#6DC5D3] bg-[#6DC5D3];
}

.activeBtn {
  @apply bg-[#6DC5D3];
}
</style>
