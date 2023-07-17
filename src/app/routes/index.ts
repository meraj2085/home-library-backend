import express from "express";
import { BookRoutes } from "../modules/book/book.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { WishlistRoutes } from "../modules/wishlist/wishlist.routes";
import { ReadingRoutes } from "../modules/reading/reading.routes";
const router = express.Router();

// Routes
const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
  {
    path: "/reading",
    route: ReadingRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
