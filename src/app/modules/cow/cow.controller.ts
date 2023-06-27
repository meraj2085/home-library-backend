import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import { CowService } from "./cow.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { cowFilterableFields } from "./cow.const";
import { paginationFields } from "../../../shared/pagination";

const getCows: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, cowFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await CowService.getCows(filters, paginationOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cows fetched successfully",
      data: result,
    });
  }
);

const getSingleCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CowService.getSingleCow(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow fetched successfully",
      data: result,
    });
  }
);

const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await CowService.createCow(userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow created successfully",
      data: result,
    });
  }
);

const updateCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    const result = await CowService.updateCow(id, userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow updated successfully",
      data: result,
    });
  }
);

const deleteCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CowService.deleteCow(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow deleted successfully",
      data: result,
    });
  }
);

export const CowController = {
  getCows,
  getSingleCow,
  createCow,
  updateCow,
  deleteCow,
};
