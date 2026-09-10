import { z } from "zod";

const createCommentValidationSchema = z.object({
  body: z.object({
    newsId: z
      .string({ error: "News id is required" })
      .trim()
      .min(1, "News id cannot be empty"),
    name: z
      .string({ error: "Name is required" })
      .trim()
      .min(1, "Name cannot be empty"),
    email: z
      .string({ error: "Email is required" })
      .trim()
      .email("Invalid email address"),
    comment: z
      .string({ error: "Comment is required" })
      .trim()
      .min(1, "Comment cannot be empty"),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name cannot be empty").optional(),
    email: z.string().trim().email("Invalid email address").optional(),
    comment: z.string().trim().min(1, "Comment cannot be empty").optional(),
    isHidden: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CommentValidations = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
};
