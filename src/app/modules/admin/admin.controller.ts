import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AdminService } from "./admin.service";

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
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successfully",
      data: result,
    });
  }
);

export const AdminController = {
  createAdmin,
  login,
};
