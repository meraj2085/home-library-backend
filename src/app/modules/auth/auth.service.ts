import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../utils/jwtHelper";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { isPasswordMatch } from "../../../utils/isPasswordMatch";
import { isUserExist } from "../../../utils/isUserExists";
import {
  ILoginResponse,
  IRefreshTokenResponse,
} from "../../../interface/common";
import { Admin } from "../admin/admin.model";

const signUp = async (userData: IUser): Promise<IUser | null> => {
  const newUSer = await User.create(userData);
  return newUSer;
};

const login = async (payload: IUser): Promise<ILoginResponse> => {
  const { phoneNumber, password } = payload;
  const matchUser = await isUserExist(phoneNumber, User);
  const matchAdmin = await isUserExist(phoneNumber, Admin);
  if (!matchUser && !matchAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  let user;
  if (matchUser) {
    user = matchUser;
  } else if (matchAdmin) {
    user = matchAdmin;
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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  let isUserExists = await User.findById(
    { _id: userId },
    { _id: 1, role: 1 }
  ).lean();
  
  if (!isUserExists) {
    // Check if the user exists in the User collection
    isUserExists = await Admin.findById(
      { _id: userId },
      { _id: 1, role: 1 }
    ).lean();
  }

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Generate a new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExists._id,
      role: isUserExists.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};


export const AuthService = {
  signUp,
  login,
  refreshToken,
};
