import { asc } from "drizzle-orm";
import db from "../../lib/db";
import { profilesTable } from "../../lib/db/schema/profiles";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  return db.select({ id: profilesTable.id, email: profilesTable.email, firstName: profilesTable.firstName, lastName: profilesTable.lastName, role: profilesTable.role, status: profilesTable.status, createdAt: profilesTable.createdAt })
    .from(profilesTable)
    .orderBy(asc(profilesTable.createdAt));
});
