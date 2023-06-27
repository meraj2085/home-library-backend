import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

// Routes
router.get("/:id", UserController.getSingleUser);
router.get("/", UserController.getUsers);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
