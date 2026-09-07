import { z } from "zod";
import { Features } from "./roel.const";

const permissionValidationSchema = z.object({
  feature: z.enum(Features),
  isGranted: z.boolean(),
});

export const CreateRoleValidationSchema = z.object({
  body: z.object({
    roleName: z.string().trim().min(1, "Role name is required"),
    permissions: z
      .array(permissionValidationSchema)
      .min(1, "At least one permission is required"),
  }),
});

export const UpdateRoleValidationSchema = z.object({
  body: z.object({
    roleName: z.string().trim().min(1, "Role name is required").optional(),
    permissions: z.array(permissionValidationSchema).optional(),
  }),
});

export const RoleValidations = {
  CreateRoleValidationSchema,
  UpdateRoleValidationSchema,
};
