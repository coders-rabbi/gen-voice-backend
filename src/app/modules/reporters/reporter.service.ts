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
  const searchAbleFields = ["email", "name.firstName", "presentAddress", "contactNo"];

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // ১. sort/paginate ছাড়া শুধু search + filter করে সব matching _id আনা
  const { page: _p, limit: _l, sort: _s, fields: _f, ...rest } = query;

  const idQuery = new QueryBuilder(Reporter.find(), rest)
    .search(searchAbleFields)
    .filter();

  const matched = await idQuery.modelQuery.select("_id").lean();
  const allIds = matched.map((r) => r._id);
  const total = allIds.length;

  // ২. সবার news count একবারে বের করা
  const newsCounts = await News.aggregate([
    { $match: { reporterId: { $in: allIds } } },
    { $group: { _id: "$reporterId", count: { $sum: 1 } } },
  ]);

  const countMap = new Map<string, number>(
    newsCounts.map((item) => [item._id.toString(), item.count]),
  );

  // ৩. count অনুযায়ী sort (বেশি নিউজ আগে), তারপর paginate
  const pageIds = [...allIds]
    .sort(
      (a, b) =>
        (countMap.get(b.toString()) || 0) - (countMap.get(a.toString()) || 0),
    )
    .slice(skip, skip + limit);

  // ৪. শুধু এই পেজের reporter গুলো populate করে আনা
  const reporters = await Reporter.find({ _id: { $in: pageIds } }).populate({
    path: "user",
    select: "_id email role isDeleted isActive",
  });

  const reporterMap = new Map(reporters.map((r) => [r._id.toString(), r]));

  // ৫. sort করা order ঠিক রেখে count যোগ করা
  const result = pageIds
    .map((id) => {
      const reporter = reporterMap.get(id.toString());
      if (!reporter) return null;
      return {
        ...reporter.toObject(),
        reporterNewsLength: countMap.get(id.toString()) || 0,
      };
    })
    .filter(Boolean);

  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    result,
  };
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

  const updatedReporterData: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(remainingReporterData)) {
    if (value !== undefined && value !== null && value !== "") {
      updatedReporterData[key] = value;
    }
  }

  if (name && typeof name === "object" && !Array.isArray(name)) {
    for (const [key, value] of Object.entries(name)) {
      if (value !== undefined && value !== null && value !== "") {
        updatedReporterData[`name.${key}`] = value;
      }
    }
  }

  if (Object.keys(updatedReporterData).length === 0) {
    return await Reporter.findById(id);
  }

  const result = await Reporter.findByIdAndUpdate(
    id,
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
