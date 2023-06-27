import { Model, Types } from "mongoose";

export type IOrder = {
  buyer: Types.ObjectId;
  cow: Types.ObjectId;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
