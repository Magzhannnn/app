<template>
  <form @submit.prevent="handleCheckout" class="space-y-6">
    <button
      type="button"
      @click="handleCheckout"
      :disabled="isProcessing"
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed btn"
    >
      {{ isProcessing ? "Processing..." : "Pay with Stripe" }}
    </button>
    <div v-if="errorMessage" class="text-red-500 mt-2">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAuthStore } from "@/stores/authStore";
import { useErrorStore } from "@/stores/errorStore";

const errorStore = useErrorStore();

const props = defineProps<{
  premiumType: string;
  userId: string;
}>();

const authStore = useAuthStore();

const isProcessing = ref(false);
const errorMessage = ref("");

const premiumType = computed(() => props.premiumType);

const handleCheckout = async () => {
  try {
    isProcessing.value = true;
    errorMessage.value = "";

    const response = await axiosInstance.post(
      "/subscription/create-checkout-session",
      {
        user_id: props.userId,
        price_id: premiumType.value,
      },
      {
        headers: {
          Authorization: authStore.accessToken,
        },
      }
    );

    console.log(response.data.response.session_url);

    window.location.href = response.data.response.session_url;
  } catch (error: any) {
    errorStore.setErrorData(error.response.data.message, true);
    errorMessage.value = error.message || "An unexpected error occurred.";
  } finally {
    isProcessing.value = false;
  }
};
</script>

<style scoped>
.btn {
  @apply w-full h-[42px] flex items-center justify-center rounded-[100px] bg-[#625AFF] text-white mt-8;
}
</style>
