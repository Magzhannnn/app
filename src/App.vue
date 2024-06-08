<script setup lang="ts">
import { RouterView } from "vue-router";
import ModalOverlay from "./UI/ModalOverlay.vue";

import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <ModalOverlay
    v-if="
      route.name !== 'signUp' &&
      route.name !== 'signIn'
    "
  />
  <RouterView></RouterView>
</template>
