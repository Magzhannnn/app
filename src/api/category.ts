import { SIZE } from "@/app.constants";
import { axiosInstance } from "@/utils/axiosInstance";

export const getCategories = async (
  page: number,
  accessToken: string | null,
  searchCategoryOfTitle: string
) => {
  try {
    const queryParam =
      searchCategoryOfTitle.length === 0
        ? ""
        : `&query=${searchCategoryOfTitle}`;

    const response = await axiosInstance.get(
      `/category?size=${SIZE}&page=${page}&order_by=title&desc=false${queryParam}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
