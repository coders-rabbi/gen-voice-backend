import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { webFooterServices } from "./footer.service";
import sendResponse from "../../utils/sendreponse";

const createWebFooterController = catchAsync(async (req, res) => {
  const payload = req.body;
  const response = await webFooterServices.createWebFooterIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Web footer info added successfully",
    data: response,
  });
});

const getWebFooterController = catchAsync(async (req, res) => {
  const response = await webFooterServices.getWebFooterFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Web footer data retrieved successfully",
    data: response,
  });
});

const updateWebFooterController = catchAsync(async (req, res) => {
  const payload = req.body;
  const response = await webFooterServices.updateWebFooterIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Web footer info updated successfully",
    data: response,
  });
});

export const webFooterControllers = {
  createWebFooterController,
  updateWebFooterController,
  getWebFooterController,
};
