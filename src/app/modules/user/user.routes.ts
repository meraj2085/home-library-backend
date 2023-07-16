import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

// Routes
router.get("/:id", UserController.getSingleUser);
router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);

export const UserRoutes = router;
