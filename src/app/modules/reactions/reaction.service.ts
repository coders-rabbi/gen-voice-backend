import { Types } from "mongoose";
import { TReactionType } from "./reaction.interface";
import { Reaction } from "./reaction.mode";
import { News } from "../news/news.model";
import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";

const toggleReaction = async (
  newsId: string,
  userId: string,
  type: TReactionType,
) => {
  const news = await News.findOne({ newsId: newsId }).select("reporterId");
  if (!news) {
    throw new AppError(StatusCodes.NOT_FOUND, "News not found");
  }

  const existing = await Reaction.findOne({ newsId, userId });

  if (existing && existing.type === type) {
    await Reaction.deleteOne({ _id: existing._id });
    return { action: "removed" };
  }

  const result = await Reaction.findOneAndUpdate(
    { newsId, userId },
    { type, reporterId: news.reporterId },
    { upsert: true, returnDocument: "after" },
  );

  return { action: existing ? "updated" : "created", data: result };
};

const getReactionCountsByNewsId = async (newsId: string) => {
  const result = await Reaction.aggregate([
    { $match: { newsId: newsId } }, // ✅ আগের bug fix (String match)
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);

  const counts: Record<string, number> = {
    like: 0,
    love: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  };

  result.forEach((item) => {
    counts[item._id] = item.count;
  });

  return counts;
};

const getUserReaction = async (newsId: string, userId: string) => {
  const reaction = await Reaction.findOne({ newsId, userId }).select("type");
  return reaction?.type || null;
};

// 👇 নতুন: reporter এর সব reaction counts
const getReporterReactionCounts = async (reporterId: string) => {
  const result = await Reaction.aggregate([
    { $match: { reporterId: new Types.ObjectId(reporterId) } },
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);

  const counts: Record<string, number> = {
    like: 0,
    love: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  };

  result.forEach((item) => {
    counts[item._id] = item.count;
  });

  return counts;
};

export const ReactionServices = {
  toggleReaction,
  getReactionCountsByNewsId,
  getUserReaction,
  getReporterReactionCounts,
};
