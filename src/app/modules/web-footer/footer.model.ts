import { Schema, model } from "mongoose";
import { IWebFooter } from "./footer.interface";

const WebFooterSchema = new Schema<IWebFooter>(
  {
    navLogo: { type: String, required: true, trim: true },
    footerLogo: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    subHeading: { type: String, required: true, trim: true },
    facebook: { type: String, trim: true, default: "" },
    instagram: { type: String, trim: true, default: "" },
    youtube: { type: String, trim: true, default: "" },
    copyRight: { type: String, required: true, trim: true },
    videos: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const WebFooter = model<IWebFooter>("WebFooter", WebFooterSchema);
