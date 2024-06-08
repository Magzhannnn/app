import type { IQuestion } from "./../types/questions";
import { SIZE } from "@/app.constants";
import { helperAnswerAI } from "@/helpers/answersAI";
import type { IAnswerForm } from "@/types/answer";
import { axiosInstance } from "@/utils/axiosInstance";
import { formatDate } from "@/helpers/fotmatDate";

export const addNewAnswer = async (
  askForm: IAnswerForm,
  accessToken: string | null
) => {
  try {
    const response = await axiosInstance.post("/answer", askForm, {
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

export const getAnswers = async (
  page: number,
  questionId: string,
  accessToken: string | null
) => {
  try {
    const response = await axiosInstance.get(
      `/answer?question_id=${questionId}&page=${page}&size=${SIZE}&order_by=created_at&order_by=title&desc=true`,
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

const setNewAsk = async (
  userId: string,
  questionId: string,
  text: string,
  accessToken: string
) => {
  const saveAsk: IAnswerForm = {
    text,
    user_id: userId,
    question_id: questionId,
    parent_answer_id: null,
    picture_urls: null,
  };

  try {
    const response = await addNewAnswer(saveAsk, accessToken);

    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setEditAnswer = async (
  id: string,
  text: string,
  accessToken: string
) => {
  const saveAnswer = {
    id,
    text,
  };

  try {
    const response = await axiosInstance.put("/answer", saveAnswer, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteAnswer = async (id: string, accessToken: string | null) => {
  const deleteData = {
    id,
    deleted_at: formatDate(),
  };

  try {
    const response = await axiosInstance.put("/answer", deleteData, {
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

export const getAnswerFromAI = async (
  question: IQuestion,
  accessToken: string
) => {
  try {
    const { title, description } = question;
    const content = await helperAnswerAI(title, description);

    if (content) {
      const response = await setNewAsk(
        "00000000-0000-0000-0000-000000000000",
        question.id,
        content,
        accessToken
      );

      return response;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
