import { paginationHelper } from "../../../shared/paginationHelper";
import { SortOrder } from "mongoose";
import { Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Book } from "./book.model";
import { IBook } from "./book.interface";

const createBook = async (bookData: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(bookData);
  return newBook;
};

export const BookService = {
  createBook,
};
