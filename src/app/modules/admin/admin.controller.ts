import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AdminService } from "./admin.service";
import config from "../../../config";
import { ILoginResponse } from "../../../interface/common";

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.createAdmin(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  }
);

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.login(req.body);
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

export const AdminController = {
  createAdmin,
  login,
};
