import { NextFunction, Request, Response } from "express";
import { ReporterServices } from "./reporter.service";
import sendResponse from "../../utils/sendreponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";

const createReporterController = catchAsync(async (req, res, next) => {
  const { reporter: reporterData } = req.body;
  const result = await ReporterServices.createReporterIntoDB(reporterData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reporter create successfully ",
    data: result,
  });
});

const getAllReporterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ReporterServices.getAllReporterFromDB();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Reporter successfully retrive from the database",
      data: result,
    });
  },
);

const getSingleReporterUsingReportIdController = catchAsync(
  async (req, res, next) => {
    const { reporterId } = req.params;
    const result = await ReporterServices.getSingleReporterUsingReporterId(
      reporterId as string,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Reporter successfully retrive from the database",
      data: result,
    });
  },
);

const updateSingleReporterController = catchAsync(async (req, res, next) => {
  const { reporterId } = req.params;
  const updatedData = req.body;
  const result = await ReporterServices.updateSingleReporterInfoFromDB(
    reporterId as string,
    updatedData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

export const ReporterController = {
  createReporterController,
  getAllReporterController,
  getSingleReporterUsingReportIdController,
  updateSingleReporterController,
};
