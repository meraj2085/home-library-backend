import express from "express";
import { WishlistController } from "./wishlist.controller";
const router = express.Router();

// Routes
router.get("/", WishlistController.getWishlist);
router.post("/", WishlistController.addWishlist);

export const WishlistRoutes = router;
