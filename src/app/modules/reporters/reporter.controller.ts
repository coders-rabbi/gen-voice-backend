import { Request, Response } from "express";
import { ReporterServices } from "./reporter.service";

const createReporterController = async (req: Request, res: Response) => {
  try {
    const { reporter: reporterData } = req.body;
    const result = await ReporterServices.createReporterIntoDB(reporterData);
    res.status(200).json({
      success: true,
      message: "Reporter is created successfully",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      error: err,
    });
  }
};

const getAllReporterController = async (req: Request, res: Response) => {
  try {
    const result = await ReporterServices.getAllReporterFromDB();
    res.status(200).json({
      success: true,
      message: "Reporters are retrived successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: err,
    });
  }
};

const getSingleReporterUsingReportIdController = async (
  req: Request,
  res: Response,
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
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: err,
    });
  }
};

// const updateSingleReporter.

export const ReporterController = {
  createReporterController,
  getAllReporterController,
  getSingleReporterUsingReportIdController,
};
