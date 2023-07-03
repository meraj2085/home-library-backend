import express from "express";
import { UserController } from "./user.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
const router = express.Router();

// Routes
router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getUsers);
router.patch("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
