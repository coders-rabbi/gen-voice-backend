import { Types } from "mongoose";
import { TReporter } from "./reporter.interface";
import { Reporter } from "./reporter.model";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import { News } from "../news/news.model";

const createReporterIntoDB = async (reporter: TReporter) => {
  if (await Reporter.isReporterExists(reporter.id)) {
    throw new AppError(StatusCodes.CONFLICT, "Reporter Already Exist");
  }
  const result = await Reporter.create(reporter);
  return result;
};

const getAllReporterFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFields = ["email", "name.firstName", "presentAddress"];

  const reporterQuery = new QueryBuilder(
    Reporter.find().populate({
      path: "user",
      select: "_id email role isDeleted isActive",
    }),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await reporterQuery.modelQuery;

  // এই page-এ যতগুলো reporter এসেছে, শুধু তাদের _id গুলো নিয়ে news count বের করা
  const reporterIds = result.map((reporter) => reporter._id);

  const newsCounts = await News.aggregate([
    {
      $match: {
        reporterId: { $in: reporterIds },
      },
    },
    {
      $group: {
        _id: "$reporterId",
        count: { $sum: 1 },
      },
    },
  ]);

  // দ্রুত lookup এর জন্য একটা Map বানানো: reporterId -> count
  const countMap = new Map(
    newsCounts.map((item) => [item._id.toString(), item.count]),
  );

  // প্রতিটা reporter object-এর সাথে reporterNewsLength যোগ করা
  const resultWithNewsCount = result.map((reporter) => {
    const reporterObj = reporter.toObject();
    return {
      ...reporterObj,
      reporterNewsLength: countMap.get(reporter._id.toString()) || 0,
    };
  });

  return resultWithNewsCount;
};

const getSingleReporterUsingUserIdFromBD = async (userId: string) => {
  const result = await Reporter.findOne({
    user: userId,
  });
  return result;
};

const getSingleReporterUsingReporterId = async (reporterId: string) => {
  const result = await Reporter.findById(reporterId);

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
  getSingleReporterUsingUserIdFromBD,
};
