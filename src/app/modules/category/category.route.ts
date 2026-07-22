import express from "express";
import { CategoriesController } from "./category.controllet";
import validateRequest from "../../middleware/validateRequest";
import { CategoryValidation } from "./category.validation";
const router = express.Router();

router.post(
  "/create_category",
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoriesController.createCategoryController,
);
router.get("/", CategoriesController.getAllCategoryController);

export const CategoriesRouter = router;
