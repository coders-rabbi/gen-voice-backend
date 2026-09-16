import { Schema, model, Document } from "mongoose";
import { ISiteContact } from "./contact.interface";
export interface ISiteContactDocument extends ISiteContact, Document {}

const siteContactSchema = new Schema<ISiteContactDocument>(
  {
    mapLink: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    fax: { type: String, default: "" },
    address: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
    logo: { type: String, default: null },
    shortDescription: { type: String, default: "" },
  },
  { timestamps: true },
);

export const SiteContact = model<ISiteContactDocument>(
  "SiteContact",
  siteContactSchema,
);
