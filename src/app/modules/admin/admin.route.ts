import express from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminValidationSchema),
  adminController.createAdminController,
);
router.get("/", adminController.getAdminController);

export const adminRouters = router;
