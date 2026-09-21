import express from "express";
import { pollResponseControllers } from "./poll-response.controller";
import optionalAuth from "../../middleware/optionalAuth";

const router = express.Router();

router.post(
  "/:id/responses", optionalAuth(),
  pollResponseControllers.submitPollResponseController,
);
router.get(
  "/:id/analytics",
  pollResponseControllers.getPollAnalyticsController,
);

export const pollResponseRouters = router;
