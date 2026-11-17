import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { eventsTable } from "./events";

export const faqsTable = pgTable.withRLS("faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id").notNull().references(() => eventsTable.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});
