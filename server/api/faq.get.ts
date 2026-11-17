import { desc } from "drizzle-orm";
import db from "../../lib/db";
import { faqsTable } from "../../lib/db/schema/faqs";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  return db.select({ id: faqsTable.id, question: faqsTable.question, answer: faqsTable.answer })
    .from(faqsTable)
    .orderBy(desc(faqsTable.id));
});
