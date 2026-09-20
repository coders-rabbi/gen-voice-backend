import { Document, Types } from "mongoose";

export interface IAnswer {
  questionId?: string;
  questionLabel: string;
  answer: string | string[];
}

export interface IPollResponse extends Document {
  pollId: Types.ObjectId;
  answers: IAnswer[];
  respondentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type TQuestionStat = {
  questionId: string;
  questionLabel: string;
  optionCounts: Record<string, number>;
};

// একটা raw response, list এ দেখানোর জন্য (registered/guest ভাগ করা)
export type TResponseSummary = {
  _id: string;
  answers: IAnswer[];
  respondentId?: string;
  createdAt: Date;
};

export type TPollAnalytics = {
  totalResponses: number;
  registeredCount: number;
  guestCount: number;
  questionStats: TQuestionStat[];
  registeredResponses: TResponseSummary[]; // registered user দের সব response
  guestResponses: TResponseSummary[]; // guest দের সব response
};
