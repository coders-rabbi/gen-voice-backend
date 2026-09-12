import express from "express";
import { NewsControllers } from "./news.controller";
import valiadateRequest from "../../middleware/validateRequest";
import { newsValidations } from "./news.validation";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../users/user.constant";
import validateRequest from "../../middleware/validateRequest";
import { ADMIN_ROLE } from "../admin/admin.constant";
const router = express.Router();

router.post(
  "/create_news",
  authValidation(USER_ROLE?.REPORTER),
  // valiadateRequest(newsValidations.createNewsValidationSchema),
  NewsControllers.createNewsController,
);
router.get("/", NewsControllers.getAllNewsController);
router.get("/video-news", NewsControllers.getAllVideNewsController);
router.get("/homecategory", NewsControllers.getHomePageNewsController);
router.get(
  "/:reporterNews",
  authValidation(USER_ROLE.REPORTER),
  NewsControllers.getSingleReporterNewsController,
);
router.get("/popular-news", NewsControllers.pupularNewsController);
router.get("/:id", NewsControllers.getSingleNewsController);
router.get("/:repId/news", NewsControllers.getNewsByReporterId);
router.get(
  "/:categoryId/category",
  NewsControllers.getNewsByCategoryIDController,
);
router.patch(
  "/:newsId",
  authValidation(
    USER_ROLE?.REPORTER,
    ADMIN_ROLE?.EDITOR,
    ADMIN_ROLE?.ADMIN,
    ADMIN_ROLE?.SUPER_ADMIN,
  ),
  valiadateRequest(newsValidations.updateNewsValidationSchema),
  NewsControllers.updateNewsController,
);
router.patch(
  "/status/:id",
  authValidation(ADMIN_ROLE.ADMIN, ADMIN_ROLE.EDITOR, ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(newsValidations.updateStatusValidationSchema),
  NewsControllers.updateNewsStatusController,
);

router.get(
  "/monthly-post-count/:reporterId",
  NewsControllers.getMonthlyPostCountController,
);

router.patch(
  "/increment-view/:newsId",
  NewsControllers.incrementNewsViewController,
);

export const NewsRouter = router;
