import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  image: string;
  imagePublicId: string;
  heading: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    imagePublicId: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: [true, "Heading is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true },
);

export const About = mongoose.model<IAbout>("Web_About", AboutSchema);
