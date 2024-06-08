import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { IUser } from "@/types/user";

export const useUserStore = defineStore("user", () => {
  const user = ref<IUser | null>(
    JSON.parse(localStorage.getItem("user") ?? "null")
  );

  const getUserData = computed(() => user.value);

  const setUserData = (userData: IUser) => {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return {
    getUserData,
    setUserData,
  };
});
