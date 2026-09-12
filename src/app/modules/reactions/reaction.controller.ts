import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { ReactionServices } from "./reaction.service";
import sendResponse from "../../utils/sendreponse";

// reaction দেওয়া/পরিবর্তন করা/সরানো (toggle)
const toggleReaction = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const { type } = req.body;
  const userId = req.user?._id;

  const result = await ReactionServices.toggleReaction(
    newsId as string,
    userId as string,
    type,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reaction updated successfully",
    data: result,
  });
});

// API ৩: newsId দিয়ে reaction counts আনা
const getReactionCounts = catchAsync(async (req, res) => {
  const { newsId } = req.params;

  const result = await ReactionServices.getReactionCountsByNewsId(
    newsId as string,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reaction counts retrieved successfully",
    data: result,
  });
});

// API ৪: বর্তমান লগইন করা ইউজারের reaction আনা
const getMyReaction = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const userId = req.user?.userId;

  // ✅ Fix: userId না থাকলে সরাসরি null রিটার্ন করা, DB query চালানো নয়
  // (userId undefined অবস্থায় query চালালে ভুল/random ইউজারের reaction চলে আসতে পারত)
  if (!userId) {
    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User is not logged in",
      data: null,
    });
  }

  const result = await ReactionServices.getUserReaction(
    newsId as string,
    userId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User reaction retrieved successfully",
    data: result,
  });
});

export const ReactionControllers = {
  toggleReaction,
  getReactionCounts,
  getMyReaction,
};
