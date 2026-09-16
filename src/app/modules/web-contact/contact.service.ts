import { ISiteContact } from "./contact.interface";
import { SiteContact } from "./contact.model";

const createWebContactIntoDB = async (payload: ISiteContact) => {
  const response = await SiteContact.create(payload);
  return response;
};

const getWebContactFromDB = async () => {
  const response = await SiteContact.findOne();
  return response;
};

const updateWebContactIntoDB = async (payload: Partial<ISiteContact>) => {
  const response = await SiteContact.findOneAndUpdate({}, payload, {
    returnDocument: "after",
    runValidators: true,
  });
  return response;
};

export const contactServices = {
  createWebContactIntoDB,
  getWebContactFromDB,
  updateWebContactIntoDB,
};
