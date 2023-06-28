import { Model, Types } from "mongoose";

type AdminName = {
  firstName: string;
  lastName: string;
};

export enum AdminRole {
  ADMIN = "admin",
}

export type IAdmin = {
  phoneNumber: string;
  role: AdminRole;
  password: string;
  name: AdminName;
  address: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;