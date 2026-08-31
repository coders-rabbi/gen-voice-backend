import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { createToken } from "./auth.utils";

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
    _id: isUserExist?._id,
    email: isUserExist?.email,
    role: isUserExist?.role,
    isDeleted: isUserExist.isDeleted,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as SignOptions["expiresIn"],
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires_in as SignOptions["expiresIn"],
  );

  return { accessToken, refreshToken };
};

const passwordChange = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const isUserExist = await User.findOne({ email: userData?.email }).select(
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
    payload?.oldPassword,
    isUserExist?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.FORBIDDEN, "This password is not matched");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData?.email,
      role: userData.role,
    },
    { password: newHashedPassword, passwordChangeAt: new Date() },
  );
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }

  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(
      token,
      config.jwt_refresh_token as string,
    ) as JwtPayload;
  } catch (err) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
  }

  const { email, role, iat } = decoded;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, `This ${role} is not found!`);
  }

  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, `This ${role} is deleted!`);
  }

  const isBlocked = isUserExist?.isActive;
  if (isBlocked === "blocked") {
    throw new AppError(StatusCodes.FORBIDDEN, `This ${role} is blocked!`);
  }
  if (
    isUserExist.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChanged(
      isUserExist.passwordChangeAt,
      iat as number,
    )
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
  }

  const jwtPayload = {
    _id: isUserExist?._id,
    email: isUserExist?.email,
    role: isUserExist?.role,
    isDeleted: isUserExist.isDeleted,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires_in as SignOptions["expiresIn"],
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
  passwordChange,
  refreshToken,
};
