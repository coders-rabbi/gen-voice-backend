import { Types } from "mongoose";

export type TReactionType = "like" | "love" | "wow" | "sad" | "angry";

export type TReaction = {
  newsId: string;
  reporterId: Types.ObjectId;
  userId: Types.ObjectId;
  type: TReactionType;
};
