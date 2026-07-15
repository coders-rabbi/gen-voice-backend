import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
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

const deleteUserFromDB = async (id: string) => {
  const result = await User.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  deleteUserFromDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
