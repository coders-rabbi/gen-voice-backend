import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdminIntoBd = async (payload: TAdmin) => {
  const result = await Admin.create(payload);
  return result;
};

const getAdminfromBD = async () => {
  const result = await Admin.find();
  return result;
};

export const adminService = {
  createAdminIntoBd,
  getAdminfromBD,
};
