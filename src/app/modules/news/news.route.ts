import express from "express";
import { NewsControllers } from "./news.controller";
import valiadateRequest from "../../middleware/validateRequest";
import { newsValidations } from "./news.validation";
const router = express.Router();

router.post(
  "/create_news",
  valiadateRequest(newsValidations.createNewsValidationSchema),
  NewsControllers.createNewsController,
);
router.get("/", NewsControllers.getAllNewsController);
router.get("/:id", NewsControllers.getSingleNewsController);
router.patch(
  "/:newsId",
  valiadateRequest(newsValidations.updateNewsValidationSchema),
  NewsControllers.updateNewsController,
);

export const NewsRouter = router;
