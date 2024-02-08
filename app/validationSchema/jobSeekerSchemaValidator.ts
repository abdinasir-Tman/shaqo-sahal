import { z } from "zod";

const jobSeekerValidator = z.object({
  name: z
    .string()
    .min(10, "please enter your full name")
    .max(50, "maximum 50 characters"),
  role: z.string().optional(),
  jobCategory: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
});
export default jobSeekerValidator;
