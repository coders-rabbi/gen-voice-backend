import { Types } from "mongoose";
import { SavedNews } from "./saveNews.model";

const toggleSaveNewsIntoDB = async (
  userId: string,
  newsId: string,
  reporterId?: string,
) => {
  const existing = await SavedNews.findOne({ userId, newsId });

  if (existing) {
    await SavedNews.findByIdAndDelete(existing._id);
    return { saved: false };
  }

  await SavedNews.create({
    userId: new Types.ObjectId(userId),
    newsId: new Types.ObjectId(newsId),
    ...(reporterId && { reporterId: new Types.ObjectId(reporterId) }),
  });
  return { saved: true };
};

const getSavedNewsByUserFromDB = async (userId: string) => {
  return SavedNews.find({ userId })
    .populate("newsId")
    .sort({ createdAt: -1 });
};

const checkIsNewsSavedFromDB = async (userId: string, newsId: string) => {
  const exists = await SavedNews.exists({ userId, newsId });
  return !!exists;
};

export const SavedNewsServices = {
  toggleSaveNewsIntoDB,
  getSavedNewsByUserFromDB,
  checkIsNewsSavedFromDB,
};