import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { TRole } from "./role.interface";
import { Role } from "./role.model";

const createRoleIntoDB = async (payload: TRole) => {
  const existingRole = await Role.findOne({
    roleName: payload.roleName,
    isDeleted: false,
  });
  if (existingRole) {
    throw new AppError(StatusCodes.CONFLICT, "Role already exists");
  }

  const result = await Role.create(payload);
  return result;
};

const getAllRoleFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFields = ["name"];

  const roleQuery = new QueryBuilder(Role.find({ isDeleted: false }), query)
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await roleQuery.modelQuery;
  return result;
};

const getSingleRoleFromDB = async (id: string) => {
  const result = await Role.findOne({ _id: id, isDeleted: false });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Role not found");
  }

  return result;
};

const getSingleRoleByName = async (name: string) => {
  const result = await Role.findOne({ roleName: name });
  return result;
};

const updateRoleIntoDB = async (id: string, payload: Partial<TRole>) => {
  const role = await Role.findOne({ _id: id, isDeleted: false });

  if (!role) {
    throw new AppError(StatusCodes.NOT_FOUND, "Role not found");
  }

  const result = await Role.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    context: "query",
  });

  return result;
};

const deleteRoleFromDB = async (id: string) => {
  const role = await Role.findOne({ _id: id, isDeleted: false });

  if (!role) {
    throw new AppError(StatusCodes.NOT_FOUND, "Role not found");
  }

  const result = await Role.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { returnDocument: "after" },
  );

  return result;
};

export const RoleServices = {
  createRoleIntoDB,
  getAllRoleFromDB,
  getSingleRoleFromDB,
  getSingleRoleByName,
  updateRoleIntoDB,
  deleteRoleFromDB,
};
