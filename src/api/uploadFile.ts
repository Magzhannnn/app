import { axiosInstance } from "./../utils/axiosInstance";

export const uploadFile = async (file: any, accessToken: string) => {
  const formData = new FormData();

  formData.append("name", file.name);
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(`/file/upload`, formData, {
      headers: {
        Authorization: accessToken,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data.response;
    }
  } catch (error) {
    return error;
  }
};
