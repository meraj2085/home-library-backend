import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { WishlistService } from "./wishlist.service";

const addWishlist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await WishlistService.addWishlist(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment added successfully",
      data: result,
    });
  }
);

const getWishlist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const email = req.params.email;
    const result = await WishlistService.getWishlist(email);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Wishlist retrieved successfully",
      data: result,
    });
  }
);

export const WishlistController = {
  addWishlist,
  getWishlist,
};
