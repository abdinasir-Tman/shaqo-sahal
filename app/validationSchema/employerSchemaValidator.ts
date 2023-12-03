import z from "zod";

const validateEmployer = z.object({
  companyName: z.string().min(4, "atleast four characters"),
  address: z.string().min(4, "atleast four characters"),
  logo: z.string().optional(),
});
export default validateEmployer;
