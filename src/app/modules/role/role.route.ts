import express from "express";
import { RoleValidations } from "./role.validation";
import { RoleControllers } from "./role.controller";
import validateRequest from "../../middleware/validateRequest";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "../users/user.constant";
import { ADMIN_ROLE } from "../admin/admin.constant";

const router = express.Router();

router.post(
  "/create-role",
  authValidation(ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(RoleValidations.CreateRoleValidationSchema),
  RoleControllers.createRole,
);

router.get(
  "/",
  authValidation(ADMIN_ROLE.SUPER_ADMIN),
  RoleControllers.getAllRole,
);

router.get(
  "/:id",
  authValidation(ADMIN_ROLE.SUPER_ADMIN),
  RoleControllers.getSingleRole,
);

router.get("/name/:roleName", RoleControllers.getSingleRoleByName);

router.patch(
  "/:id/update",
  authValidation(ADMIN_ROLE.SUPER_ADMIN),
  validateRequest(RoleValidations.UpdateRoleValidationSchema),
  RoleControllers.updateRole,
);

router.patch(
  "/:id/delete",
  authValidation(ADMIN_ROLE.SUPER_ADMIN),
  RoleControllers.deleteRole,
);

export const RoleRoutes = router;
