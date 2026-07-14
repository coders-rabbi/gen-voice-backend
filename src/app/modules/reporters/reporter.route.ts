import express from "express";
import { ReporterController } from "./reporter.controller";

const router = express.Router();

router.post("/create_reporter", ReporterController.createReporterController);

export const ReporterRoutes = router;
