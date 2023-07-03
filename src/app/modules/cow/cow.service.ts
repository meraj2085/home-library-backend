import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelper } from "../../../shared/paginationHelper";
import { cowSearchableFields } from "./cow.const";
import { ICow, ICowFilters } from "./cow.interface";
import { SortOrder } from "mongoose";
import { Types } from 'mongoose';
import { Cow } from "./cow.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const getCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, minPrice, maxPrice, sortOrder } =
  paginationHelper.calculatePagination(paginationOptions);
  
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => {
        const filter: any = {};
        if (["age", "price", "weight"].includes(field)) {
          const numericValue = parseFloat(searchTerm);
          if (!isNaN(numericValue)) {
            filter[field] = numericValue;
          }
        } else {
          filter[field] = {
            $regex: searchTerm,
            $options: "i",
          };
        }
        return filter;
      }),
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceCondition: { [key: string]: number } = {};

    if (minPrice !== undefined) {
      priceCondition.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      priceCondition.$lte = maxPrice;
    }

    andConditions.push({
      price: priceCondition,
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createCow = async (cowData: ICow): Promise<ICow | null> => {
  const newCow = await Cow.create(cowData);
  return newCow;
};

const getSingleCow = async (id: string, userId: string): Promise<ICow> => {
  const cow = await Cow.findById(id);
  if (!cow || !cow.seller.equals(new Types.ObjectId(userId))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized to get this cow');
  }
  return cow;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string, userId: string): Promise<ICow | null> => {
  const cow = await Cow.findById(id);
  if (!cow || !cow.seller.equals(new Types.ObjectId(userId))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized to delete this cow');
  }
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  getCows,
  createCow,
  getSingleCow,
  updateCow,
  deleteCow,
};
