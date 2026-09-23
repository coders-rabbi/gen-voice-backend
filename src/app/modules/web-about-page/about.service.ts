import { IAboutFormValues } from "./about.interface";
import { About } from "./about.model";

const createAboutIntoDB = async (payload: IAboutFormValues) => {
  const response = await About.create(payload);
  return response;
};

const getWebAboutInfoFromDB = async () => {
  const response = await About.findOne();
  return response;
};

const updateWebAboutInfoFromDB = async (payload: Partial<IAboutFormValues>) => {
  const response = await About.findOneAndUpdate({}, payload, {
    returnDocument: "after",
  });
  return response;
};

export const aboutServices = {
  createAboutIntoDB,
  getWebAboutInfoFromDB,
  updateWebAboutInfoFromDB,
};
