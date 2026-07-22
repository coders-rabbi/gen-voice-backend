import { Router } from "express";
import { ReporterRoutes } from "../modules/reporters/reporter.route";
import { UserRouters } from "../modules/users/user.route";
import { NewsRouter } from "../modules/news/news.route";
import { CategoriesRouter } from "../modules/category/category.route";
import { authRoutes } from "../modules/auth/auth.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRouters,
  },
  {
    path: "/reporters",
    route: ReporterRoutes,
  },
  {
    path: "/news",
    route: NewsRouter,
  },
  {
    path: "/categories",
    route: CategoriesRouter,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
