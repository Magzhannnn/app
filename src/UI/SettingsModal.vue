<script setup lang="ts">
import editSvg from "@/assets/svgData/editSvg.svg";
import deleteSvg from "@/assets/svgData/deleteSvg.svg";

defineProps<{
  editItem: () => void;
  deleteItem: () => void;
}>();
</script>

<template>
  <section class="settings">
    <div class="edit" @click.stop="editItem">
      <img :src="editSvg" alt="edit" class="svgIcon" />
      <p class="title">Edit</p>
    </div>
    <div class="delete" @click.stop="deleteItem">
      <img :src="deleteSvg" alt="delete" class="svgIcon" />
      <p class="title">Delete</p>
    </div>
  </section>
</template>

<style scoped>
.settings {
  @apply flex flex-col p-2 gap-2 bg-white rounded border w-max border-black;
}

.edit,
.delete {
  @apply flex items-center gap-1;
}

.svgIcon {
  @apply w-[17px] h-[17px];
}

.title {
  @apply text-[14px] font-bold;
}
</style>
