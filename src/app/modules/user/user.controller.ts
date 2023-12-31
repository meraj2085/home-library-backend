import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import config from "../../../config";
import { ILoginResponse } from "../../../interface/common";

const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getSingleUser(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  }
);

const signUp: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const { accessToken, email } = await UserService.signUp(userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: { accessToken, email },
    });
  }
);

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.login(req.body);
    const { refreshToken, email, ...others } = result;

    // Set refresh token into cookie
    res.cookie("refreshToken", refreshToken, {
      secure: config.env === "production",
      httpOnly: true,
    });
    const response = { ...others, email };
    sendResponse<ILoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successfully",
      data: response,
    });
  }
);

export const UserController = {
  getSingleUser,
  signUp,
  login,
};
