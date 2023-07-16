import { Model, Types } from "mongoose";

type UserName = {
  first_name: string;
  last_name: string;
};

export type IUser = {
  name: UserName;
  email: string;
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
