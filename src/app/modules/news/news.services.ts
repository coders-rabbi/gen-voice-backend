import { TNews } from "./news.interface";
import { News } from "./news.model";

const createNewsIntoDB = async (newsData: TNews) => {
  const result = await News.create(newsData);
  return result;
};

const getAllNewsFromDB = async () => {
  const result = await News.find().populate("reporterId");
  return result;
};

const getSingleNewsFromDB = async (id: string) => {
  const result = await News.findById({ _id: id });
  return result;
};

const updateNewsIntoDB = async (id: string, payload: Partial<TNews>) => {
  const result = await News.findOneAndUpdate(
    { newsId: id },
    { $set: payload },
    { returnDocument: "after" },
  );
  return result;
};

export const NewsServices = {
  createNewsIntoDB,
  getAllNewsFromDB,
  getSingleNewsFromDB,
  updateNewsIntoDB,
};
