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
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365,
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

const forgatePassword = catchAsync(async (req, res) => {
  const result = await AuthService.fortagePasswordService(req.body.email);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Reset link is generated successful",
    data: result,
  });
});

const resetPasswordController = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await AuthService.resetPasswordService(
    req.body,
    token as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Password reset successfull",
    data: result,
  });
});

const logoutController = catchAsync(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Successfully logged out",
    data: null,
  });
});

export const AuthControllers = {
  loginUserController,
  adminLoginController,
  changePassword,
  refreshToken,
  forgatePassword,
  resetPasswordController,
  logoutController,
};
