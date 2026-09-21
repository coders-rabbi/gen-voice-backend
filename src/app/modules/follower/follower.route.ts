import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { followValidation } from "./follwer.validation";
import { followControllers } from "./follower.controller";
import { USER_ROLE } from "../users/user.constant";
import authValidation from "../../middleware/authValidation";
const router = express.Router();

router.post(
  "/",
  authValidation(USER_ROLE.REPORTER, USER_ROLE.VIEWER),
  validateRequest(followValidation),
  followControllers.followReporterController,
);

router.get(
  "/following/count",
  authValidation(USER_ROLE.REPORTER, USER_ROLE.VIEWER),
  followControllers.getFollowingCountController,
);

router.delete(
  "/:reporterId",
  authValidation(USER_ROLE.REPORTER, USER_ROLE.VIEWER),
  followControllers.unfollowReporterController,
);

router.get(
  "/followers/:reporterId",
  followControllers.getReporterFollowersController,
);

router.get("/count/:reporterId", followControllers.getFollowerCountController);

router.get(
  "/is-following/:reporterId",
  authValidation(USER_ROLE.REPORTER, USER_ROLE.VIEWER),
  followControllers.checkIsFollowingController,
);

export const followRoutes = router;
