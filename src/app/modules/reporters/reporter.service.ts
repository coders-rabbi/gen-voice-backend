import { Types } from "mongoose";
import { TReporter } from "./reporter.interface";
import { Reporter } from "./reporter.model";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";

const createReporterIntoDB = async (reporter: TReporter) => {
  if (await Reporter.isReporterExists(reporter.id)) {
    throw new AppError(StatusCodes.CONFLICT, "Reporter Already Exist");
  }
  const result = await Reporter.create(reporter);
  return result;
};

const getAllReporterFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFields = ["email", "name.firstName", "presentAddress"];

  const reporterQuery = new QueryBuilder(Reporter.find(), query)
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await reporterQuery.modelQuery;
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

const updateSingleReporterInfoFromDB = async (
  id: string,
  payload: Partial<TReporter>,
) => {
  const { name, ...remainingReporterData } = payload || {};

  const updatedReporterData: Record<string, unknown> = {
    ...remainingReporterData,
  };

  if (name && typeof name === "object" && !Array.isArray(name)) {
    for (const [key, value] of Object.entries(name)) {
      updatedReporterData[`name.${key}`] = value;
    }
  }
  const result = await Reporter.findOneAndUpdate(
    { id },
    { $set: updatedReporterData },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  return result;
};

export const ReporterServices = {
  createReporterIntoDB,
  getAllReporterFromDB,
  getSingleReporterUsingReporterId,
  updateSingleReporterInfoFromDB,
};
