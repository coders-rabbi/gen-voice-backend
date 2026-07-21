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

const getAllReporterFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Reporter.find({
    $or: ["email", "name.firstName", "presentAddress"].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  //fintering
  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery.find(queryObj);

  let sort = "createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";
  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const filedsQuery = await limitQuery.select(fields);

  return filedsQuery;
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
