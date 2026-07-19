import { Types } from "mongoose";

export type TNewsStatus =
  | "draft"
  | "pending"
  | "approved"
  | "published"
  | "archived";

export type TNews = {
  newsId: string;
  reporterId: Types.ObjectId;
  approvedBy: Types.ObjectId;
  categoryId: Types.ObjectId;
  title: string;
  slug: string;
  shortDetails: string;
  content: string;
  featuredImageUrl: string;
  imageCaption?: string;
  galleryImages?: string[];
  videoUrl?: string;
  tags: string[];
  location?: string;
  source?: string;
  sourceUrl?: string;
  status: TNewsStatus;
  isDeleted: Boolean;
  publishAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

// export const NewModel =
