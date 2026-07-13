import { Request, Response } from "express";
import { ReporterServices } from "./reporter.service";

const createReporterController = async (req: Request, res: Response) => {
  try {
    const reporter = req.body;
    const result = ReporterServices.createReporterIntoDB(reporter);
    res.status(200).json({
      success: true,
      message: "Reporter is created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ReporterController = {
  createReporterController,
};
