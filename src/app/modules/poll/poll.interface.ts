import { Document, Types } from "mongoose";

export type QuestionType =
  | "RADIO"
  | "TEXT"
  | "CHECKBOX"
  | "RATING"
  | "YESNO"
  | "EMOJI";

export type Visibility = "Public" | "Private" | "Unlisted";

export type Category = "Politics" | "Business" | "Technology" | "Culture";

export interface IQuestion {
  type: QuestionType;
  label: string;
  options: string[];
  required: boolean;
}

// Shape of the payload sent from the frontend (CreatePollForm) on submit
export interface CreatePollDTO {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  visibility: Visibility;
  category: Category;
  questions: IQuestion[];
}

// Mongoose document shape (DB representation)
export interface IPoll extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  visibility: Visibility;
  category: Category;
  questions: IQuestion[];
  votes: number,
  createdBy?: Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Standard API response shape used across controller responses
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
