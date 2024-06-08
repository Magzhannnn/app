<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import arrow from "@/assets/img/arrow-50.png";
import successSvg from "@/assets/svgData/successSvg.svg";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const updateAccessToken = async () => {
  try {
    console.log("try");
    const refreshToken = authStore.refreshToken;

    const response = await axiosInstance.post(
      "/auth/refresh",
      {},
      {
        headers: {
          Authorization: refreshToken,
        },
      }
    );

    authStore.setAccessToken(response.data.access_token);
  } catch (error) {
    console.log(error);
  }
};

updateAccessToken();

const goBack = () => {
  router.push({ name: "category" });
};
</script>

<template>
  <div class="wrap">
    <div><img :src="successSvg" alt="success" class="img" /></div>
    <div class="title">Transaction Completed Successfully</div>
    <div class="btn" @click="goBack">
      <img :src="arrow" alt="arrow" class="w-[26px] h-[26px]" />
      <span>Go back</span>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  @apply flex flex-col items-center justify-center gap-10 absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full;
}

.img {
  @apply w-[200px] h-[200px];
}

.title {
  @apply font-bold text-[22px];
}

.btn {
  @apply w-[150px] h-[40px] text-xl rounded-xl flex items-center justify-center gap-3 bg-[#2BE659] text-white;
}
</style>
