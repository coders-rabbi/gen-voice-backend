import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import { AuthService } from "./auth.service";

const loginUserController = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Successfully logged in",
    data: result,
  });
});

export const AuthControllers = {
  loginUserController,
};
