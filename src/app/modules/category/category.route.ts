import express from "express";
import { CategoriesController } from "./category.controllet";
import validateRequest from "../../middleware/validateRequest";
import { CategoryValidation } from "./category.validation";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../users/user.constant";
const router = express.Router();

router.post(
  "/create_category",
  authValidation(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoriesController.createCategoryController,
);
router.get("/", CategoriesController.getAllCategoryController);
router.patch(
  "/update_category/:categoryId",
  authValidation(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoriesController.updateSingleCategoryController,
);
router.patch(
  "/delete_category/:categoryId",
  authValidation(USER_ROLE.ADMIN),
  CategoriesController.deleteCategoryController,
);

export const CategoriesRouter = router;
