import express from "express";
import { commentController } from "./comment.controller";
import validateRequest from "../../middleware/validateRequest";
import { CommentValidations } from "./comment.validation";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../users/user.constant";
const router = express.Router();

router.post(
  "/create-comment",
  validateRequest(CommentValidations.createCommentValidationSchema),
  authValidation(USER_ROLE.REPORTER, USER_ROLE.VIEWER),
  commentController.createCommentController,
);
router.get("/", commentController.getCommentController);
router.get("/:newsId", commentController.getCommentByUsingNewsId);

export const CommentRouter = router;
