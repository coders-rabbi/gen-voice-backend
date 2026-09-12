import { Types } from "mongoose";
import { TReactionType } from "./reaction.interface";
import { Reaction } from "./reaction.mode";

const toggleReaction = async (
  newsId: string,
  userId: string,
  type: TReactionType,
) => {
  const existing = await Reaction.findOne({ newsId, userId });

  // একই reaction আবার দিলে remove হয়ে যাবে (toggle behavior)
  if (existing && existing.type === type) {
    await Reaction.deleteOne({ _id: existing._id });
    return { action: "removed" };
  }

  // অন্য reaction থাকলে update হবে (like থেকে love-এ change)
  // নতুন হলে create হবে
  const result = await Reaction.findOneAndUpdate(
    { newsId, userId },
    { type },
    { upsert: true, returnDocument: "after" },
  );

  return { action: existing ? "updated" : "created", data: result };
};

// ৩. একটা নিউজের সব ধরনের reaction-এর সংখ্যা বের করা
const getReactionCountsByNewsId = async (newsId: string) => {
  const result = await Reaction.aggregate([
    { $match: { newsId: new Types.ObjectId(newsId) } },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
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

// ৪. এই ইউজার এই নিউজে কী reaction দিয়েছে (না দিলে null)
const getUserReaction = async (newsId: string, userId: string) => {
  const reaction = await Reaction.findOne({ newsId, userId }).select("type");
  return reaction?.type || null;
};

export const ReactionServices = {
  toggleReaction,
  getReactionCountsByNewsId,
  getUserReaction,
};
