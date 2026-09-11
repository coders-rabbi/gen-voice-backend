import { NextFunction, Request, Response } from "express";
import { NewsServices } from "./news.service";
import sendResponse from "../../utils/sendreponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { News } from "./news.model";

const createNewsController = catchAsync(async (req, res) => {
  // const authenticatedUserId = req.user?.id ?? req.user?._id;
  const authenticatedUserId = req.headers.authorization;

  if (!authenticatedUserId) {
    return sendResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "You must be logged in to create news",
      data: null,
    });
  }

  const newsData = req.body;
  const result = await NewsServices.createNewsIntoDB(
    newsData,
    authenticatedUserId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "News create successfully",
    data: result,
  });
});

const getAllNewsController = catchAsync(async (req, res, next) => {
  const result = await NewsServices.getAllNewsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All news are successfully retrive from the database",
    data: result,
  });
});

const getAllVideNewsController = catchAsync(async (req, res) => {
  const result = await NewsServices.getAllVideoNewsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All Video News are successfully retrive from the database",
    data: result,
  });
});

const getSingleReporterNewsController = catchAsync(async (req, res) => {
  const result = await NewsServices.getSingleReporterNewsFromDB(
    req.user?._id,
    req.query,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All News are successfully retrive from the database",
    data: result,
  });
});

const getNewsByReporterId = catchAsync(async (req, res) => {
  const { repId } = req.params;
  const result = await NewsServices.getNewsByReporterId(repId as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reporter all News are successfully retrieved from the database",
    data: result,
  });
});

const getHomePageNewsController = catchAsync(async (req, res) => {
  const result = await NewsServices.getHomePageNewsFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Homepage news retrieved successfully",
    data: result,
  });
});

const getSingleNewsController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await NewsServices.getSingleNewsFromDB(id as string);
    res.status(200).json({
      success: true,
      message: "Succesfully retrive a news from the database",
      data: result,
    });
  },
);

const getNewsByCategoryIDController = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const response = await NewsServices.getNewsByCategoryIDFromBD(
    categoryId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "News Retrive by category",
    data: response,
  });
});

const updateNewsController = catchAsync(async (req, res, next) => {
  const { newsId } = req.params;
  const payload = req.body;
  const result = await NewsServices.updateNewsIntoDB(newsId as string, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "News update successfully",
    data: result,
  });
});

const updateNewsStatusController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const statusData = req.body;
  const result = await NewsServices.updateNewsStatus(id as string, statusData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "News update successful",
    data: result,
  });
});

const getMonthlyPostCountController = catchAsync(async (req, res, next) => {
  const { reporterId } = req.params;
  const { year } = req.query;

  const result = await NewsServices.getMonthlyPostCountFromDB(
    reporterId as string,
    year ? Number(year) : undefined,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Monthly post count is successfully retrieved from the database",
    data: result,
  });
});

const incrementNewsViewController = catchAsync(async (req, res, next) => {
  const { newsId } = req.params;
  const result = await NewsServices.incrementNewsViewInDB(newsId as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "News view count updated successfully",
    data: result,
  });
});

const pupularNewsController = catchAsync(async (req, res) => {
  const response = await NewsServices.getPopularNewsFromBD(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Popular news retrive done",
    data: response,
  });
});

export const NewsControllers = {
  createNewsController,
  getAllNewsController,
  getAllVideNewsController,
  getHomePageNewsController,
  getSingleNewsController,
  updateNewsStatusController,
  getSingleReporterNewsController,
  getNewsByCategoryIDController,
  getNewsByReporterId,
  updateNewsController,
  getMonthlyPostCountController,
  incrementNewsViewController,
  pupularNewsController,
};
