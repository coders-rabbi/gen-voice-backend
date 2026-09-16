import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import { contactServices } from "./contact.service";

const createContactCotroller = catchAsync(async (req, res) => {
  const payload = req.body;
  const response = await contactServices.createWebContactIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Site contact info added successfull",
    data: response,
  });
});

const getWebContactController = catchAsync(async (req, res) => {
  const response = await contactServices.getWebContactFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Site contact data retrive",
    data: response,
  });
});

const updateWebContactController = catchAsync(async (req, res) => {
  const payload = req.body;
  const response = await contactServices.updateWebContactIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Site contact info updated successfull",
    data: response,
  });
});

export const contactControllers = {
  createContactCotroller,
  getWebContactController,
  updateWebContactController,
};
