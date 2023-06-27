import { Model, Types } from "mongoose";

type UserName = {
  firstName: string;
  lastName: string;
};

export enum UserRoles {
  SELLER = "seller",
  BUYER = "buyer",
}

export type IUser = {
  phoneNumber: string;
  role: UserRoles;
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
