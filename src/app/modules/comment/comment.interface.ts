import { Types } from "mongoose";

export type TReplay = {
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TComment = {
  newsId: string;
  userId: Types.ObjectId;
  comment: string;
  replay: TReplay[];
  isHidden: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};