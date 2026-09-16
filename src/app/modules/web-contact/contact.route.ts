import express from "express";
import { contactControllers } from "./contact.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  siteContactValidation,
  updateSiteContactValidation,
} from "./contact.validation";

const router = express.Router();

router.post(
  "/create-web-contact",
  validateRequest(siteContactValidation),
  contactControllers.createContactCotroller,
);

router.get("/", contactControllers.getWebContactController);

router.patch(
  "/update-web-contact",
  validateRequest(updateSiteContactValidation),
  contactControllers.updateWebContactController,
);

export const webContacts = router;
