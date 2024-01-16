import { z } from "zod";

const meetingValidator = z.object({
  type: z.string().min(3, "atleast four characters"),
  note: z.string().min(7, "at least four characters"),
  timeDuration: z.number(),
  appId: z.string(),

  date: z.date({
    required_error: "A date of Deadline is required.",
  }),
  time: z.string(),
});
export default meetingValidator;
