import express from "express";
import { ReporterController } from "./reporter.controller";
import validateRequest from "../../middleware/validateRequest";
import { reporterValidations } from "./reporter.ZodValidation";

const router = express.Router();

router.post(
  "/create_reporter",
  validateRequest(reporterValidations.ReporterValidationSchema),
  ReporterController.createReporterController,
);
router.get("/", ReporterController.getAllReporterController);
router.get(
  "/:reporterId",
  ReporterController.getSingleReporterUsingReportIdController,
);
router.patch(
  "/:reporterId",
  validateRequest(reporterValidations.updateReporterValidationSchema),
  ReporterController.updateSingleReporterController,
);

export const ReporterRoutes = router;
