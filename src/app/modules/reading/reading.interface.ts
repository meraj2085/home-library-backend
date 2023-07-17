import { Model } from "mongoose";

export type IReading = {
  title: string;
  author: string;
  user_email: string;
  completed: boolean;
};

export type ReadingModel = Model<IReading, Record<string, unknown>>;
