import { Schema, model } from "mongoose";
import { IWishlist, WishlistModel } from "./wishlist.interface";

const wishlistSchema = new Schema<IWishlist>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    user_email: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Wishlist = model<IWishlist, WishlistModel>("Wishlist", wishlistSchema);
