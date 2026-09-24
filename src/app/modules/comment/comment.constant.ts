import { Types } from "mongoose";

export type TCommentPyaload = {
  newsId: string;
  comment: string;
  userId: Types.ObjectId;
};