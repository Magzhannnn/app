import type { IAuthor } from "./user";

export interface IAnswerForm {
  user_id: string;
  question_id: string;
  parent_answer_id: null;
  text: string;
  picture_urls: string[] | null;
}

export interface IAnswer extends IAnswerForm {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  author: IAuthor | null;
}
