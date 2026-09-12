// reaction.validation.ts
import { z } from "zod";

const toggleReactionValidationSchema = z.object({
  body: z.object({
    type: z.enum(["like", "love", "wow", "sad", "angry"]),
  }),
});

export const ReactionValidations = {
  toggleReactionValidationSchema,
};
