import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userData, reporterData } = req.body;
    const result = await UserServices.createUserIntoDB(userData, reporterData);
    res.status(200).json({
      success: true,
      message: "User Create Successfully",
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
    res.status(200).json({
      success: true,
      message: "Successfully retrive the user data from the database",
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
    res.status(200).json({
      success: true,
      message: "Successfully retrive single data from the database",
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
    res.status(200).json({
      success: true,
      message: "Succuessfully recover your password!",
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
    res.status(200).json({
      success: true,
      message: "Succefully deleted the user",
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
