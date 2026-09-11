import { TCommentPyaload } from "./comment.constant";
import { Comment } from "./comment.mode";

const createCommentIntroBD = async (payload: TCommentPyaload) => {
  const response = await Comment.create(payload);
  return response;
};

const getCommentFromDB = async () => {
  const response = await Comment.find();
  return response;
};

const getCommentByNewsId = async (id: string) => {
  const response = await Comment.find({ newsId: id });
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
