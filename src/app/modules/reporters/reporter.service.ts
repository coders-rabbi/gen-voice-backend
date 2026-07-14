import { Types } from "mongoose";
import { TReporter } from "./reporter.interface";
import { Reporter } from "./reporter.model";

const createReporterIntoDB = async (reporter: TReporter) => {
  if (await Reporter.isReporterExists(reporter.id)) {
    throw new Error("Reporter Already Exist");
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
  });
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
