"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Routes
router.get("/my-profile", (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), user_controller_1.UserController.getMyProfile);
router.patch("/my-profile", (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), user_controller_1.UserController.updateMyProfile);
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getSingleUser);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getUsers);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.updateUser);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
