import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidations } from "./auth.valiadtion";
import { AuthControllers } from "./auth.controller";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../users/user.constant";
const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUserController,
);
router.post(
  "/admin-login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.adminLoginController,
);
router.patch(
  "/recover-password",
  authValidation(
    USER_ROLE.ADMIN,
    USER_ROLE.EDITOR,
    USER_ROLE.REPORTER,
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.USER,
  ),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const authRoutes = router;
