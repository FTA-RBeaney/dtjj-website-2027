import { desc } from "drizzle-orm";
import db from "../../lib/db";
import { eventsTable } from "../../lib/db/schema/events";
import { faqsTable } from "../../lib/db/schema/faqs";
import { createFaqSchema, toFaqInsert } from "../utils/faqs";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  // validate the body
  const body = createFaqSchema.parse(await readBody(event));

  // get the current event
  const [currentEvent] = await db.select({ id: eventsTable.id })
    .from(eventsTable)
    .limit(1)
    .orderBy(desc(eventsTable.startDate));

  if (!currentEvent) {
    throw createError({ statusCode: 400, statusMessage: "No event exists to attach FAQs to" });
  }

  // insert the cleaned up row
  const [faq] = await db.insert(faqsTable)
    .values(toFaqInsert(currentEvent.id, body))
    .returning();

  return faq;
});
