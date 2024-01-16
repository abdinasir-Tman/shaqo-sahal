import { z } from "zod";

const meetingValidator = z.object({
  type: z.string().min(3, "atleast four characters"),
  note: z.string().min(7, "at least four characters"),
  timeDuration: z.number(),

  date: z.date(),
  time: z.string({
    required_error: "Please select a language.",
  }),
});
export default meetingValidator;
