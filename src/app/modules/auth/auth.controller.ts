import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import AppError from "../../error/AppError";
import { AuthService } from "./auth.service";

const loginUserController = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Successfully logged in",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await AuthService.passwordChange(req.user, req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Password recover is successfulyy",
    data: null,
  });
});

export const AuthControllers = {
  loginUserController,
  changePassword,
};
