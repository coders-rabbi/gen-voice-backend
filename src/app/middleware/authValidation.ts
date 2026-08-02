import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/users/user.interface";

const authValidation = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
    }

    jwt.verify(token, config.jwt_access_token as string, (err, decoded) => {
      if (err) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
      }

      if (
        requiredRole.length > 0 &&
        !requiredRole.includes((decoded as JwtPayload).role as TUserRole)
      ) {
        throw new AppError(StatusCodes.FORBIDDEN, "Forbidden access");
      }
      req.user = decoded as JwtPayload;
    });

    next();
  });
};

export default authValidation;
