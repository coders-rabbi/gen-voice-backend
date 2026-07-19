import { z } from "zod";

const createNewsValidationSchema = z.object({
  body: z.object({
    newsId: z.string().trim().min(1, "News ID is required"),

    reporterId: z.string().trim().min(1, "Reporter ID is required"),

    approvedBy: z.string().trim().optional().nullable(),

    categoryId: z.string().trim().min(1, "Category ID is required"),

    title: z.string().trim().min(1, "Title is required"),

    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .transform((value) => value.toLowerCase()),

    shortDetails: z.string().trim().min(1, "Short details are required"),

    content: z.string().min(1, "Content is required"),

    featuredImageUrl: z.string().url("Featured image must be a valid URL"),

    imageCaption: z.string().optional(),

    galleryImages: z
      .array(z.string().url("Each gallery image must be a valid URL"))
      .optional(),

    videoUrl: z
      .string()
      .url("Video URL must be valid")
      .optional()
      .or(z.literal("")),

    tags: z
      .array(z.string().trim().min(1))
      .min(1, "At least one tag is required"),

    location: z.string().optional(),

    source: z.string().optional(),

    sourceUrl: z
      .string()
      .url("Source URL must be valid")
      .optional()
      .or(z.literal("")),

    status: z
      .enum(["draft", "pending", "approved", "published", "archived"])
      .optional(),

    isDeleted: z.boolean().optional(),

    publishAt: z.string().datetime().optional().nullable(),
  }),
});

const updateNewsValidationSchema = z.object({
  body: z.object({
    newsId: z.string().trim().min(1, "News ID is required").optional(),
    reporterId: z.string().trim().min(1, "Reporter ID is required").optional(),

    approvedBy: z.string().trim().optional().nullable(),
    categoryId: z.string().trim().min(1, "Category ID is required").optional(),
    title: z.string().trim().min(1, "Title is required").optional(),

    slug: z
      .string()
      .trim()
      .min(1, "Slug is required")
      .transform((value) => value.toLowerCase())
      .optional(),

    shortDetails: z
      .string()
      .trim()
      .min(1, "Short details are required")
      .optional(),
    content: z.string().min(1, "Content is required").optional(),

    featuredImageUrl: z
      .string()
      .url("Featured image must be a valid URL")
      .optional(),
    imageCaption: z.string().optional(),

    galleryImages: z
      .array(z.string().url("Each gallery image must be a valid URL"))
      .optional(),

    videoUrl: z
      .string()
      .url("Video URL must be valid")
      .optional()
      .or(z.literal("")),

    tags: z
      .array(z.string().trim().min(1))
      .min(1, "At least one tag is required")
      .optional(),

    location: z.string().optional(),
    source: z.string().optional(),

    sourceUrl: z
      .string()
      .url("Source URL must be valid")
      .optional()
      .or(z.literal("")),

    status: z
      .enum(["draft", "pending", "approved", "published", "archived"])
      .optional(),

    isDeleted: z.boolean().optional(),

    publishAt: z.string().datetime().optional().nullable(),
  }),
});

export const newsValidations = {
  createNewsValidationSchema,
  updateNewsValidationSchema,
};
