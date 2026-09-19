import { IPoll } from "./poll.interface";
import Poll from "./poll.model";

const createPollIntoDB = async (payload: IPoll) => {
  const response = await Poll.create(payload);
  return response;
};

const getAllPollFromDB = async () => {
  const response = await Poll.find();
  return response;
};

const getSinglePollFromDB = async (id: string) => {
  const response = await Poll.findById(id);
  return response;
};

const updateSinglePollIntoDB = async (id: string, payload: IPoll) => {
  const response = await Poll.findByIdAndUpdate(id, {
    payload,
  });
  return response;
};

export const pollServices = {
  createPollIntoDB,
  getAllPollFromDB,
  getSinglePollFromDB,
  updateSinglePollIntoDB,
};
