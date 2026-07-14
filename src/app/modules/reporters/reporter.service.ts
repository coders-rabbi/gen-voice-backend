import { TReporter } from "./reporter.interface";
import { ReporterModel } from "./reporter.model";

const createReporterIntoDB = async (reporter: TReporter) => {
  const result = await ReporterModel.create(reporter);
  return result;
};

export const ReporterServices = {
  createReporterIntoDB,
};
