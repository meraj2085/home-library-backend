import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { isUserExist } from "../../../utils/isUserExists";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { isPasswordMatch } from "../../../utils/isPasswordMatch";
import config from "../../../config";
import { jwtHelpers } from "../../../utils/jwtHelper";
import { Secret } from "jsonwebtoken";
import { ILoginResponse } from "../../../interface/common";

const createAdmin = async (
  payload: IAdmin
): Promise<Partial<IAdmin> | null> => {
  const admin = await Admin.create(payload);
  const { password, ...rest } = admin.toJSON();
  return rest;
};

const login = async (payload: IAdmin): Promise<ILoginResponse> => {
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

  //create access token & refresh token
  const { _id: userId, role } = admin;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  login,
};
