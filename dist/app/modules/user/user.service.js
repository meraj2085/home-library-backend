"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../../config"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    return users;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.findById(id);
    return users;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUSer = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return newUSer;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const getMyProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id).select({
        name: 1,
        phoneNumber: 1,
        address: 1,
    });
    return user;
});
const updateMyProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
        payload.password = hashedPassword;
    }
    const newUSer = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).select({
        name: 1,
        phoneNumber: 1,
        address: 1,
    });
    return newUSer;
});
exports.UserService = {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
};
