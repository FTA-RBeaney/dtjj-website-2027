import * as z from "zod";

export const createFaqSchema = z.object({
  question: z.string().min(2, "Too short"),
  answer: z.string().min(2, "Too short"),
});

export function toFaqInsert(eventId: string, input: z.output<typeof createFaqSchema>) {
  return {
    eventId,
    question: input.question.trim(),
    answer: input.answer.trim(),
  };
}
