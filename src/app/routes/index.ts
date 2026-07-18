import { Router } from "express";
import { ReporterRoutes } from "../modules/reporters/reporter.route";
import { UserRouters } from "../modules/users/user.route";
import { NewsRouter } from "../modules/news/news.route";

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
