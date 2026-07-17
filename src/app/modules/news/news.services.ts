import { Tnews } from "./news.interface";
import { News } from "./news.model";

const createNewsIntoDB = async (newsData: Tnews) => {
  const result = await News.create(newsData);
  return result;
};

const getAllNewsFromDB = async () => {
  const result = await News.find();
  return result;
};

const getSingleNewsFromDB = async (id: string) => {
  const result = await News.findById({ _id: id });
  return result;
};

export const NewsServices = {
  createNewsIntoDB,
  getAllNewsFromDB,
  getSingleNewsFromDB,
};
