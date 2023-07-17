import { Model } from "mongoose";

export type IWishlist = {
  title: string;
  author: string;
  user_email: string;
};

export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
