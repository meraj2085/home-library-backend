import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.const";
import { paginationFields } from "../../../shared/pagination";

const getBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await BookService.getBooks(filters, paginationOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books fetched successfully",
      data: result,
    });
  }
);

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookData = req.body;
    const result = await BookService.createBook(bookData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book added successfully",
      data: result,
    });
  }
);

export const BookController = {
  getBooks,
  createBook,
};
