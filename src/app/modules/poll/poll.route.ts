import express from "express";
import { pollControllers } from "./poll.controller";

const router = express.Router();

router.post("/create-poll", pollControllers.createPollController);

export const pollRouters = router;
