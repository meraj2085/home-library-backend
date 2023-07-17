import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReadingService } from "./reading.service";

const addReading: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await ReadingService.addReading(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Reading added successfully",
      data: result,
    });
  }
);

const getReading: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const email = req.params.email;
    const result = await ReadingService.getReading(email);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Reading retrieved successfully",
      data: result,
    });
  }
);

export const ReadingController = {
  addReading,
  getReading,
};
