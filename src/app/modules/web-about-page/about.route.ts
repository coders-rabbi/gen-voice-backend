import express from "express";
import { aboutControllers } from "./about.controller";
import { AboutValidation } from "./about.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-web-about",
  validateRequest(AboutValidation.createAboutValidationSchema),
  aboutControllers.createAboutController,
);

router.get("/", aboutControllers.getWebAboutController);

export const webAboutRouters = router;
