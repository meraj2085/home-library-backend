import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

// Routes
router.post("/create-admin", AdminController.createAdmin);
router.post("/login", AdminController.login);

export const AdminRoutes = router;
