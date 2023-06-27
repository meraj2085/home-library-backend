"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// Routes
router.get("/:id", user_controller_1.UserController.getSingleUser);
router.get("/", user_controller_1.UserController.getUsers);
router.patch("/:id", user_controller_1.UserController.updateUser);
router.delete("/:id", user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
