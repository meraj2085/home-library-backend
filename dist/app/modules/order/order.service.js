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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find()
        .populate("buyer", "-password")
        .populate("cow");
    return orders;
});
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.Cow.findById(orderData.cow);
    const buyer = yield user_model_1.User.findById(orderData.buyer);
    const seller = yield user_model_1.User.findById(cow === null || cow === void 0 ? void 0 : cow.seller);
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found");
    }
    else if (!buyer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Buyer not found");
    }
    else if (!seller) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Seller not found");
    }
    else if (cow.label !== "for sale") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cow not available");
    }
    else if (cow.price > buyer.budget) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Not enough money");
    }
    let order;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield cow_model_1.Cow.findByIdAndUpdate(orderData.cow, { label: "sold out" }, { session });
        yield user_model_1.User.findByIdAndUpdate(orderData.buyer, { budget: buyer.budget - cow.price }, { session });
        yield user_model_1.User.findByIdAndUpdate(cow.seller, { income: seller.income + cow.price }, { session });
        order = yield order_model_1.Order.create(orderData);
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return order;
});
exports.OrderService = {
    getOrders,
    createOrder,
};
