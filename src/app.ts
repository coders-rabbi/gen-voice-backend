import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ReporterRoutes } from "./app/modules/reporters/reporter.route";

export const app: Application = express();
export const port = 3000;

//parser
app.use(express.json());
app.use(cors());

app.use("api/v1/reporters", ReporterRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Gen Voice Server is running...");
});
