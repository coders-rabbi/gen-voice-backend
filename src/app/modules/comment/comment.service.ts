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

const getCommentByNewsId = async (id: string ) => {
    const response = await Comment.find({newsId: id})
    return response;
}

export const commentServices = {
  createCommentIntroBD,
  getCommentByNewsId,
  getCommentFromDB,
};
