import { model, Schema } from "mongoose";
import { TReaction } from "./reaction.interface";

const ReactionSchema = new Schema<TReaction>(
  {
    newsId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "love", "wow", "sad", "angry"],
      required: true,
    },
  },
  { timestamps: true },
);

ReactionSchema.index({ newsId: 1, userId: 1 }, { unique: true });

export const Reaction = model<TReaction>("Reaction", ReactionSchema);
