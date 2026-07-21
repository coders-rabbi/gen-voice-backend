import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { TNews } from "./news.interface";
import { News } from "./news.model";

const createNewsIntoDB = async (newsData: TNews) => {
  const result = await News.create(newsData);
  return result;
};

const getAllNewsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  console.log(query);
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = News.find({
    $or: ["title", "shortDetails", "content", "location", "tags"].map(
      (field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      }),
    ),
  });

  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  // const result = await searchQuery
  //   .populate("reporterId")
  //   .populate("approvedBy");
  // .populate("categoryId");
  // return result;

  const filterQuery = searchQuery.find(queryObj);

  let sort = "createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";
  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const filedsQuery = await limitQuery
    .select(fields)
    .populate("reporterId")
    .populate("approvedBy");

  return filedsQuery;
};

const getSingleNewsFromDB = async (id: string) => {
  const result = await News.findById({ _id: id });
  return result;
};

const updateNewsIntoDB = async (id: string, payload: Partial<TNews>) => {
  const isNewsExist = await News.findOne({ newsId: id });
  if (!isNewsExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "News is not found");
  }

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
