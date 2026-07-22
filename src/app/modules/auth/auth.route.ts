import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidations } from "./auth.valiadtion";
import { AuthControllers } from "./auth.controller";
const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUserController,
);

export const authRoutes = router;
