import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../utils/jwtHelper";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { isPasswordMatch } from "../../../utils/isPasswordMatch";
import { isUserExist } from "../../../utils/isUserExists";
import { ILoginResponse } from "../../../interface/common";

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const users = await User.findById(id);
  return users;
};

const signUp = async (userData: IUser): Promise<ILoginResponse> => {
  const newUSer = await User.create(userData);
  const { _id: userId } = newUSer;
  const accessToken = jwtHelpers.createToken(
    { userId },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken };
};

const login = async (payload: IUser): Promise<ILoginResponse> => {
  const { email, password } = payload;
  const user = await isUserExist(email, User);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if password is correct
  const passwordMatch = await isPasswordMatch(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const { _id: userId } = user;
  const accessToken = jwtHelpers.createToken(
    { userId },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserService = {
  getSingleUser,
  signUp,
  login,
};
