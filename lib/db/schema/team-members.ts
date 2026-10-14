import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const teamMembersTable = pgTable.withRLS("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  photoUrl: text("photo_url").notNull(),
});
