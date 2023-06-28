import { Schema, model } from "mongoose";
import { AdminModel, AdminRole, IAdmin } from "./admin.interface";
import config from "../../../config";
import bcrypt from 'bcrypt';

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

adminSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
