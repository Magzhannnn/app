import type { ICategory } from "@/types/category";
import type { IQuestion, IQuestionCategory } from "@/types/questions";
import type { IUser } from "@/types/user";

export const validateNewQuestionData = (questionData: IQuestion) => {
  console.log(questionData);
  const isTitleQuestion = questionData.title.length > 0;
  const isDescribeQuestion = questionData.description.length > 0;
  const isCategoryQuestion = questionData.category_id !== "unselected";

  return isTitleQuestion && isDescribeQuestion && isCategoryQuestion;
};

export const questionCategoryChoose = (
  questionCategories: ICategory[],
  selectQuestionCategory: ICategory
) => {
  if (selectQuestionCategory.title === "unselected") {
    questionCategories[0].isSelected = true;

    return questionCategories;
  }

  questionCategories.forEach((category) => {
    if (category.title === selectQuestionCategory.title) {
      category.isSelected = true;
    } else {
      category.isSelected = false;
    }
  });

  return questionCategories;
};

export const allQuestionCategory = (
  isSelectQuestionCategory: boolean,
  selectedQuestionCategory: ICategory,
  questionCategories: ICategory[]
) => {
  if (isSelectQuestionCategory) {
    const result = [
      selectedQuestionCategory,
      ...questionCategoryChoose(questionCategories, selectedQuestionCategory),
    ];

    return result;
  }

  return [selectedQuestionCategory];
};

export const getAllQuestionSorted = (
  questionSortedType: string,
  allQuestion: IQuestion[],
  searchQuestionOfTitle: string
) => {
  switch (questionSortedType) {
    case "alphabet":
      allQuestion.sort((a: IQuestion, b: IQuestion) =>
        a.title.localeCompare(b.title)
      );
      break;
    case "new":
      allQuestion.sort(
        (a: IQuestion, b: IQuestion) => Number(a.user_id) - Number(b.user_id)
      );
      break;
    default:
      allQuestion.sort(
        (a: IQuestion, b: IQuestion) => Number(b.user_id) - Number(a.user_id)
      );
  }

  return allQuestion.filter((question: IQuestion) =>
    question.title.toLowerCase().includes(searchQuestionOfTitle.toLowerCase())
  );
};

export const helperStartQuestionData = () => {
  const user: IUser | null = JSON.parse(localStorage.getItem("user") ?? "null");

  if (user) {
    const data: IQuestion = {
      id: "",
      user_id: user.id,
      title: "",
      description: "",
      category_id: "",
      picture_urls: [],
      total_answers: 0,
      ai_answer: null,
      total_dislikes: 0,
      total_likes: 0,
    };

    return data;
  }

  return null;
};
