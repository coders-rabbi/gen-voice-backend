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
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

const updateSingleCategoryController = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const updateData = req.body;
  const result = await CategoriesServic.updateSingleCategoryIntoDB(
    categoryId as string,
    updateData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Categories update successfully",
    data: result,
  });
});

const deleteCategoryController = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await CategoriesServic.deleteSingleCategoryFromBD(
    categoryId as string,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cagetory successfully deleted!",
    data: result,
  });
});

export const CategoriesController = {
  createCategoryController,
  getAllCategoryController,
  updateSingleCategoryController,
  deleteCategoryController,
};
