import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { number } from "zod";

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
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    newsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

CategorySchema.pre("save", async function () {
  if (!this.isNew) return;

  const existingCategory = await Category.findOne({
    categoryName: this.categoryName,
    isDeleted: false,
  });
  if (existingCategory) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Category with this name already exists!",
    );
  }
});

CategorySchema.pre(["find", "findOne"], function () {
  this.find({ isDeleted: { $ne: true } });
});

export const Category = model<TCategory>("Category", CategorySchema);
