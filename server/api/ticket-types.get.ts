import { asc } from "drizzle-orm";
import db from "../../lib/db";
import { ticketTypesTable } from "../../lib/db/schema/ticket-types";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  return db.select({ id: ticketTypesTable.id, name: ticketTypesTable.name, description: ticketTypesTable.description, priceInPence: ticketTypesTable.priceInPence, maxQuantity: ticketTypesTable.maxQuantity, createdAt: ticketTypesTable.createdAt })
    .from(ticketTypesTable)
    .orderBy(asc(ticketTypesTable.createdAt));
});
