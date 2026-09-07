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
    const newReporter = await Reporter.create([reporterData], { session });

    if (!newReporter.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Reporter create to fail");
    }
                                                                                                                                                  
    await session.commitTransaction();
    await session.endSession();

    return newReporter;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

const createUserBySuperAdminIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
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

const updateSingleUserStatusFromDB = async (id: string, payload: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const reporter = await Reporter.findById(id).session(session);
    if (!reporter) {
      throw new AppError(StatusCodes.NOT_FOUND, "Reporter not found");
    }

    const userId = reporter.user;
    if (!userId) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "User not found for the reporter",
      );
    }

    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { isActive: payload },
      { returnDocument: "after", session },
    );

    if (!userUpdate) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User failed to update");
    }

    const reporterUpdate = await Reporter.findByIdAndUpdate(
      id,
      { isActive: payload },
      { returnDocument: "after", session },
    );

    if (!reporterUpdate) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Reporter failed to update");
    }

    await session.commitTransaction();
    return userUpdate;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createReporterIntoDB,
  createUserBySuperAdminIntoDB,
  deleteUserFromDB,
  updateSingleUserStatusFromDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromBD,
};
