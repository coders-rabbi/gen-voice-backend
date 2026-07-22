import z from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
};
