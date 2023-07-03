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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const isUserExists_1 = require("../../../utils/isUserExists");
const admin_model_1 = require("./admin.model");
const isPasswordMatch_1 = require("../../../utils/isPasswordMatch");
const config_1 = __importDefault(require("../../../config"));
const jwtHelper_1 = require("../../../utils/jwtHelper");
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.create(payload);
    const _a = admin.toJSON(), { password } = _a, rest = __rest(_a, ["password"]);
    return rest;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const admin = yield (0, isUserExists_1.isUserExist)(phoneNumber, admin_model_1.Admin);
    if (!admin) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin not found");
    }
    // Check if password is correct
    const passwordMatch = yield (0, isPasswordMatch_1.isPasswordMatch)(password, admin.password);
    if (!passwordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    //create access token & refresh token
    const { _id: userId, role } = admin;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AdminService = {
    createAdmin,
    login,
};
