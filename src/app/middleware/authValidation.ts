import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";

const authValidation = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
    }

    const token = authHeader.split(" ")[1]; // এখানে শুধু আসল JWT টা থাকবে

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_token as string,
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

    // 🔧 fix: password change check
    if (
      isUserExist.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChanged(
        isUserExist.passwordChangeAt,
        iat as number,
      )
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
    }

    if (
      requiredRole.length > 0 &&
      !requiredRole.includes(decoded.role as TUserRole)
    ) {
      throw new AppError(StatusCodes.FORBIDDEN, "Forbidden access");
    }

    req.user = decoded;
    next();
  });
};

export default authValidation;
