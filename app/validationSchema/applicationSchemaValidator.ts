import { z } from "zod";

const applicationValidator = z.object({
  coverLetter: z.string().min(5, "atleast 5 characters"),
  linkedIn: z.string().optional(),
  portfolio: z.string().optional(),
});

export default applicationValidator;
