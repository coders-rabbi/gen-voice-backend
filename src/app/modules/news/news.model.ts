import { Schema, model, models } from "mongoose";
import { TNews } from "./news.interface"; // তোমার ইন্টারফেস ফাইলটির সঠিক পাথ দিও

const newsSchema = new Schema<TNews>(
  {
    newsId: {
      type: String,
      required: [true, "News ID is required"],
      unique: true,
      trim: true,
    },
    reporterId: {
      type: Schema.Types.ObjectId,
      ref: "Reporter",
      required: [true, "Reporter ID is required"],
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDetails: {
      type: String,
      required: [true, "Short details are required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    featuredImageUrl: {
      type: String,
      required: [true, "Featured image URL is required"],
    },
    imageCaption: {
      type: String,
      default: "",
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    videoUrl: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    sourceUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "pending", "approved", "published", "archived"],
        message: "{VALUE} is not a valid status",
      },
      default: "draft",
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    publishAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const News = model<TNews>("News", newsSchema);
