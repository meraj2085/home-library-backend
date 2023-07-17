import express from "express";
import { BookRoutes } from "../modules/book/book.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { WishlistRoutes } from "../modules/wishlist/wishlist.routes";
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
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
