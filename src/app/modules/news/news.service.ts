import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { TNews } from "./news.interface";
import { News } from "./news.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { Category } from "../category/category.model";
import { Reporter } from "../reporters/reporter.model";
import { Types } from "mongoose";
import { commentServices } from "../comment/comment.service";

const createNewsIntoDB = async (
  newsData: TNews,
  authenticatedUserId: string,
) => {
  if (!newsData.categoryId) {
    throw new Error("categoryId is required");
  }

  const category = await Category.findById(newsData.categoryId).select(
    "categoryName",
  );

  if (!category) {
    throw new Error("Invalid category");
  }

  const lastNews = await News.findOne()
    .sort({ createdAt: -1 })
    .select("newsId");
  const newYear = new Date().getFullYear();

  const lastDigitForNewsID = lastNews?.newsId?.slice(-5) || "00000";
  const increaseAbleNewsId = String(Number(lastDigitForNewsID) + 1).padStart(
    5,
    "0",
  );

  const newData = {
    ...newsData,
    newsId: `news-${category.categoryName}-${newYear}-${increaseAbleNewsId}`,
  };

  try {
    const result = await News.create(newData);
    return result;
  } catch (err: any) {
    if (err?.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      throw new Error(`A news item with this ${field} already exists`);
    }
    throw err;
  }
};

const getAllNewsFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFiends = [
    "title",
    "shortDetails",
    "content",
    "location",
    "tags",
  ];
  const newsQuery = new QueryBuilder(
    News.find({ contentType: { $eq: "Text" } }).populate([
      {
        path: "reporterId",
        select: "name id",
      },
      {
        path: "approvedBy",
        select: "role email",
      },
      {
        path: "categoryId",
        select: "categoryName",
      },
    ]),
    query,
  )
    .search(searchAbleFiends)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await newsQuery.modelQuery;
  const newsIds = result.map((item) => item.newsId);

  const commentCounts =
    await commentServices.getCommentCountsByNewsIds(newsIds);

  const dataWithCommentCount = result.map((item) => ({
    ...item.toObject(),
    commentCount: commentCounts[item.newsId] || 0,
  }));

  return dataWithCommentCount;
};
const getAllVideoNewsFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFiends = [
    "title",
    "shortDetails",
    "content",
    "location",
    "tags",
  ];
  const newsQuery = new QueryBuilder(
    News.find({ contentType: { $eq: "Video" } }).populate([
      {
        path: "reporterId",
        select: "name email profileImage",
      },
      {
        path: "approvedBy",
        select: "role email",
      },
      {
        path: "categoryId",
        select: "categoryName",
      },
    ]),
    query,
  )
    .search(searchAbleFiends)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await newsQuery.modelQuery;

  return result;
};

const getSingleReporterNewsFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const reporter = await Reporter.findOne({ user: userId }).select("_id");
  if (!reporter) {
    throw new AppError(StatusCodes.NOT_FOUND, "Reporter not found");
  }
  const repId = reporter._id;
  console.log(repId);
  const searchAbleFiends = [
    "title",
    "shortDetails",
    "content",
    "location",
    "tags",
  ];

  const newsQuery = new QueryBuilder(
    News.find({ reporterId: repId }).populate([
      {
        path: "reporterId",
        select: "name email profileImage",
      },
      {
        path: "approvedBy",
        select: "role email",
      },
      {
        path: "categoryId",
        select: "categoryName",
      },
    ]),
    query,
  )
    .search(searchAbleFiends)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await newsQuery.modelQuery;

  return result;
};

const getNewsByReporterId = async (repId: string) => {
  if (!repId) return null;
  const response = await News.find({ reporterId: repId }).populate([
    {
      path: "reporterId",
      select: "name id",
    },
    {
      path: "approvedBy",
      select: "role email",
    },
    {
      path: "categoryId",
      select: "categoryName",
    },
  ]);
  return response;
};

const getSingleNewsFromDB = async (id: string) => {
  const result = await News.findById(id); // ✅ সঠিক
  return result;
};

const getNewsByCategoryIDFromDB = async (categoryId: string) => {
  const response = await News.find({ categoryId: categoryId }).populate([
    {
      path: "reporterId",
      select: "name id",
    },
    {
      path: "approvedBy",
      select: "role email",
    },
    {
      path: "categoryId",
      select: "categoryName",
    },
  ]);

  return response;
};

const getHomePageNewsFromDB = async () => {
  const categories = [
    "Sports",
    "Politics",
    "Business",
    "Technology",
    "Music",
    "Entertaiment",
  ];

  const LIMIT_PER_CATEGORY = 6;

  const pipeline = [
    {
      $match: {
        status: "published",
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $facet: categories.reduce(
        (acc, catName) => {
          acc[catName] = [
            { $match: { "category.categoryName": catName } },
            { $sort: { publishAt: -1 } },
            { $limit: LIMIT_PER_CATEGORY },

            {
              $lookup: {
                from: "reporters",
                localField: "reporterId",
                foreignField: "_id",
                as: "reporterId",
                pipeline: [
                  {
                    $addFields: {
                      fullName: {
                        $trim: {
                          input: {
                            $concat: [
                              "$name.firstName",
                              " ",
                              { $ifNull: ["$name.middleName", ""] },
                              " ",
                              "$name.lastName",
                            ],
                          },
                        },
                      },
                    },
                  },
                  { $project: { id: 1, fullName: 1 } },
                ],
              },
            },
            {
              $unwind: {
                path: "$reporterId",
                preserveNullAndEmptyArrays: true,
              },
            },

            {
              $lookup: {
                from: "users",
                localField: "approvedBy",
                foreignField: "_id",
                as: "approvedBy",
                pipeline: [{ $project: { role: 1, email: 1 } }],
              },
            },
            {
              $unwind: {
                path: "$approvedBy",
                preserveNullAndEmptyArrays: true,
              },
            },
          ];
          return acc;
        },
        {} as Record<string, any[]>,
      ),
    },
  ];

  const result = await News.aggregate(pipeline);
  return result[0];
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

const updateNewsStatus = async (id: string, payload: Partial<TNews>) => {
  const updateData: Partial<TNews> = {};

  if (payload?.status) {
    updateData.status = payload.status;
  }

  if (payload?.approvedBy) {
    updateData.approvedBy = payload.approvedBy;
  }

  const result = await News.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "News not found");
  }

  return result;
};

const getMonthlyPostCountFromDB = async (reporterId: string, year?: number) => {
  const targetYear = year || new Date().getFullYear();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const result = await News.aggregate([
    {
      $match: {
        reporterId: new Types.ObjectId(reporterId),
        contentType: "Text",
        createdAt: {
          $gte: new Date(`${targetYear}-01-01T00:00:00.000Z`),
          $lte: new Date(`${targetYear}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  const monthlyData = monthNames.map((name, index) => {
    const found = result.find((r) => r._id === index + 1);
    return {
      month: name,
      count: found ? found.count : 0,
    };
  });

  return {
    year: targetYear,
    data: monthlyData,
  };
};

const getPopularNewsFromBD = async (query: Record<string, unknown>) => {
  const searchAbleFields = [
    "title",
    "shortDetails",
    "content",
    "location",
    "tags",
  ];

  const newsQuery = new QueryBuilder(
    News.find({ contentType: { $eq: "Text" } })
      .sort({ views: -1 })
      .populate([
        {
          path: "reporterId",
          select: "name",
        },
        {
          path: "approvedBy",
          select: "role email",
        },
        {
          path: "categoryId",
          select: "categoryName",
        },
      ]),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .paginate()
    .fields();

  const result = await newsQuery.modelQuery;

  return result;
};

const incrementNewsViewInDB = async (newsId: string) => {
  const result = await News.findOneAndUpdate(
    { newsId },
    { $inc: { views: 1 } },
    { returnDocument: "after", select: "views" },
  );
  return result;
};

export const NewsServices = {
  createNewsIntoDB,
  getAllNewsFromDB,
  getAllVideoNewsFromDB,
  getSingleReporterNewsFromDB,
  getNewsByReporterId,
  getHomePageNewsFromDB,
  getNewsByCategoryIDFromDB,
  getSingleNewsFromDB,
  updateNewsStatus,
  updateNewsIntoDB,
  getMonthlyPostCountFromDB,
  incrementNewsViewInDB,
  getPopularNewsFromBD,
};
