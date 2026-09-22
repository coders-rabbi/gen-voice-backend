import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync"; 
import sendResponse from "../../utils/sendreponse";
import { SavedNewsServices } from "./saveNews.service";

const toggleSaveNewsController = catchAsync(async (req, res) => {
  const userId = req.user?._id; // auth middleware theke
  const { newsId, reporterId } = req.body;
  const result = await SavedNewsServices.toggleSaveNewsIntoDB(
    userId,
    newsId,
    reporterId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result.saved ? "News saved" : "News unsaved",
    data: result,
  });
});

const getUserSavedNewsController = catchAsync(async (req, res) => {
  const userId = req.user?._id;
  const result = await SavedNewsServices.getSavedNewsByUserFromDB(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

const checkSavedController = catchAsync(async (req, res) => {
  const userId = req.user?._id;
  const { newsId } = req.params;

  const isSaved = await SavedNewsServices.checkIsNewsSavedFromDB(
    userId,
    newsId as string,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: { isSaved },
  });
});

export const SavedNewsController = {
  toggleSaveNewsController,
  getUserSavedNewsController,
  checkSavedController,
};