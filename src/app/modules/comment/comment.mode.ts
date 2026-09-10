import { Schema, model } from "mongoose";
import { TComment, TReplay } from "./comment.interface";

const ReplaySchema = new Schema<TReplay>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const CommentSchema = new Schema<TComment>(
  {
    newsId: {
      type: String,
      required: true,
      trim: true,
      index: true, // দ্রুত query এর জন্য এখনো রাখা ভালো
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
    replay: { type: [ReplaySchema], default: [] },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Comment = model<TComment>("Comment", CommentSchema);
