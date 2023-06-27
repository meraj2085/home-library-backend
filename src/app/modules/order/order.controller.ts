import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import { OrderService } from "./order.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const orderDetails = req.body;
    const result = await OrderService.createOrder(orderDetails);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  }
);

const getOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getOrders();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
  getOrders,
};
