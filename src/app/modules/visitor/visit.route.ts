import express from "express";
import { visitControllers } from "./visit.controller";

const router = express.Router();

router.post("/track", visitControllers.trackVisitController);
router.get("/stats", visitControllers.getTrafficStatsController);

export const visitRouters = router;
