import { Types } from "mongoose";

export type TNewsStatus =
  | "draft"
  | "pending"
  | "published"
  | "archived"
  | "rejected"
  | "blocked";

export type TConentType = "Text" | "Video" | "Mixed";

export type TNews = {
  newsId: string;
  reporterId: Types.ObjectId;
  approvedBy: Types.ObjectId;
  categoryId: Types.ObjectId;
  title: string;
  slug: string;
  shortDetails: string;
  contentType: TConentType;
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
  isAnonymous: Boolean;
  isDeleted: Boolean;
  publishAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

// export const NewModel =
