import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import { commentServices } from "./comment.service";

const createCommentController = catchAsync(async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const response = await commentServices.createCommentIntroBD(payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Comment created successful",
    data: response,
  });
});

const getCommentController = catchAsync(async (req, res) => {
  const response = await commentServices.getCommentFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Comments are successfully retrive",
    data: response,
  });
});

const getCommentByUsingNewsId = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const response = await commentServices.getCommentByNewsId(newsId as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Comment retrive done!",
    data: response,
  });
});

export const commentController = {
  getCommentByUsingNewsId,
  createCommentController,
  getCommentController,
};
