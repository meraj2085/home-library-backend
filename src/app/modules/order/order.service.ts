import httpStatus from "http-status";
import mongoose from "mongoose";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import ApiError from "../../../errors/ApiError";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import { ICow } from "../cow/cow.interface";

const getOrders = async (): Promise<IOrder[] | null> => {
  const orders = await Order.find()
    .populate("buyer", "-password")
    .populate("cow");
  return orders;
};

const createOrder = async (orderData: IOrder): Promise<IOrder | null> => {
  const cow: ICow | null = await Cow.findById(orderData.cow);
  const buyer: IUser | null = await User.findById(orderData.buyer);
  const seller: IUser | null = await User.findById(cow?.seller);
  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found");
  } else if (!buyer) {
    throw new ApiError(httpStatus.NOT_FOUND, "Buyer not found");
  } else if (!seller) {
    throw new ApiError(httpStatus.NOT_FOUND, "Seller not found");
  } else if (cow.label !== "for sale") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cow not available");
  } else if (cow.price > buyer.budget) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Not enough money");
  }
  let order: IOrder | null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Cow.findByIdAndUpdate(
      orderData.cow,
      { label: "sold out" },
      { session }
    );
    await User.findByIdAndUpdate(
      orderData.buyer,
      { budget: buyer.budget - cow.price },
      { session }
    );
    await User.findByIdAndUpdate(
      cow.seller,
      { income: seller.income + cow.price },
      { session }
    );
    order = await Order.create(orderData);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return order;
};

export const OrderService = {
  getOrders,
  createOrder,
};
