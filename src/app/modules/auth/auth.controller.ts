import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import AppError from "../../error/AppError";
import { AuthService } from "./auth.service";
import config from "../../config";

const loginUserController = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Successfully logged in",
    data: accessToken,
  });
});

const adminLoginController = catchAsync(async (req, res) => {
  const result = await AuthService.adminLogin(req.body);

  const { adminRefreshToken, adminAccessToken } = result;
  res.cookie("adminRefreshToken", adminRefreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Successfully logged in",
    data: adminAccessToken,
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

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Access token regenerate successful",
    data: result,
  });
});

export const AuthControllers = {
  loginUserController,
  adminLoginController,
  changePassword,
  refreshToken,
};
