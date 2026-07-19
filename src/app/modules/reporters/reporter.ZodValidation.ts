import { z } from "zod";

const ReporterNameValidationSchema = z.object({
  firstName: z.string().trim().min(4, "First name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(3, "Last name is required"),
});

export const ReporterValidationSchema = z.object({
  body: z.object({
    id: z.string().trim().min(1, "Reporter ID is required"),
    name: ReporterNameValidationSchema,
    gender: z.enum(["male", "female", "others"], {
      error: "Gender must be either 'male', 'female' or 'others' ",
    }),
    dateOfBirth: z.coerce.date(),

    email: z.email("Invalid email address").trim(),

    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
      .optional(),

    contactNo: z
      .string()
      .trim()
      .min(11, "Contact number must be at least 11 digits"),

    presentAddress: z.string().trim().min(5, "Present address is required"),

    permanentAddress: z.string().trim().min(5, "Permanent address is required"),

    profileImage: z.url("Profile image must be a valid URL").optional(),

    designation: z.string().trim().min(4, "Designation is required"),

    facebook: z.url("Facebook URL is invalid").optional(),
  }),
});

export const updateReporterValidationSchema = z.object({
  body: z.object({
    id: z.string().trim().min(1, "Reporter ID is required").optional(),

    name: ReporterNameValidationSchema.partial().optional(),

    gender: z
      .enum(["male", "female", "others"], {
        error: "Gender must be either 'male', 'female' or 'others' ",
      })
      .optional(),

    dateOfBirth: z.coerce.date().optional(),

    email: z.string().email("Invalid email address").trim().optional(),

    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
      .optional(),

    contactNo: z
      .string()
      .trim()
      .min(11, "Contact number must be at least 11 digits")
      .optional(),

    presentAddress: z
      .string()
      .trim()
      .min(5, "Present address is required")
      .optional(),

    permanentAddress: z
      .string()
      .trim()
      .min(5, "Permanent address is required")
      .optional(),

    profileImage: z
      .string()
      .url("Profile image must be a valid URL")
      .optional(),

    designation: z.string().trim().min(4, "Designation is required").optional(),

    facebook: z.string().url("Facebook URL is invalid").optional(),
  }),
});

export const reporterValidations = {
  ReporterValidationSchema,
  updateReporterValidationSchema,
};
