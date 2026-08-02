import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/create_reporter", UserController.createReporterController);
router.post("/create_editor", UserController.createEditorController);
// router.post("/create_admin", UserController.createUserController);
// router.post("/create_super_admin", UserController.createUserController);
// router.post("/create_user", UserController.createUserController);
router.get("/", UserController.getAllUserController);
router.get("/:id", UserController.getSingleUserController);
router.put("/recover_password/:id", UserController.updatePasswordController);
router.delete("/delete_user/:id", UserController.deleteUserController);

export const UserRouters = router;
