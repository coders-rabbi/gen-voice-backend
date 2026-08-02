import express from "express";
import { NewsControllers } from "./news.controller";
import valiadateRequest from "../../middleware/validateRequest";
import { newsValidations } from "./news.validation";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../users/user.constant";
const router = express.Router();

router.post(
  "/create_news",
  authValidation(USER_ROLE?.REPORTER),
  valiadateRequest(newsValidations.createNewsValidationSchema),
  NewsControllers.createNewsController,
);
router.get("/", NewsControllers.getAllNewsController);
router.get("/:id", NewsControllers.getSingleNewsController);
router.patch(
  "/:newsId",
  authValidation(
    USER_ROLE?.REPORTER,
    USER_ROLE?.EDITOR,
    USER_ROLE?.ADMIN,
    USER_ROLE?.SUPER_ADMIN,
  ),
  valiadateRequest(newsValidations.updateNewsValidationSchema),
  NewsControllers.updateNewsController,
);

export const NewsRouter = router;
