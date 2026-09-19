import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import { aboutServices } from "./about.service";

const createAboutController = catchAsync(async (req, res) => {
  const payload = req.body;
  const response = await aboutServices.createAboutIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "About info added successfully",
    data: response,
  });
});

const getWebAboutController = catchAsync(async (req, res) => {
  const response = await aboutServices.getWebAboutInfoFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "About info added successfully",
    data: response,
  });
});
const updateWebAboutController = catchAsync(async (req, res) => {
  const payload = req.body;
  console.log(payload)
  const response = await aboutServices.updateWebAboutInfoFromDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "About info updated successfully",
    data: response,
  });
});

export const aboutControllers = {
  createAboutController,
  getWebAboutController,
  updateWebAboutController,
};
