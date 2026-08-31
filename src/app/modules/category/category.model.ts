import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";
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
    // image: {
    //   type: String,
    //   required: true,
    // },
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
  },
  {
    timestamps: true,
  },
);

CategorySchema.pre("save", async function () {
  if (!this.isNew) return; // শুধু নতুন document এর জন্য check করবে

  const existingCategory = await Category.findOne({
    categoryName: this.categoryName,
  });
  if (existingCategory) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Category with this name already exists!",
    );
  }
});

CategorySchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});

export const Category = model<TCategory>("Category", CategorySchema);
