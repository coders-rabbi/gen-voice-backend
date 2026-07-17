import express from "express";
import { NewsControllers } from "./news.controller";
import valiadateRequest from "../../middleware/validateRequest";
import { createNewsValidationSchema } from "./news.validation";
const router = express.Router();

router.post("/create_news", valiadateRequest(createNewsValidationSchema),NewsControllers.createNewsController);
router.get("/", NewsControllers.getAllNewsController)
router.get("/:id", NewsControllers.getSingleNewsController)

export const NewsRouter = router;