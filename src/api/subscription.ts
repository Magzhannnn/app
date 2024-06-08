import { axiosInstance } from "@/utils/axiosInstance";

export const getSubscriptionProducts = async (accessToken: string | null) => {
  try {
    const response = await axiosInstance.get(`/subscription/products`, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
