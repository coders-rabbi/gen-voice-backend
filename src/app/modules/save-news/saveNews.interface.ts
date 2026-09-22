import { Types } from "mongoose";

export type TSavedNews = {
  userId: Types.ObjectId;
  newsId: Types.ObjectId;
  reporterId?: Types.ObjectId;
};