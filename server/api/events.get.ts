import { desc } from "drizzle-orm";
import db from "../../lib/db";
import { eventsTable } from "../../lib/db/schema/events";

export default defineEventHandler(() =>
  db.select({ id: eventsTable.id, name: eventsTable.name, location: eventsTable.location, imageUrl: eventsTable.imageUrl })
    .from(eventsTable)
    .limit(1)
    .orderBy(desc(eventsTable.startDate)),
);
