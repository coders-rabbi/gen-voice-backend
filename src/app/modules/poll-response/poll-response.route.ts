import express from "express";
import { pollResponseControllers } from "./poll-response.controller";

const router = express.Router();

router.post(
  "/:id/responses",
  pollResponseControllers.submitPollResponseController,
);
router.get(
  "/:id/analytics",
  pollResponseControllers.getPollAnalyticsController,
);

export const pollResponseRouters = router;
