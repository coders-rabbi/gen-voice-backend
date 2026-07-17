import config from "../../config";
import { TReporter } from "../reporters/reporter.interface";
import { Reporter } from "../reporters/reporter.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const createReporterIntoDB = async (
  userData: TUser,
  reporterData: TReporter,
) => {
  //user create into db
  userData.role = "student";
  const newUser = await User.create(userData);

  //create a reporter into db
  if (Object.keys(newUser).length) {
    reporterData.user = newUser._id;
    const result = await Reporter.create(reporterData);
    return result;
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
