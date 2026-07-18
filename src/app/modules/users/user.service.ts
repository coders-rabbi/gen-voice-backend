import mongoose from "mongoose";
import config from "../../config";
import { TReporter } from "../reporters/reporter.interface";
import { Reporter } from "../reporters/reporter.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";

const createReporterIntoDB = async (
  userData: TUser,
  reporterData: TReporter,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.role = "reporter";
    const newUser = await User.create([userData], { session });
    const createdUser = newUser[0];
    if (!createdUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User create to fail");
    }

    reporterData.user = createdUser._id;
    const newStudent = await Reporter.create([reporterData], { session });

    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Reporter create to fail");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  // const result = await User.findOne({ _id: id });
  const result = await User.aggregate([{ $match: { _id: id } }]);
  return result;
};

const updateSingleUserFromBD = async (id: string, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.updateOne(
    { _id: id },
    {
      $set: {
        password: hashedPassword,
      },
    },
  );

  //যেহেতু password tai return korbo na.
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB: createReporterIntoDB,
  deleteUserFromDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromBD,
};
