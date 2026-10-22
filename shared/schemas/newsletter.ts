import * as z from "zod";

export const newsletterSchema = z.object({
  name: z.string().min(2, "Too short"),
  email: z.string().email("Invalid email"),
});

export type Newsletter = z.output<typeof newsletterSchema>;
