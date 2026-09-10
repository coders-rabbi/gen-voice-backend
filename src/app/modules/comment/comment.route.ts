import express from "express";
import { commentController } from "./comment.controller";
import validateRequest from "../../middleware/validateRequest";
import { CommentValidations } from "./comment.validation";
const router = express.Router();

router.post(
  "/create-comment",
  validateRequest(CommentValidations.createCommentValidationSchema),
  commentController.createCommentController,
);
router.get("/", commentController.getCommentController);
router.get("/:newsId", commentController.getCommentByUsingNewsId);

export const CommentRouter = router;
