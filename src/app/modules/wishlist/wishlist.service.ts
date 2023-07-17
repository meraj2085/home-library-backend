import { paginationHelper } from "../../../shared/paginationHelper";
import { SortOrder } from "mongoose";
import { Types } from "mongoose";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Wishlist } from "./wishlist.model";
import { IWishlist } from "./wishlist.interface";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";

const addWishlist = async (data: IWishlist): Promise<IWishlist | null> => {
  const wishlist = await Wishlist.create(data);
  return wishlist;
};

const getWishlist = async (email: string) => {
  const wishlist = await Wishlist.find({ user_email: email });
  return wishlist;
};

export const WishlistService = {
  addWishlist,
  getWishlist,
};
