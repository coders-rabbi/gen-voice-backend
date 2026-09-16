import { Schema, model, Document } from "mongoose";
import { IFollow } from "./follower.interface";

export interface IFollowDocument extends IFollow, Document {}

const followSchema = new Schema<IFollowDocument>(
  {
    follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reporter: { type: Schema.Types.ObjectId, ref: "Reporter", required: true },
  },
  { timestamps: true },
);

followSchema.index({ follower: 1, reporter: 1 }, { unique: true });

export const Follow = model<IFollowDocument>("Follow", followSchema);