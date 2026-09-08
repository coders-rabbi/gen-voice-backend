import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdminIntoBd = async (payload: TAdmin) => {
  const result = await Admin.create(payload);
  return result;
};

const getAdminfromBD = async () => {
  const response = await Admin.find();
  return response;
};

const updateAdminInfoFromDB = async (id: string, payload: Partial<TAdmin>) => {
  const response = await Admin.findByIdAndUpdate(
    id,
    { adminName: payload.adminName },
    { returnDocument: "after", runValidators: true },
  );
  return response;
};

const deleteAdminUserFromBD = async (id: string) => {
  const response = await Admin.findByIdAndDelete(id, {
    isDeleted: true,
  });
  return response;
};

export const adminService = {
  updateAdminInfoFromDB,
  deleteAdminUserFromBD,
  createAdminIntoBd,
  getAdminfromBD,
};
