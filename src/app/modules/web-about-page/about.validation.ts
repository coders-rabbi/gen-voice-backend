import { z } from "zod";

const createAboutValidationSchema = z.object({
  body: z.object({
    heading: z
      .string({ error: "Heading is required" })
      .trim()
      .min(1, "Heading cannot be empty"),
    description: z
      .string({ error: "Description is required" })
      .trim()
      .min(1, "Description cannot be empty"),
  }),
});

const updateAboutValidationSchema = z.object({
  body: z.object({
    heading: z.string().trim().min(1, "Heading cannot be empty").optional(),
    description: z
      .string()
      .trim()
      .min(1, "Description cannot be empty")
      .optional(),
  }),
});

export const AboutValidation = {
  createAboutValidationSchema,
  updateAboutValidationSchema,
};
