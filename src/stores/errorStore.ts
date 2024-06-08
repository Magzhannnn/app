import { ref } from "vue";
import { defineStore } from "pinia";

export const useErrorStore = defineStore("error", () => {
  const errorData = ref({ isVisible: false, message: "" });

  const setErrorData = (message: string, isVisible: boolean) => {
    errorData.value = { message, isVisible };
  };

  return {
    errorData,
    setErrorData,
  };
});
