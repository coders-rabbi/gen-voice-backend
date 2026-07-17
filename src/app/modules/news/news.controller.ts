import { Request, Response } from "express";
import { NewsServices } from "./news.services";

const createNewsController = async (req: Request, res: Response) => {
  try {
    const newsData = req.body;
    const result = await NewsServices.createNewsIntoDB(newsData);
    res.status(200).json({
      success: true,
      message: "News Create Successfully created!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something Went Wrong",
      error: err,
    });
  }
};

const getAllNewsController = async (req: Request, res: Response) => {
  try {
    const result = await NewsServices.getAllNewsFromDB();
    res.status(200).json({
      success: true,
      message: "All news are succefully retrived",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const getSingleNewsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await NewsServices.getSingleNewsFromDB(id as string);
    res.status(200).json({
      success: true,
      message: "Succesfully retrive a news from the database",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const NewsControllers = {
  createNewsController,
  getAllNewsController,
  getSingleNewsController,
};
