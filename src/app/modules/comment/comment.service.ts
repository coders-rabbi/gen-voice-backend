import { TCommentPyaload } from "./comment.constant";
import { Comment } from "./comment.mode";

const userPopulate = {
  path: "userId",
  select: "_id email role",
};

const createCommentIntroBD = async (payload: TCommentPyaload) => {
  const response = await Comment.create(payload);
  return response.populate(userPopulate);
};

const getCommentFromDB = async () => {
  const response = await Comment.find()
    .populate(userPopulate)
    .sort({ createdAt: -1 });
  return response;
};

const getCommentByNewsId = async (id: string) => {
  const response = await Comment.find({
    newsId: id,
    isDeleted: false,
    isHidden: false,
  })
    .populate(userPopulate)
    .sort({ createdAt: -1 });
  return response;
};

const getCommentCountsByNewsIds = async (
  newsIds: string[],
): Promise<Record<string, number>> => {
  const result = await Comment.aggregate([
    {
      $match: {
        newsId: { $in: newsIds },
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$newsId",
        count: { $sum: 1 },
      },
    },
  ]);

  const countMap: Record<string, number> = {};
  result.forEach((item) => {
    countMap[item._id] = item.count;
  });

  return countMap;
};

export const commentServices = {
  createCommentIntroBD,
  getCommentByNewsId,
  getCommentFromDB,
  getCommentCountsByNewsIds,
};