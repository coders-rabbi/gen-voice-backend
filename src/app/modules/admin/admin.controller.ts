import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import { adminService } from "./admin.service";

const createAdminController = catchAsync(async (req, res) => {
  const response = await adminService.createAdminIntoBd(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Account create successfull",
    data: response,
  });
});

const getAdminController = catchAsync(async (req, res) => {
  const response = await adminService.getAdminfromBD();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All admin are retrive successfull",
    data: response,
  });
});

export const adminController = { createAdminController, getAdminController };
