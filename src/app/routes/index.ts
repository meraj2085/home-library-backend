import express from "express";
const router = express.Router();
import { UserRoutes } from "../modules/user/user.route";
import { CowRoutes } from "../modules/cow/cow.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { AuthRoutes } from "../modules/auth/auth.route";

// Routes
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
