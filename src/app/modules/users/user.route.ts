import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/create_user", UserController.createUserController);
router.get("/", UserController.getAllUserController);
router.get("/:id", UserController.getSingleUserController);
router.put("/recover_password/:id", UserController.updatePasswordController);
router.delete("/delete_user/:id", UserController.deleteUserController);

export const UserRouters = router;
