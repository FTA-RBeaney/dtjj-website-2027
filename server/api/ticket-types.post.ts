import { desc } from "drizzle-orm";
import db from "../../lib/db";
import { eventsTable } from "../../lib/db/schema/events";
import { ticketTypesTable } from "../../lib/db/schema/ticket-types";
import { createTicketTypeSchema, toTicketTypeInsert } from "../utils/ticket-types";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const body = createTicketTypeSchema.parse(await readBody(event));

  const [currentEvent] = await db.select({ id: eventsTable.id })
    .from(eventsTable)
    .limit(1)
    .orderBy(desc(eventsTable.startDate));

  if (!currentEvent) {
    throw createError({ statusCode: 400, statusMessage: "No event exists to attach ticket types to" });
  }

  const [ticketType] = await db.insert(ticketTypesTable)
    .values(toTicketTypeInsert(currentEvent.id, body))
    .returning();

  return ticketType;
});
