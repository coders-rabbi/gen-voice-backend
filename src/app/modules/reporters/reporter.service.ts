import { Types } from "mongoose";
import { TReporter } from "./reporter.interface";
import { ReporterModel } from "./reporter.model";

const createReporterIntoDB = async (reporter: TReporter) => {
  const result = await ReporterModel.create(reporter);
  return result;
};

const getAllReporterFromDB = async () => {
  const result = await ReporterModel.find();
  return result;
};

const getSingleReporterUsingReporterId = async (reporterId: string) => {
  const result = await ReporterModel.findOne({
    id: reporterId,
  });
  return result;
};


export const ReporterServices = {
  createReporterIntoDB,
  getAllReporterFromDB,
  getSingleReporterUsingReporterId,
};
