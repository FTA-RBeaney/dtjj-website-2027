import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const attendeesTable = pgTable.withRLS("attendees", {
  id: uuid("id").primaryKey(),
  eventId: uuid("event_id").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  preferredName: text("preferred_name").notNull(),
  email: text("email").notNull(),
  tShirt: boolean("t_shirt").notNull().default(false),
  tShirtSize: text("t_shirt_size").notNull(),
  tShirtColor: text("t_shirt_color").notNull(),
  ticketTypeId: uuid("ticket_type_id").notNull(),
  country: text("country").notNull(),
  pronouns: text("pronouns").notNull(),
  hosting: text("hosting").notNull(),
  payItForward: boolean("pay_it_forward").notNull().default(false),
  payItForwardAmount: text("pay_it_forward_amount"),
  paymentStatus: text("payment_status").notNull(),
  stripePaymentId: text("stripe_payment_id"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
