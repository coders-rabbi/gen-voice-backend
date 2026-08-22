import z from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ message: "Old Password is required" }),
    newPassword: z.string({ message: "New Password is required" }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
