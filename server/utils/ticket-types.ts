import * as z from "zod";

export const createTicketTypeSchema = z.object({
  name: z.string().min(2, "Too short"),
  description: z.string().optional(),
  priceInPence: z.number().int().min(0),
  maxQuantity: z.number().int().min(1),
});

export function toTicketTypeInsert(eventId: string, input: z.output<typeof createTicketTypeSchema>) {
  const description = input.description?.trim();

  return {
    eventId,
    name: input.name.trim(),
    description: description || null,
    priceInPence: input.priceInPence,
    maxQuantity: input.maxQuantity,
  };
}
