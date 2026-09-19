import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import { pollServices } from "./poll.service";

const createPollController = catchAsync(async (req, res) => {
  const response = await pollServices.createPollIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Poll create successfull",
    data: response,
  });
});

const getAllPollController = catchAsync(async (req, res) => {
  const response = await pollServices.getAllPollFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All polls are retrive done",
    data: response,
  });
});

const getSinglePollController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await pollServices.getSinglePollFromDB(id as string);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Poll retrieved successfully",
    data: response,
  });
});

const updateSinglePollController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body
  const response = await pollServices.updateSinglePollIntoDB(id as string, payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Poll update successfully",
    data: response,
  });
});

export const pollControllers = {
  createPollController,
  getAllPollController,
  getSinglePollController,
  updateSinglePollController,
};
