import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const venuesTable = pgTable.withRLS("venues", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  coordinates: text("coordinates").notNull(),
});
