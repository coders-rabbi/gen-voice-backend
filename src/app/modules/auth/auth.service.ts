import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

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

  const jwtPayload = {
    userId: isUserExist?.email,
    role: isUserExist?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "10d",
  });

  return { accessToken };
};

export const AuthService = {
  loginUser,
};
