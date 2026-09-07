import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import { RoleServices } from "./role.service";

const createRole = catchAsync(async (req, res) => {
  const result = await RoleServices.createRoleIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Role created successfully",
    data: result,
  });
});

const getAllRole = catchAsync(async (req, res) => {
  const result = await RoleServices.getAllRoleFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Roles retrieved successfully",
    data: result,
  });
});

const getSingleRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoleServices.getSingleRoleFromDB(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Role retrieved successfully",
    data: result,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoleServices.updateRoleIntoDB(id as string, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Role updated successfully",
    data: result,
  });
});

const deleteRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await RoleServices.deleteRoleFromDB(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Role deleted successfully",
    data: result,
  });
});

export const RoleControllers = {
  createRole,
  getAllRole,
  getSingleRole,
  updateRole,
  deleteRole,
};
