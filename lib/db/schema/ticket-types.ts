import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { eventsTable } from "./events";

export const ticketTypesTable = pgTable.withRLS("ticket_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id").notNull().references(() => eventsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  priceInPence: integer("price_in_pence").notNull(),
  maxQuantity: integer("max_quantity").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
