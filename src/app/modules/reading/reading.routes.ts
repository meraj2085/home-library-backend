import express from "express";
import { ReadingController } from "./reading.controller";
const router = express.Router();

// Routes
router.get("/:email", ReadingController.getReading);
router.post("/", ReadingController.addReading);

export const ReadingRoutes = router;
