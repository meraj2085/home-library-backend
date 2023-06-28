import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../utils/jwtHelper";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { isPasswordMatch } from "../../../utils/isPasswordMatch";
import { isUserExist } from "../../../utils/isUserExists";
import { ILoginResponse } from "../../../interface/common";


const signUp = async (userData: IUser): Promise<IUser | null> => {
  const newUSer = await User.create(userData);
  return newUSer;
};

const login = async (payload: IUser): Promise<ILoginResponse> => {
  const { phoneNumber, password } = payload;
  const user = await isUserExist(phoneNumber, User);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if password is correct
  const passwordMatch = await isPasswordMatch(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const { _id: userId, role } = user;
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

export const AuthService = {
     signUp,
     login
};
