import express from "express";
import { CowController } from "./cow.controller";
const router = express.Router();

// Routes
router.get("/:id", CowController.getSingleCow);
router.get("/", CowController.getCows);
router.post("/", CowController.createCow);
router.patch("/:id", CowController.updateCow);
router.delete("/:id", CowController.deleteCow);

export const CowRoutes = router;
