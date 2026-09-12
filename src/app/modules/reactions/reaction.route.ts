import express from "express";
import { ReactionControllers } from "./reaction.controller";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../users/user.constant";
import validateRequest from "../../middleware/validateRequest";
import { ReactionValidations } from "./reaction.validation";

const router = express.Router();

router.post(
  "/:newsId",
  authValidation(USER_ROLE.REPORTER, USER_ROLE.VIEWER),
  validateRequest(ReactionValidations.toggleReactionValidationSchema),
  ReactionControllers.toggleReaction,
);

router.get("/counts/:newsId", ReactionControllers.getReactionCounts);

router.get(
  "/my-reaction/:newsId",
  authValidation(USER_ROLE.REPORTER, USER_ROLE.VIEWER),
  ReactionControllers.getMyReaction,
);

export const ReactionRoutes = router;
