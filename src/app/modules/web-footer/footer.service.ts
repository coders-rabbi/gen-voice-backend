import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { WebFooter } from "./footer.model";
import { IWebFooter } from "./footer.interface";

const createWebFooterIntoDB = async (payload: IWebFooter) => {
  const isExist = await WebFooter.findOne();
  if (isExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Web footer already exists, update it instead",
    );
  }

  const response = await WebFooter.create(payload);
  return response;
};

const getWebFooterFromDB = async () => {
  const response = await WebFooter.findOne();
  return response;
};

const updateWebFooterIntoDB = async (payload: Partial<IWebFooter>) => {
  const response = await WebFooter.findOneAndUpdate({}, payload, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!response) {
    throw new AppError(StatusCodes.NOT_FOUND, "Web footer not found");
  }

  return response;
};

export const webFooterServices = {
  createWebFooterIntoDB,
  updateWebFooterIntoDB,
  getWebFooterFromDB,
};
