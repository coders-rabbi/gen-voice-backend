import express from "express";
import { UserController } from "./user.controller";
import authValidation from "../../middleware/authValidation";
import { USER_ROLE } from "./user.constant";
const router = express.Router();

router.post("/create_reporter", UserController.createReporterController);
router.post(
  "/create_user-by-superadmin",
  UserController.createUserBySuperAdminController,
);
// router.post("/create_admin", UserController.createUserController);
// router.post("/create_super_admin", UserController.createUserController);
// router.post("/create_user", UserController.createUserController);
router.get("/", UserController.getAllUserController);
router.get("/:id", UserController.getSingleUserController);
router.put("/recover_password/:id", UserController.updatePasswordController);
router.delete("/delete_user/:id", UserController.deleteUserController);
router.patch(
  "/:id/status",
  authValidation(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  UserController.updateUserStatusController,
);

export const UserRouters = router;
