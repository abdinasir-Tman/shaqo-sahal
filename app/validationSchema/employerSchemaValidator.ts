import z from "zod";

const ValidateEmployer = z.object({
  companyName: z.string().min(4, "atleast four characters"),
  address: z.string().min(4, "atleast four characters"),
  email: z.string().email(),
  logo: z.string(),
});
export default ValidateEmployer;
