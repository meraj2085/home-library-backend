import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { isUserExist } from "../../../utils/isUserExists";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { isPasswordMatch } from "../../../utils/isPasswordMatch";

const createAdmin = async (
  payload: IAdmin
): Promise<Partial<IAdmin> | null> => {
  const admin = await Admin.create(payload);
  const { password, ...rest } = admin.toJSON();
  return rest;
};

const login = async (payload: IAdmin) => {
  const { phoneNumber, password } = payload;

  const admin = await isUserExist(phoneNumber, Admin);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  // Check if password is correct
  const passwordMatch = await isPasswordMatch(password, admin.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }
  return admin;
};

export const AdminService = {
  createAdmin,
  login,
};
