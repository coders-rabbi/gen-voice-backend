import express from "express";
import authValidation from "../../middleware/authValidation";
import { ADMIN_ROLE } from "../admin/admin.constant";
import validateRequest from "../../middleware/validateRequest";
import { WebFooterValidations } from "./footer.validation";
import { webFooterControllers } from "./footer.controller";

const router = express.Router();

router.post(
  "/create-web-footer-info",
  authValidation(ADMIN_ROLE.SUPER_ADMIN, ADMIN_ROLE.ADMIN),
  validateRequest(WebFooterValidations.createWebFooterValidationSchema),
  webFooterControllers.createWebFooterController,
);

router.get("/", webFooterControllers.getWebFooterController);

router.patch(
  "/update-web-footer-info",
  authValidation(ADMIN_ROLE.ADMIN, ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(WebFooterValidations.updateWebFooterValidationSchema),
  webFooterControllers.updateWebFooterController,
);

export const WebFooterRoutes = router;
