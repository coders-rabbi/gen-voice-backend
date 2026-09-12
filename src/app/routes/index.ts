import { Router } from "express";
import { ReporterRoutes } from "../modules/reporters/reporter.route";
import { UserRouters } from "../modules/users/user.route";
import { NewsRouter } from "../modules/news/news.route";
import { CategoriesRouter } from "../modules/category/category.route";
import { authRoutes } from "../modules/auth/auth.route";
import { uploadhRoutes } from "../modules/upload/upload.route";
import { RoleRoutes } from "../modules/role/role.route";
import { adminRouters } from "../modules/admin/admin.route";
import { CommentRouter } from "../modules/comment/comment.route";
import { ReactionRoutes } from "../modules/reactions/reaction.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRouters,
  },
  {
    path: "/admin",
    route: adminRouters,
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
  {
    path: "/upload",
    route: uploadhRoutes,
  },
  {
    path: "/roles",
    route: RoleRoutes,
  },
  {
    path: "/comments",
    route: CommentRouter,
  },
  {
    path: "/reactions",
    route: ReactionRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
