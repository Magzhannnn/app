import { SIZE } from "@/app.constants";
import { formatDate } from "@/helpers/fotmatDate";
import type { IQuestion, reaction } from "@/types/questions";
import { axiosInstance } from "@/utils/axiosInstance";

export const addNewQuestion = async (
  questionData: IQuestion,
  accessToken: string | null
) => {
  try {
    const response = await axiosInstance.post("/question", questionData, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const editQuestion = async (
  questionData: IQuestion,
  accessToken: string | null
) => {
  const changeData = {
    id: questionData.id,
    title: questionData.title,
    description: questionData.description,
    category_id: questionData.category_id,
  };

  try {
    const response = await axiosInstance.put("/question", changeData, {
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

export const deleteQuestion = async (
  id: string,
  accessToken: string | null
) => {
  const deleteData = {
    id,
    deleted_at: formatDate(),
  };

  try {
    const response = await axiosInstance.put("/question", deleteData, {
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

export const getQuestions = async (
  page: number,
  categoryId: string,
  accessToken: string | null,
  searchQuestionOfTitle: string
) => {
  try {
    const queryParam =
      searchQuestionOfTitle.length === 0
        ? ""
        : `&query=${searchQuestionOfTitle}`;

    const response = await axiosInstance.get(
      `/question?category_id=${categoryId}&size=${SIZE}&page=${page}&order_by=created_at&order_by=title&desc=false${queryParam}`,
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

export const getQuestion = async (questionId: string, accessToken: string) => {
  try {
    const response = await axiosInstance.get(`/question/${questionId}`, {
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

export const setQuestionReaction = async (
  type: reaction,
  question: IQuestion,
  user_id: string,
  accessToken: string
) => {
  const saveData = {
    question_id: question.id,
    answer_id: null,
    user_id,
    type: type,
  };

  try {
    const response = await axiosInstance.post(`/reaction`, saveData, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
