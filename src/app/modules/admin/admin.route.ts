import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

// Routes
router.post("/create-admin", AdminController.createAdmin);

export const AdminRoutes = router;
