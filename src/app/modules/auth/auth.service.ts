import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await User.findOne({ email: payload?.email }).select(
    "+password",
  );
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
  }

  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, "This user is deleted!");
  }

  const isBlocked = isUserExist?.isActive;
  if (isBlocked === "blocked") {
    throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked!");
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExist?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.FORBIDDEN, "This password is not matched");
  }

  console.log(isPasswordMatch);
};

export const AuthService = {
  loginUser,
};
