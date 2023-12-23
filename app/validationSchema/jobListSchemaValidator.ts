import { z } from "zod";

const jobListValidator = z.object({
  title: z.string().min(4, "atleast four characters"),
  description: z.string().min(7, "at least four characters"),
  salary: z.number(),
  jobCategory: z.string(),
});
export default jobListValidator;
