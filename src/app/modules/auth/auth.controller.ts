import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";
import { ILoginResponse } from "../../../interface/common";


const signUp: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await AuthService.signUp(userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: result,
    });
  }
);

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    const { refreshToken, ...others } = result;

    // Set refresh token into cookie
    res.cookie("refreshToken", refreshToken, {
      secure: config.env === "production",
      httpOnly: true,
    });
    sendResponse<ILoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successfully",
      data: others,
    });
  }
);

export const AuthController = {
     signUp,
     login,
};
