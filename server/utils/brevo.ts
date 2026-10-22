/**
 * Sync a contact's details from Supabase to Brevo using their email.
 */

import { getAttendeeWithOrders } from "./get-attendee";

export async function syncContactToBrevo({ email }: { email: string }) {
  const person = await getAttendeeWithOrders(email); // from Drizzle ORM
  if (!person) {
    throw new Error("Attendee not found");
  }

  await $fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    // eslint-disable-next-line node/no-process-env
    headers: { "api-key": process.env.BREVO_API_KEY! },
    body: {
      email: person.email,
      updateEnabled: true, // upsert
      attributes: {
        FIRSTNAME: person.first_name,
        TSHIRT_PREORDER: false,
      },
    },
  });
}
