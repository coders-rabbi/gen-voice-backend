import { z } from "zod";

export const followValidation = z.object({
  body: z.object({
    reporter: z.string({ error: "Reporter id is required" }),
  }),
});
