import type { H3Event } from "h3";
import { eq } from "drizzle-orm";
import { serverSupabaseUser } from "#supabase/server";
import db from "../../lib/db";
import { profilesTable } from "../../lib/db/schema/profiles";

export async function requireAdmin(event: H3Event) {
  const claims = await serverSupabaseUser(event);

  if (!claims?.sub) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const [profile] = await db.select({ id: profilesTable.id, role: profilesTable.role, status: profilesTable.status })
    .from(profilesTable)
    .where(eq(profilesTable.id, claims.sub))
    .limit(1);

  if (profile?.role !== "admin" || profile.status !== "approved") {
    throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  }

  return profile;
}
