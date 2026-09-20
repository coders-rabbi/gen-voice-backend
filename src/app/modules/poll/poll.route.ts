import express from "express";
import { pollControllers } from "./poll.controller";

const router = express.Router();

router.post("/create-poll", pollControllers.createPollController);
router.get("/", pollControllers.getAllPollController);
router.get("/:id", pollControllers.getSinglePollController);
router.patch("/:id", pollControllers.updateSinglePollController);

export const pollRouters = router;
    