import { NextFunction, Request, Response } from "express";
import { NewsServices } from "./news.services";
import sendResponse from "../../utils/sendreponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";

const createNewsController = catchAsync(async (req, res) => {
  const newsData = req.body;
  const result = await NewsServices.createNewsIntoDB(newsData);
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

const updateNewsController = catchAsync(async (req, res, next) => {
  const { newsId } = req.params;
  const payload = req.body;

  console.log(newsId, payload);

  const result = await NewsServices.updateNewsIntoDB(newsId as string, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "News update successfully",
    data: result,
  });
});

export const NewsControllers = {
  createNewsController,
  getAllNewsController,
  getSingleNewsController,
  updateNewsController,
};
