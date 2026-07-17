import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ReporterRoutes } from "./app/modules/reporters/reporter.route";
import { UserRouters } from "./app/modules/users/user.route";
import { NewsRouter } from "./app/modules/news/news.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notfound";
import router from "./app/routes";

export const app: Application = express();
export const port = 3000;

//parser
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Gen Voice Server is running...");
});

//moddleWare
app.use(globalErrorHandler);
app.use(notFound);
