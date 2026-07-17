import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendreponse";
import { StatusCodes } from "http-status-codes";

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userData, reporterData } = req.body;
    const result = await UserServices.createUserIntoDB(userData, reporterData);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User create successfull",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User successfully retrive from the database",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(id as string);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User successfully retrive from the database",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updatePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    console.log(id, password);
    const result = await UserServices.updateSingleUserFromBD(
      id as string,
      password,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Password recover successfull",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await UserServices.deleteUserFromDB(id as string);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User successfully delete from the database",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const UserController = {
  createUserController,
  deleteUserController,
  getAllUserController,
  getSingleUserController,
  updatePasswordController,
};
