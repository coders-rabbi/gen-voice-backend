import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import { CategoriesServic } from "./category.service";

const createCategoryController = catchAsync(async (req, res) => {
  const categoryData = req.body;
  const result = await CategoriesServic.createCategoryIntoDB(categoryData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cagetgory create successfully",
    data: result,
  });
});

const getAllCategoryController = catchAsync(async (req, res) => {
  const result = await CategoriesServic.getAllCategoriesFromDB(req.query);
  return result;
});

export const CategoriesController = {
  createCategoryController,
  getAllCategoryController,
};
