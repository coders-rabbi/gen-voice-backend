import express from "express";
import { NewsControllers } from "./news.controller";
import valiadateRequest from "../../middleware/validateRequest";
import { newsValidations } from "./news.validation";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../users/user.constant";
import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/create_news",
  authValidation(USER_ROLE?.REPORTER),
  // valiadateRequest(newsValidations.createNewsValidationSchema),
  NewsControllers.createNewsController,
);
router.get("/", NewsControllers.getAllNewsController);
router.get("/video-news", NewsControllers.getAllVideNewsController);
router.get("/video-news", NewsControllers.getAllVideNewsController);
router.get("/homecategory", NewsControllers.getHomePageNewsController);
router.get(
  "/reporterNews",
  authValidation(USER_ROLE.REPORTER),
  NewsControllers.getSingleReporterNewsController,
);
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

router.patch(
  "/status/:id",
  authValidation(USER_ROLE.ADMIN, USER_ROLE.EDITOR, USER_ROLE.SUPER_ADMIN),
  validateRequest(newsValidations.updateStatusValidationSchema),
  NewsControllers.updateNewsStatusController,
);

export const NewsRouter = router;
