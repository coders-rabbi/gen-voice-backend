import { NextFunction, Request, Response } from "express";
import { ReporterServices } from "./reporter.service";
import sendResponse from "../../utils/sendreponse";
import { StatusCodes } from "http-status-codes";

const createReporterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { reporter: reporterData } = req.body;
    const result = await ReporterServices.createReporterIntoDB(reporterData);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Reporter create successfully ",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllReporterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await ReporterServices.getAllReporterFromDB();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Reporter successfully retrive from the database",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleReporterUsingReportIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// const updateSingleReporter.

export const ReporterController = {
  createReporterController,
  getAllReporterController,
  getSingleReporterUsingReportIdController,
};
