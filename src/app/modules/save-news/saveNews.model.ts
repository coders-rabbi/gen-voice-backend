import { Schema, model } from "mongoose";
import { TSavedNews } from "./saveNews.interface";

const savedNewsSchema = new Schema<TSavedNews>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    newsId: { type: Schema.Types.ObjectId, ref: "News", required: true },
    reporterId: { type: Schema.Types.ObjectId, ref: "Reporter" },
  },
  { timestamps: true },
);

// ekjon user ekta news duibar save korte parbe na
savedNewsSchema.index({ userId: 1, newsId: 1 }, { unique: true });

// user-er saved news list fast fetch korar jonyo (recent first)
savedNewsSchema.index({ userId: 1, createdAt: -1 });

export const SavedNews = model<TSavedNews>("SavedNews", savedNewsSchema);