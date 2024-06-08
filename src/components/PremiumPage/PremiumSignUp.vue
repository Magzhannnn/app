<script setup lang="ts">
import { ref, onMounted } from "vue";
import PremiumText from "./PremiumText.vue";
import PremiumService from "./PremiumService.vue";
import PremiumPaymentBtn from "./PremiumPaymentBtn.vue";
import PremiumPaymentTypeBtn from "./PremiumPaymentTypeBtn.vue";
import type { IPaymentType } from "@/types/paumentTypes";
import { getSubscriptionProducts } from "@/api/subscription";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const authStore = useAuthStore();
const premiumTypeId = ref("");
const paymentTypes = ref<IPaymentType[]>([]);

const onChoosePaymentType = (type: string) => {
  premiumTypeId.value = type;
};

getSubscriptionProducts(authStore.accessToken)
  .then((res) => {
    paymentTypes.value = res.products;
    paymentTypes.value.forEach((item) => {
      const name = item.name.split(" ");
      item.name = name[name.length - 1];
    });

    premiumTypeId.value = paymentTypes.value[0].price_id;
  })
  .catch((error) => {
    console.log(error);
  });

const isActivePaymentType = (priceId: string) => {
  return premiumTypeId.value === priceId;
};
</script>

<template>
  <section class="premium">
    <p class="premiumText">Sign Up</p>
    <div class="premiumTypes">
      <PremiumPaymentTypeBtn
        v-for="item in paymentTypes"
        :key="item.product_id"
        :is-active="isActivePaymentType(item.price_id)"
        :text="item.name"
        :paymentTotal="item.price"
        @click="() => onChoosePaymentType(item.price_id)"
      />
    </div>
    <div class="premiumSubtext">
      <PremiumText
        :is-main-text="true"
        text="14-day free trial"
        :payment-total="(0).toFixed(2)"
      />
      <PremiumText text="Starting May 14, 2024" payment-total="48" />
    </div>
    <PremiumPaymentBtn
      v-if="premiumTypeId.length > 0 && userStore.getUserData"
      :premium-type="premiumTypeId"
      :user-id="userStore.getUserData.id"
    />
    <PremiumService />
  </section>
</template>

<style scoped>
.premium {
  @apply flex flex-col gap-[11px] text-[#FAFCFC];
}

.premiumText {
  @apply text-sm leading-[16.94px] text-[#FAFCFC] font-bold;
}

.premiumTypes {
  @apply flex gap-5;
}

.premiumSubtext {
  @apply flex flex-col gap-5;
}
</style>
