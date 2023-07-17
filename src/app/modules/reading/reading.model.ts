import { Schema, model } from "mongoose";
import { IReading, ReadingModel } from "./reading.interface";

const readingListSchema = new Schema<IReading>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    user_email: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Reading = model<IReading, ReadingModel>("Reading", readingListSchema);
