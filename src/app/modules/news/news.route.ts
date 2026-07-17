import express from "express";
import { NewsControllers } from "./news.controller";
const router = express.Router();

router.post("/create_news", NewsControllers.createNewsController);
router.get("/", NewsControllers.getAllNewsController)
router.get("/:id", NewsControllers.getSingleNewsController)

export const NewsRouter = router;