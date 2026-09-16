import { z } from "zod";

export const siteContactValidation = z.object({
  body: z.object({
    mapLink: z.string().url("Invalid map link").optional().or(z.literal("")),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().optional(),
    fax: z.string().optional(),
    address: z.string().optional(),
    facebook: z
      .string()
      .url("Invalid facebook link")
      .optional()
      .or(z.literal("")),
    instagram: z
      .string()
      .url("Invalid instagram link")
      .optional()
      .or(z.literal("")),
    twitter: z
      .string()
      .url("Invalid twitter link")
      .optional()
      .or(z.literal("")),
    youtube: z
      .string()
      .url("Invalid youtube link")
      .optional()
      .or(z.literal("")),
    shortDescription: z.string().optional(),
    logo: z.string().optional(),
  }),
});

export const updateSiteContactValidation = z.object({
  body: z.object({
    mapLink: z.string().url("Invalid map link").optional().or(z.literal("")),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().optional(),
    fax: z.string().optional(),
    address: z.string().optional(),
    facebook: z
      .string()
      .url("Invalid facebook link")
      .optional()
      .or(z.literal("")),
    instagram: z
      .string()
      .url("Invalid instagram link")
      .optional()
      .or(z.literal("")),
    twitter: z
      .string()
      .url("Invalid twitter link")
      .optional()
      .or(z.literal("")),
    youtube: z
      .string()
      .url("Invalid youtube link")
      .optional()
      .or(z.literal("")),
    shortDescription: z.string().optional(),
    logo: z.string().optional(),
  }),
});
