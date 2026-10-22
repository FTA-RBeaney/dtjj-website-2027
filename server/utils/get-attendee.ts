import { eq } from "drizzle-orm";
import db from "../../lib/db";
import { profilesTable } from "../../lib/db/schema/profiles";

export type AttendeeSyncState = {
  email: string;
  first_name: string | null;
  role: string;
};

export async function getAttendeeWithOrders(userId: string): Promise<AttendeeSyncState> {
  const [profile] = await db.select({
    email: profilesTable.email,
    first_name: profilesTable.firstName,
    role: profilesTable.role,
  })
    .from(profilesTable)
    .where(eq(profilesTable.email, userId))
    .limit(1);

  if (!profile) {
    throw createError({ statusCode: 404, statusMessage: "Attendee not found" });
  }

  return profile;
}
