import type { IAnswer } from "./answer";
import type { ICategory } from "./category";
import type { IAuthor } from "./user";

export interface IQuestionForm {
  user_id: string;
  category_id: string;
  title: string;
  description: string;
  picture_urls: string[] | null;
}

export type reaction = "like" | "dislike" | null;

export interface IQuestion extends IQuestionForm {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  author: IAuthor;
  category: ICategory;
  total_answers: number;
  ai_answer: null | IAnswer;
  total_dislikes: number;
  total_likes: number;
  type: reaction;
}

export interface IQuestionReaction {
  question_id: string;
  answer_id: string | null;
  user_id: string | null;
  type: string;
  created_at: string;
  deleted_at: null;
  total_likes: number;
  total_dislikes: number;
}

export interface IFilterCoordinates {
  top: number;
  left: number;
}

export interface IQuestionCategory {
  value: string;
  title: string;
  isSelected: boolean;
}

