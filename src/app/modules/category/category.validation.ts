import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    categoryName: z
      .string({ error: "Category name is required" })
      .trim()
      .min(1, "Category name cannot be empty"),
    slug: z
      .string({ error: "Slug is required" })
      .trim()
      .min(1, "Slug cannot be empty"),
    image: z.string({ error: "Image is required" }),
    description: z
      .string({ error: "Description is required" })
      .trim()
      .min(1, "Description cannot be empty"),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    categoryName: z
      .string()
      .trim()
      .min(1, "Category name cannot be empty")
      .optional(),
    slug: z.string().trim().min(1, "Slug cannot be empty").optional(),
    image: z.string().optional(),
    description: z
      .string()
      .trim()
      .min(1, "Description cannot be empty")
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
