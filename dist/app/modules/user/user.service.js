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
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelper_1 = require("../../../utils/jwtHelper");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const isPasswordMatch_1 = require("../../../utils/isPasswordMatch");
const isUserExists_1 = require("../../../utils/isUserExists");
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.findById(id);
    return users;
});
const signUp = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUSer = yield user_model_1.User.create(userData);
    const { _id: userId } = newUSer;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ userId }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken, email: newUSer.email };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield (0, isUserExists_1.isUserExist)(email, user_model_1.User);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Check if password is correct
    const passwordMatch = yield (0, isPasswordMatch_1.isPasswordMatch)(password, user.password);
    if (!passwordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    //create access token & refresh token
    const { _id: userId } = user;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ userId }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ userId }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        email,
    };
});
exports.UserService = {
    getSingleUser,
    signUp,
    login,
};
