import { Schema, model } from "mongoose";
import { TComment, TReplay } from "./comment.interface";

const ReplaySchema = new Schema<TReplay>(
  {
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
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    comment: { type: String, required: true, trim: true },
    replay: { type: [ReplaySchema], default: [] },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Comment = model<TComment>("Comment", CommentSchema);
