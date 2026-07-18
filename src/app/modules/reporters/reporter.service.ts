import { Types } from "mongoose";
import { TReporter } from "./reporter.interface";
import { Reporter } from "./reporter.model";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";

const createReporterIntoDB = async (reporter: TReporter) => {
  if (await Reporter.isReporterExists(reporter.id)) {
    throw new AppError(StatusCodes.CONFLICT, "Reporter Already Exist");
  }
  const result = await Reporter.create(reporter);
  return result;
};

const getAllReporterFromDB = async () => {
  const result = await Reporter.find();
  return result;
};

const getSingleReporterUsingReporterId = async (reporterId: string) => {
  const result = await Reporter.findOne({
    id: reporterId,
  }).populate("news");

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Reporter is not Exist");
  }
  return result;
};

// const updateReporterInfoFromDB = async(id: string) =>[
//   const
// ]

export const ReporterServices = {
  createReporterIntoDB,
  getAllReporterFromDB,
  getSingleReporterUsingReporterId,
};
