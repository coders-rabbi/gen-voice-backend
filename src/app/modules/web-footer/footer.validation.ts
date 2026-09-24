import { z } from "zod";

const createWebFooterValidationSchema = z.object({
  body: z.object({
    navLogo: z.string({ error: "Nav logo is required" }).trim().min(1),
    footerLogo: z.string({ error: "Footer logo is required" }).trim().min(1),
    description: z.string({ error: "Description is required" }).trim().min(1),
    subHeading: z.string({ error: "Sub heading is required" }).trim().min(1),
    facebook: z.string().trim().optional(),
    instagram: z.string().trim().optional(),
    youtube: z.string().trim().optional(),
    copyRight: z.string({ error: "Copyright is required" }).trim().min(1),
    videos: z
      .array(z.string().trim().url("Invalid video link"))
      .max(9, "Maximum 9 videos allowed")
      .optional(),
  }),
});

const updateWebFooterValidationSchema = z.object({
  body: z.object({
    navLogo: z.string().trim().min(1).optional(),
    footerLogo: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    subHeading: z.string().trim().min(1).optional(),
    facebook: z.string().trim().optional(),
    instagram: z.string().trim().optional(),
    youtube: z.string().trim().optional(),
    copyRight: z.string().trim().min(1).optional(),
    videos: z
      .array(z.string().trim().url("Invalid video link"))
      .max(9, "Maximum 9 videos allowed")
      .optional(),
  }),
});

export const WebFooterValidations = {
  createWebFooterValidationSchema,
  updateWebFooterValidationSchema,
};
