import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ReporterRoutes } from "./app/modules/reporters/reporter.route";
import { UserRouters } from "./app/modules/users/user.route";
import { NewsRouter } from "./app/modules/news/news.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

export const app: Application = express();
export const port = 3000;

//parser
app.use(express.json());
app.use(cors());

app.use("/api/v1/reporters", ReporterRoutes);
app.use("/api/v1/users", UserRouters);
app.use("/api/v1/news", NewsRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Gen Voice Server is running...");
});

app.use(globalErrorHandler);
