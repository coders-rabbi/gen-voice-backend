import express from "express";
import { SavedNewsController } from "./saveNews.controller";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../users/user.constant";

const router = express.Router();

router.post(
  "/toggle",
  authValidation(),
  SavedNewsController.toggleSaveNewsController,
);
router.get(
  "/my-saved",
  authValidation(),
  SavedNewsController.getUserSavedNewsController,
);
router.get(
  "/check/:newsId",
  authValidation(),
  SavedNewsController.checkSavedController,
);

export const SavedNewsRoutes = router;
