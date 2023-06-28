import { Schema, model } from "mongoose";
import { AdminModel, AdminRole, IAdmin } from "./admin.interface";

const adminSchema = new Schema<IAdmin>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: Object.values(AdminRole) },
    password: { type: String, required: true, select: false },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
