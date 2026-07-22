import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";
import { timeStamp } from "console";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";

const CategorySchema = new Schema<TCategory>(
  {
    categoryName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

CategorySchema.pre("save", async function (next) {
  const category = this;
  const existingCategory = await Category.findOne({
    categoryName: category.categoryName,
  });

  if (existingCategory) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Category with this name already exists!",
    );
  }
});

export const Category = model<TCategory>("Categoris", CategorySchema);
