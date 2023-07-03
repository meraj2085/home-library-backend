import express from "express";
import { CowController } from "./cow.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

// Routes
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getSingleCow
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getCows
);
router.post("/", auth(ENUM_USER_ROLE.SELLER), CowController.createCow);
router.patch("/:id", auth(ENUM_USER_ROLE.SELLER), CowController.updateCow);
router.delete("/:id", auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export const CowRoutes = router;
