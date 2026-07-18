import express from "express";
import { ReporterController } from "./reporter.controller";

const router = express.Router();

router.post("/create_reporter", ReporterController.createReporterController);
router.get("/", ReporterController.getAllReporterController);
router.get(
  "/:reporterId",
  ReporterController.getSingleReporterUsingReportIdController,
);
router.patch("/:reporterId", ReporterController.updateSingleReporterController);

export const ReporterRoutes = router;
