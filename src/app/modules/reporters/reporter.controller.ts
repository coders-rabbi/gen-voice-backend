import { NextFunction, Request, Response } from "express";
import { ReporterServices } from "./reporter.service";

const createReporterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { reporter: reporterData } = req.body;
    const result = await ReporterServices.createReporterIntoDB(reporterData);
    res.status(200).json({
      success: true,
      message: "Reporter is created successfully",
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
    res.status(200).json({
      success: true,
      message: "Reporters are retrived successfully",
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
    res.status(200).json({
      success: true,
      message: "Reporter is retrive successfully",
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
