import { sql } from "drizzle-orm";
import { pgEnum, pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authenticatedRole, authUid, authUsers } from "drizzle-orm/supabase";

export const appRoleEnum = pgEnum("app_role", ["member", "admin"]);
export const profileStatusEnum = pgEnum("profile_status", ["pending", "approved"]);

// One row per auth user, created by the on_auth_user_created trigger (see custom migration).
// Admin access goes through server routes using Drizzle, so RLS only needs to cover self-access.
export const profilesTable = pgTable.withRLS("profiles", {
  id: uuid("id").primaryKey().references(() => authUsers.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: appRoleEnum("role").notNull().default("member"),
  status: profileStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, table => [
  pgPolicy("profiles_select_own", {
    for: "select",
    to: authenticatedRole,
    using: sql`${table.id} = ${authUid}`,
  }),
]);
