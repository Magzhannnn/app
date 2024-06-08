import { ref } from "vue";
import { defineStore } from "pinia";
import type { IUserAuth } from "@/types/user";
import { axiosInstance } from "@/utils/axiosInstance";
import { useUserStore } from "./userStore";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const userStore = useUserStore();

  const accessToken = ref(localStorage.getItem("accessToken"));
  const refreshToken = ref(localStorage.getItem("refreshToken"));

  const setTokenData = (access: string, refresh: string) => {
    accessToken.value = access;
    refreshToken.value = refresh;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  const setAccessToken = (accessTokenData: string) => {
    accessToken.value = accessTokenData;
    localStorage.setItem("accessToken", accessTokenData);
  };

  const onLogin = async (userAuth: IUserAuth) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: userAuth.email,
        userName: userAuth.displayName.split(" ")[0],
      });

      setTokenData(response.data.access_token, response.data.refresh_token);
      userStore.setUserData(response.data.user);

      router.push({ name: "category" });
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: accessToken.value,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        localStorage.clear();
        router.push({ name: "signUp" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { accessToken, refreshToken, onLogin, onLogout, setAccessToken };
});
