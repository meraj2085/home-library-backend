import { paginationHelper } from "../../../shared/paginationHelper";
import { SortOrder } from "mongoose";
import { Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Book } from "./book.model";
import { IBook, IBookFilters } from "./book.interface";
import { bookSearchableFields } from "./book.const";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";

const getBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andConditions.length ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


const createBook = async (bookData: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(bookData);
  return newBook;
};

export const BookService = {
  getBooks,
  createBook,
};
