import { eq } from "drizzle-orm";
import db from "../../lib/db";
import { eventsTable } from "../../lib/db/schema/events";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const body = await readBody(event);

  const [eventToUpdate] = await db.select({ id: eventsTable.id, name: eventsTable.name, location: eventsTable.location, imageUrl: eventsTable.imageUrl, startDate: eventsTable.startDate, endDate: eventsTable.endDate })
    .from(eventsTable)
    .where(eq(eventsTable.id, body.id))
    .limit(1);

  if (!eventToUpdate) {
    throw createError({ statusCode: 404, statusMessage: "Event not found" });
  }

  const [updatedEvent] = await db.update(eventsTable)
    .set({
      name: body.name,
      location: body.location,
      imageUrl: body.imageUrl,
      startDate: body.startDate,
      endDate: body.endDate,
    })
    .where(eq(eventsTable.id, body.id))
    .returning();

  return updatedEvent;
});
