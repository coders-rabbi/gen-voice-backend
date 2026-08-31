import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendreponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";

const createReporterController = catchAsync(async (req, res) => {
  const { userData, reporterData } = req.body;
  const result = await UserServices.createReporterIntoDB(
    userData,
    reporterData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reporter create successfull",
    data: result,
  });
});

const createUserBySuperAdminController = catchAsync(async (req, res) => {
  const { userData } = req.body;
  const result = await UserServices.createUserBySuperAdminIntoDB(userData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Editor create successfull",
    data: result,
  });
});

const getAllUserController = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User successfully retrive from the database",
    data: result,
  });
});

const getSingleUserController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User successfully retrive from the database",
    data: result,
  });
});

const updatePasswordController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
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
});

const deleteUserController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User successfully delete from the database",
    data: result,
  });
});

export const UserController = {
  createReporterController,
  createUserBySuperAdminController,
  deleteUserController,
  getAllUserController,
  getSingleUserController,
  updatePasswordController,
};
