import * as z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Too short"),
});

export type Contact = z.output<typeof contactSchema>;
